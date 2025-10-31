"use client";
import React from "react";
import { Theme, Box, Card, Flex, Text, TextField, Button, Badge, Heading, Separator, TextArea, Avatar, IconButton } from "@radix-ui/themes";
import TopBar from "@/components/TopBar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { ReloadIcon, PaperPlaneIcon, ArchiveIcon, EnvelopeOpenIcon, HamburgerMenuIcon, Pencil2Icon } from "@radix-ui/react-icons";

const MAIL_DOMAIN = "thegnd.io";
const HANDLE_REGEX = /^[a-z0-9]{3,20}$/;

type MailListItem = {
  id: string;
  from: string;
  to: string;
  subject?: string | null;
  snippet?: string | null;
  date: string;
  unread: boolean;
  direction: "INBOUND" | "OUTBOUND";
};

type MailDetail = {
  id: string;
  from: string;
  to: string;
  subject?: string | null;
  text?: string | null;
  html?: string | null;
  date: string;
  unread: boolean;
  archived: boolean;
  direction: "INBOUND" | "OUTBOUND";
};

export default function MailPage() {
  const { t } = useTranslation();
  const [appearance, setAppearance] = React.useState<"light" | "dark">("dark");
  const [mounted, setMounted] = React.useState(false);

  const [userId, setUserId] = React.useState<string | null>(null);
  const [handle, setHandle] = React.useState("");
  const [verified, setVerified] = React.useState<boolean>(false);
  const [checking, setChecking] = React.useState(false);
  const [available, setAvailable] = React.useState<boolean | null>(null);
  const [saving, setSaving] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);

  const [loadingList, setLoadingList] = React.useState(false);
  const [loadingMsg, setLoadingMsg] = React.useState(false);
  const [items, setItems] = React.useState<MailListItem[]>([]);
  const [total, setTotal] = React.useState(0);
  const [unreadCount, setUnreadCount] = React.useState(0);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [selected, setSelected] = React.useState<MailDetail | null>(null);
  const [filterUnread, setFilterUnread] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [reply, setReply] = React.useState("");
  const [folder, setFolder] = React.useState<"inbox" | "sent" | "archive">("inbox");
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [composeOpen, setComposeOpen] = React.useState(false);
  const [composeTo, setComposeTo] = React.useState("");
  const [composeSubject, setComposeSubject] = React.useState("");
  const [composeBody, setComposeBody] = React.useState("");

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const u = JSON.parse(stored);
        if (u?.id) {
          setUserId(u.id);
          fetch(`/api/user/me?userId=${u.id}`)
            .then((r) => r.json())
            .then((data) => {
              if (data?.user) {
                if (data.user.theme === "DARK") setAppearance("dark");
                if (data.user.theme === "LIGHT") setAppearance("light");
                setHandle((data.user.internalEmailHandle || "").toLowerCase());
                setVerified(!!data.user.internalEmailVerified);
              }
            })
            .catch(() => {});
        }
      }
    } catch {}
    setMounted(true);
  }, []);

  const loadMessages = React.useCallback(async () => {
    if (!userId || !verified) return;
    setLoadingList(true);
    try {
      const params = new URLSearchParams({ userId, page: "1", pageSize: "50", folder });
      if (filterUnread) params.set("unreadOnly", "true");
      if (search) params.set("q", search);
      const res = await fetch(`/api/mail/list?${params.toString()}`);
      const data = await res.json();
      if (res.ok) {
        setItems(data.items || []);
        setTotal(data.total || 0);
        setUnreadCount(data.unreadCount || 0);
        if (!selectedId && data.items?.length) {
          setSelectedId(data.items[0].id);
        }
      }
    } catch {}
    finally {
      setLoadingList(false);
    }
  }, [userId, verified, filterUnread, search, selectedId, folder]);

  React.useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  React.useEffect(() => {
    if (selectedId) selectMessage(selectedId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const selectMessage = async (id: string) => {
    if (!userId) return;
    setLoadingMsg(true);
    try {
      const res = await fetch(`/api/mail/get?id=${id}&userId=${userId}`);
      const data = await res.json();
      if (res.ok) {
        const msg: MailDetail = data.message;
        setSelected(msg);
        setReply("");
        if (msg.unread) {
          await fetch("/api/mail/mark", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId, id, unread: false }) });
          setItems((prev) => prev.map((it) => (it.id === id ? { ...it, unread: false } : it)));
          setUnreadCount((c) => Math.max(0, c - 1));
        }
      }
    } catch {}
    finally {
      setLoadingMsg(false);
    }
  };

  const sendNew = async () => {
    if (!userId) return;
    if (!composeTo || (!composeBody && !composeSubject)) return;
    setSaving("send");
    setMessage(null);
    try {
      const res = await fetch("/api/mail/send", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId, to: composeTo, subject: composeSubject, text: composeBody }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "send_failed");
      setMessage(t("mail.sent"));
      setComposeOpen(false);
      setComposeTo("");
      setComposeSubject("");
      setComposeBody("");
      setFolder("sent");
      await loadMessages();
    } catch (e: any) {
      setMessage(t("mail.send_error"));
    } finally {
      setSaving(null);
    }
  };

  const refresh = async () => {
    await loadMessages();
    if (selectedId) await selectMessage(selectedId);
  };

  const sendReply = async () => {
    if (!userId || !selected) return;
    const to = selected.direction === "INBOUND" ? selected.from : selected.to;
    const subject = selected.subject ? `Re: ${selected.subject}` : "";
    setSaving("send");
    setMessage(null);
    try {
      const res = await fetch("/api/mail/send", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId, to, subject, text: reply }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "send_failed");
      setMessage(t("mail.sent"));
      setReply("");
      await loadMessages();
    } catch (e: any) {
      setMessage(t("mail.send_error"));
    } finally {
      setSaving(null);
    }
  };

  const handleCheckAvailability = async () => {
    if (!handle || !HANDLE_REGEX.test(handle)) {
      setAvailable(false);
      return;
    }
    setChecking(true);
    try {
      const res = await fetch(`/api/mail/availability?handle=${encodeURIComponent(handle)}`);
      const data = await res.json();
      setAvailable(!!data?.available);
    } catch {
      setAvailable(null);
    } finally {
      setChecking(false);
    }
  };

  const activateMailbox = async () => {
    if (!userId) return;
    setSaving("activate");
    setMessage(null);
    try {
      const res = await fetch("/api/mail/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Activation failed");
      setVerified(true);
      setMessage(t("mail.activated"));
      await loadMessages();
    } catch (e: any) {
      setMessage(e.message);
    } finally {
      setSaving(null);
    }
  };

  const saveHandle = async () => {
    if (!userId) return;
    if (!verified) {
      setMessage(t("mail.must_activate_before_change"));
      return;
    }
    if (!handle || !HANDLE_REGEX.test(handle)) {
      setMessage(t("mail.invalid"));
      return;
    }
    setSaving("handle");
    setMessage(null);
    try {
      const res = await fetch("/api/mail/set-handle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, handle }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Save failed");
      setMessage(t("mail.saved"));
      setAvailable(null);
      // update local cache
      const stored = localStorage.getItem("user");
      if (stored) {
        const u = JSON.parse(stored);
        localStorage.setItem("user", JSON.stringify({ ...u, internalEmailHandle: handle, internalEmailVerified: true }));
      }
    } catch (e: any) {
      const err = String(e.message || "error");
      if (err.includes("unavailable")) setMessage(t("mail.unavailable"));
      else setMessage(err);
    } finally {
      setSaving(null);
    }
  };

  if (!mounted) return null;

  return (
    <Theme accentColor="red" scaling="95%" appearance={appearance}>
      <Box style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "var(--gray-1)", color: "var(--gray-12)" }}>
        <Box className="mx-auto w-full max-w-7xl px-4 py-6" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <TopBar />
          <div className={`flex-1 grid gap-6 grid-cols-1 ${sidebarCollapsed ? "md:grid-cols-1" : "md:grid-cols-[260px_1fr]"}`}>
            {!sidebarCollapsed && (
              <Sidebar appearance={appearance} onAppearanceChange={(v) => setAppearance(v ? "dark" : "light")} />
            )}
            <Card size="3">
              <Flex align="center" justify="between" mb="4">
                <Flex align="center" gap="3">
                  <IconButton variant="soft" onClick={() => setSidebarCollapsed((v) => !v)} title="Toggle sidebar">
                    <HamburgerMenuIcon />
                  </IconButton>
                  <Heading size="6">{t("mail.title")}</Heading>
                </Flex>
                {verified && (
                  <Button variant="soft" onClick={() => { setComposeOpen(true); setSelectedId(null); setSelected(null); }}>
                    <Pencil2Icon /> {t("mail.new_message") || "New"}
                  </Button>
                )}
              </Flex>

              <Box className="rounded-md p-3" style={{ background: "var(--gray-3)" }}>
                <Flex direction="column" gap="2">
                  <Text>{verified ? t("mail.subtitle_verified") : t("mail.subtitle_unverified")}</Text>
                  <Text weight="bold">{t("mail.current")}: {handle ? `${handle}@${MAIL_DOMAIN}` : t("mail.not_set")}</Text>
                  {!verified && (
                    <Flex gap="3" align="center">
                      <Button onClick={activateMailbox} disabled={!userId || saving === "activate"}>
                        {saving === "activate" ? t("common.saving") : t("mail.activate")}
                      </Button>
                      <Badge color="yellow">{t("mail.activation_needed")}</Badge>
                    </Flex>
                  )}
                </Flex>
              </Box>

              <Separator my="4" />

              <Box className="rounded-md p-3" style={{ background: "var(--gray-3)" }}>
                <Flex direction="column" gap="3">
                  <Text weight="bold">{t("mail.change_handle")}</Text>
                  <Flex align="center" gap="3">
                    <TextField.Root
                      placeholder={t("mail.handle_hint") || ""}
                      value={handle}
                      onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))}
                      size="3"
                    />
                    <Text>@{MAIL_DOMAIN}</Text>
                    <Button variant="soft" onClick={handleCheckAvailability} disabled={checking}>
                      {t("mail.check")}
                    </Button>
                    <Button onClick={saveHandle} disabled={!userId || saving === "handle" || !verified}>
                      {saving === "handle" ? t("common.saving") : t("mail.save")}
                    </Button>
                  </Flex>
                  {available === true && <Text color="green">{t("mail.available")}</Text>}
                  {available === false && <Text color="red">{t("mail.unavailable")}</Text>}
                  {message && (
                    <Box style={{ padding: "8px 12px", background: "var(--gray-4)", borderRadius: 6 }}>
                      <Text>{message}</Text>
                    </Box>
                  )}
                </Flex>
              </Box>

              {verified && (
                <>
                  <Separator my="4" />
                  <Box style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 16, minHeight: 520 }}>
                    <Card size="2" style={{ background: "var(--gray-2)", height: "100%" }}>
                      <Flex gap="2" mb="3">
                        <Button variant={folder === "inbox" ? "solid" : "soft"} onClick={() => { setFolder("inbox"); setSelectedId(null); setSelected(null); }}>{t("mail.inbox")}</Button>
                        <Button variant={folder === "sent" ? "solid" : "soft"} onClick={() => { setFolder("sent"); setSelectedId(null); setSelected(null); }}>{t("mail.sent")}</Button>
                        <Button variant={folder === "archive" ? "solid" : "soft"} onClick={() => { setFolder("archive"); setSelectedId(null); setSelected(null); }}>{t("mail.archive")}</Button>
                      </Flex>
                      <Flex align="center" justify="between" mb="3">
                        <Flex align="center" gap="3">
                          <Text weight="bold">{t(folder === "sent" ? "mail.sent" : folder === "archive" ? "mail.archive" : "mail.inbox")}</Text>
                          <Badge color="yellow">{unreadCount}</Badge>
                        </Flex>
                        <IconButton variant="ghost" onClick={refresh}>
                          <ReloadIcon />
                        </IconButton>
                      </Flex>
                      <Flex gap="2" mb="3">
                        <Button variant={filterUnread ? "solid" : "soft"} onClick={() => setFilterUnread(!filterUnread)}>{t("mail.unread")}</Button>
                        <Box style={{ flex: 1 }}>
                          <TextField.Root placeholder={t("mail.search_messages") || ""} value={search} onChange={(e) => setSearch(e.target.value)} size="2" />
                        </Box>
                      </Flex>
                      <Box style={{ overflowY: "auto", maxHeight: 560 }}>
                        {loadingList ? (
                          <Flex align="center" justify="center" style={{ minHeight: 200 }}>
                            <Text>{t("common.saving")}</Text>
                          </Flex>
                        ) : items.length ? (
                          items.map((it) => (
                            <Box key={it.id} onClick={() => setSelectedId(it.id)} className="rounded-md" style={{ padding: 10, background: selectedId === it.id ? "var(--gray-4)" : "transparent", cursor: "pointer" }}>
                              <Flex align="start" justify="between" gap="3">
                                <Flex direction="column" gap="1" style={{ flex: 1 }}>
                                  <Text weight={it.unread ? "bold" : "regular"}>{it.from}</Text>
                                  <Text size="2" color="gray">{it.subject || "(no subject)"}</Text>
                                  <Text size="1" color="gray">{it.snippet}</Text>
                                </Flex>
                                <Text size="1" color="gray">{new Date(it.date).toLocaleDateString()}</Text>
                              </Flex>
                            </Box>
                          ))
                        ) : (
                          <Text color="gray">{t("search.no_results")}</Text>
                        )}
                      </Box>
                    </Card>

                    <Card size="2" style={{ background: "var(--gray-2)", height: "100%" }}>
                      {composeOpen ? (
                        <Flex direction="column" gap="3" style={{ height: "100%" }}>
                          <Heading size="4">{t("mail.new_message") || "New message"}</Heading>
                          <Flex direction="column" gap="2">
                            <Text size="2">{t("mail.to")}</Text>
                            <TextField.Root placeholder="name@example.com" value={composeTo} onChange={(e) => setComposeTo(e.target.value)} />
                          </Flex>
                          <Flex direction="column" gap="2">
                            <Text size="2">{t("mail.subject")}</Text>
                            <TextField.Root placeholder={t("mail.subject") || ""} value={composeSubject} onChange={(e) => setComposeSubject(e.target.value)} />
                          </Flex>
                          <TextArea rows={12} placeholder="Message..." value={composeBody} onChange={(e) => setComposeBody(e.target.value)} />
                          <Flex align="center" gap="2" justify="end">
                            <Button variant="soft" onClick={() => { setComposeOpen(false); }}>
                              {t("mail.discard")}
                            </Button>
                            <Button onClick={sendNew} disabled={saving === "send" || !composeTo}>
                              {saving === "send" ? t("mail.sending") : (<><PaperPlaneIcon /> {t("mail.send")}</>)}
                            </Button>
                          </Flex>
                        </Flex>
                      ) : loadingMsg ? (
                        <Flex align="center" justify="center" style={{ minHeight: 200 }}>
                          <Text>{t("common.saving")}</Text>
                        </Flex>
                      ) : selected ? (
                        <Flex direction="column" gap="3" style={{ height: "100%" }}>
                          <Flex align="center" justify="between">
                            <Flex align="center" gap="3">
                              <Avatar size="3" fallback={(selected.from[0] || "?").toUpperCase()} radius="full" />
                              <Flex direction="column">
                                <Text weight="bold">{selected.from}</Text>
                                <Text size="1" color="gray">{t("mail.to")}: {selected.to}</Text>
                              </Flex>
                            </Flex>
                            <Flex align="center" gap="2">
                              {!selected.unread ? (
                                <IconButton variant="soft" onClick={async () => { if (!userId || !selected) return; await fetch("/api/mail/mark", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId, id: selected.id, unread: true }) }); setSelected({ ...selected, unread: true }); setItems((prev) => prev.map((it) => it.id === selected.id ? { ...it, unread: true } : it)); setUnreadCount((c) => c + 1); }}>
                                  <EnvelopeOpenIcon />
                                </IconButton>
                              ) : (
                                <IconButton variant="soft" onClick={async () => { if (!userId || !selected) return; await fetch("/api/mail/mark", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId, id: selected.id, unread: false }) }); setSelected({ ...selected, unread: false }); setItems((prev) => prev.map((it) => it.id === selected.id ? { ...it, unread: false } : it)); setUnreadCount((c) => Math.max(0, c - 1)); }}>
                                  <EnvelopeOpenIcon />
                                </IconButton>
                              )}
                              <IconButton variant="soft" onClick={async () => { if (!userId || !selected) return; await fetch("/api/mail/mark", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId, id: selected.id, archived: true }) }); setSelected(null); setItems((prev) => prev.filter((it) => it.id !== selected.id)); }}>
                                <ArchiveIcon />
                              </IconButton>
                            </Flex>
                          </Flex>
                          <Separator />
                          <Text weight="bold">{selected.subject || "(no subject)"}</Text>
                          <Box style={{ flex: 1, overflowY: "auto" }}>
                            {selected.text ? (
                              <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>{selected.text}</pre>
                            ) : selected.html ? (
                              <div dangerouslySetInnerHTML={{ __html: selected.html }} />
                            ) : (
                              <Text color="gray">(no content)</Text>
                            )}
                          </Box>
                          <Separator />
                          <Flex direction="column" gap="2">
                            <Text weight="bold">{t("mail.reply")}</Text>
                            <TextArea value={reply} onChange={(e) => setReply(e.target.value)} placeholder={t("mail.reply") || ""} rows={4} />
                            <Flex align="center" gap="2" justify="end">
                              <Button onClick={sendReply} disabled={!reply || saving === "send"}>
                                {saving === "send" ? t("mail.sending") : (<><PaperPlaneIcon /> {t("mail.send")}</>)}
                              </Button>
                            </Flex>
                          </Flex>
                        </Flex>
                      ) : (
                        <Flex align="center" justify="center" style={{ minHeight: 200 }}>
                          <Text color="gray">{t("mail.inbox")}</Text>
                        </Flex>
                      )}
                    </Card>
                  </Box>
                </>
              )}
            </Card>
          </div>
        </Box>
        <Footer />
      </Box>
    </Theme>
  );
}
