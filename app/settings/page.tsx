"use client";
import React from "react";
import { Theme, Box, Card, Tabs, Flex, Text, TextField, Switch, Button, Heading } from "@radix-ui/themes";
import TopBar from "@/components/TopBar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import i18n from "@/lib/i18n";
import { useTranslation } from "react-i18next";

export default function SettingsPage() {
  const { t } = useTranslation();
  const [appearance, setAppearance] = React.useState<"light" | "dark">("dark");
  const [userId, setUserId] = React.useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);

  // General
  const [isProfilePublic, setIsProfilePublic] = React.useState(true);
  const [useGridView, setUseGridView] = React.useState(false);
  // Security
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false);
  const [isEscort, setIsEscort] = React.useState(false);
  const [saving, setSaving] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);

  const handleAppearanceChange = (v: boolean) => {
    setAppearance(v ? "dark" : "light");
  };

  const toggleEscort = async (enable: boolean) => {
    if (!userId) return;
    setIsEscort(enable);
    setSaving("escort");
    setMessage(null);
    try {
      const res = await fetch("/api/user/settings/escort/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, enable }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to update escort profile");
      // Optionally update local cache
      const stored = localStorage.getItem("user");
      if (stored) {
        const u = JSON.parse(stored);
        localStorage.setItem("user", JSON.stringify({ ...u, isEscort: enable }));
      }
    } catch (e: any) {
      setMessage(e.message);
      setIsEscort(!enable); // revert on error
    } finally {
      setSaving(null);
    }
  };

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const u = JSON.parse(stored);
        if (u?.id) {
          setUserId(u.id);
          // fetch fresh user with settings
          fetch(`/api/user/me?userId=${u.id}`)
            .then((r) => r.json())
            .then((data) => {
              if (data?.user) {
                setEmail(data.user.email ?? "");
                setUsername(data.user.username ?? "");
                if (data.user.theme === "DARK") setAppearance("dark");
                if (data.user.theme === "LIGHT") setAppearance("light");
                if (typeof data.user.isProfilePublic === "boolean") setIsProfilePublic(data.user.isProfilePublic);
                if (typeof data.user.useGridView === "boolean") setUseGridView(data.user.useGridView);
                if (typeof data.user.twoFactorEnabled === "boolean") setTwoFactorEnabled(data.user.twoFactorEnabled);
                if (typeof data.user.isEscort === "boolean") setIsEscort(data.user.isEscort);
              }
            })
            .catch(() => {});
        }
      }
    } catch {}
    setMounted(true);
  }, []);

  const saveGeneral = async () => {
    if (!userId) return;
    setSaving("general");
    setMessage(null);
    try {
      const res = await fetch("/api/user/settings/general", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, isProfilePublic, useGridView }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to save settings");
      setMessage(t("settings.saved.general"));
    } catch (e: any) {
      setMessage(e.message);
    } finally {
      setSaving(null);
    }
  };

  const saveLook = async () => {
    if (!userId) return;
    setSaving("look");
    setMessage(null);
    try {
      const theme = appearance === "dark" ? "DARK" : "LIGHT";
      const res = await fetch("/api/user/settings/look", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, theme }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to save theme");
      setMessage(t("settings.saved.appearance"));
    } catch (e: any) {
      setMessage(e.message);
    } finally {
      setSaving(null);
    }
  };

  const saveSecurityProfile = async () => {
    if (!userId) return;
    setSaving("security-profile");
    setMessage(null);
    try {
      const res = await fetch("/api/user/settings/security/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, email, username }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to update profile");
      setMessage(t("settings.saved.profile"));
      // update localStorage cache
      const stored = localStorage.getItem("user");
      if (stored) {
        const u = JSON.parse(stored);
        localStorage.setItem("user", JSON.stringify({ ...u, email, username }));
      }
    } catch (e: any) {
      setMessage(e.message);
    } finally {
      setSaving(null);
    }
  };

  const changePassword = async () => {
    if (!userId) return;
    if (!currentPassword || !newPassword || newPassword !== confirmPassword) {
      setMessage("Please fill all password fields and ensure they match.");
      return;
    }
    setSaving("security-password");
    setMessage(null);
    try {
      const res = await fetch("/api/user/settings/security/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to change password");
      setMessage(t("settings.saved.password"));
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (e: any) {
      setMessage(e.message);
    } finally {
      setSaving(null);
    }
  };

  const toggle2FA = async (enabled: boolean) => {
    if (!userId) return;
    setTwoFactorEnabled(enabled);
    setSaving("security-2fa");
    setMessage(null);
    try {
      const res = await fetch("/api/user/settings/security/twofa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, enabled }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to update 2FA");
      setMessage(t("settings.saved.twofa"));
    } catch (e: any) {
      setMessage(e.message);
    } finally {
      setSaving(null);
    }
  };

  if (!mounted) return null;

  return (
    <Theme accentColor="red" scaling="95%" appearance={appearance}>
      <Box className="min-h-[100svh]" style={{ background: "var(--gray-1)", color: "var(--gray-12)" }}>
        <Box className="mx-auto w-full max-w-7xl px-4 py-6 flex flex-col min-h-[100svh]">
          <TopBar />
          <div className="flex-1 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
            <Sidebar
              appearance={appearance}
              onAppearanceChange={handleAppearanceChange}
            />
            <Card size="3">
              <Heading size="6" mb="4">{t("settings.title")}</Heading>
              <Tabs.Root defaultValue="general">
                <Tabs.List className="mb-4">
                  <Tabs.Trigger value="general">{t("settings.tabs.general")}</Tabs.Trigger>
                  <Tabs.Trigger value="security">{t("settings.tabs.security")}</Tabs.Trigger>
                  <Tabs.Trigger value="look">{t("settings.tabs.look")}</Tabs.Trigger>
                </Tabs.List>
                

                <Tabs.Content value="general">
                  <Flex direction="column" gap="4">
                    <Box className="rounded-md p-3" style={{ background: "var(--gray-3)" }}>
                      <Flex direction="column" gap="2">
                        <Flex align="center" justify="between">
                          <Text weight="bold">{t("settings.general.profile_discoverable")}</Text>
                          <Switch checked={isProfilePublic} onCheckedChange={setIsProfilePublic} />
                        </Flex>
                        <Text size="1" color="gray">{t("settings.general.profile_discoverable_info")}</Text>
                      </Flex>
                    </Box>
                    <Box className="rounded-md p-3" style={{ background: "var(--gray-3)" }}>
                      <Flex direction="column" gap="2">
                        <Flex align="center" justify="between">
                          <Text weight="bold">{isEscort ? t("settings.general.escort_disable") : t("settings.general.escort_enable")}</Text>
                          <Switch checked={isEscort} onCheckedChange={toggleEscort} />
                        </Flex>
                        <Text size="1" color="gray">{isEscort ? t("settings.general.escort_disable_info") : t("settings.general.escort_enable_info")}</Text>
                      </Flex>
                    </Box>
                    <Box className="rounded-md p-3" style={{ background: "var(--gray-3)" }}>
                      <Flex direction="column" gap="2">
                        <Flex align="center" justify="between">
                          <Text weight="bold">{t("settings.general.grid_view")}</Text>
                          <Switch checked={useGridView} onCheckedChange={setUseGridView} />
                        </Flex>
                        <Text size="1" color="gray">{t("settings.general.grid_view_info")}</Text>
                      </Flex>
                    </Box>
                    <Flex gap="3" justify="end">
                      <Button onClick={saveGeneral} disabled={saving === "general" || !userId}>
                        {saving === "general" ? "Saving..." : t("settings.general.save")}
                      </Button>
                    </Flex>
                  </Flex>
                </Tabs.Content>

                <Tabs.Content value="security">
                  <Flex direction="column" gap="5">
                    <Box className="rounded-md p-3" style={{ background: "var(--gray-3)" }}>
                      <Text weight="bold" size="3" className="block mb-2">{t("settings.security.account")}</Text>
                      <Flex direction="column" gap="3">
                        <Box>
                          <Text as="label" size="2" className="block mb-1">{t("settings.security.email")}</Text>
                          <TextField.Root value={email} onChange={(e) => setEmail(e.target.value)} size="3" />
                        </Box>
                        <Box>
                          <Text as="label" size="2" className="block mb-1">{t("settings.security.username")}</Text>
                          <TextField.Root value={username} onChange={(e) => setUsername(e.target.value)} size="3" />
                        </Box>
                        <Flex justify="end">
                          <Button onClick={saveSecurityProfile} disabled={saving === "security-profile" || !userId}>
                            {saving === "security-profile" ? "Saving..." : t("settings.security.save_profile")}
                          </Button>
                        </Flex>
                      </Flex>
                    </Box>

                    <Box className="rounded-md p-3" style={{ background: "var(--gray-3)" }}>
                      <Text weight="bold" size="3" className="block mb-2">{t("settings.security.change_password")}</Text>
                      <Flex direction="column" gap="3">
                        <TextField.Root placeholder={t("settings.security.current_password") || ""} type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} size="3" />
                        <TextField.Root placeholder={t("settings.security.new_password") || ""} type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} size="3" />
                        <TextField.Root placeholder={t("settings.security.confirm_new_password") || ""} type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} size="3" />
                        <Flex justify="end">
                          <Button onClick={changePassword} disabled={saving === "security-password" || !userId}>
                            {saving === "security-password" ? "Saving..." : t("settings.security.change_password")}
                          </Button>
                        </Flex>
                      </Flex>
                    </Box>

                    <Box className="rounded-md p-3" style={{ background: "var(--gray-3)" }}>
                      <Text weight="bold" size="3" className="block mb-2">{t("settings.security.twofa")}</Text>
                      <Flex align="center" justify="between">
                        <Text>{t("settings.security.enable_2fa")}</Text>
                        <Switch checked={twoFactorEnabled} onCheckedChange={toggle2FA} />
                      </Flex>
                    </Box>
                  </Flex>
                </Tabs.Content>

                <Tabs.Content value="look">
                  <Flex direction="column" gap="4">
                    <Box className="rounded-md p-3" style={{ background: "var(--gray-3)" }}>
                      <Text weight="bold" size="3" className="block mb-2">{t("settings.look.appearance")}</Text>
                      <Flex align="center" justify="between">
                        <Text>{t("settings.look.dark_mode")}</Text>
                        <Switch checked={appearance === "dark"} onCheckedChange={(v) => handleAppearanceChange(v)} />
                      </Flex>
                    </Box>
                    <Flex gap="3" justify="end">
                      <Button onClick={saveLook} disabled={saving === "look" || !userId}>
                        {saving === "look" ? "Saving..." : t("settings.look.save")}
                      </Button>
                    </Flex>
                  </Flex>
                </Tabs.Content>
              </Tabs.Root>

              {message && (
                <Text color="gray" className="block mt-4">{message}</Text>
              )}
            </Card>
          </div>
          <Footer />
        </Box>
      </Box>
    </Theme>
  );
}
