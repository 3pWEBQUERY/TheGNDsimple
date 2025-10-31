"use client";
import React from "react";
import { Card, Tabs, Flex, Text, TextField, TextArea, Button, Box, IconButton, Badge, Callout } from "@radix-ui/themes";
import i18n from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import { useUploadThing } from "@/lib/uploadthing";
import { UploadIcon, ImageIcon, VideoIcon, TrashIcon, ReloadIcon, CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import GeneralTab from "./profile/GeneralTab";
import DescriptionTab from "./profile/DescriptionTab";
import ServicesTab from "./profile/ServicesTab";
import ContactTab from "./profile/ContactTab";
import LocationTab from "./profile/LocationTab";

interface UserData {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  isEscort?: boolean;
  profileBio?: string;
  profileGallery?: string[];
  escortProfile?: {
    bio?: string;
    description?: string;
    gallery?: string[];
    services?: any;
    contactEmail?: string;
    contactPhone?: string;
    website?: string;
    address?: string;
    city?: string;
    country?: string;
  } | null;
}

export default function ProfileTabs() {
  const { t } = useTranslation();
  const [mounted, setMounted] = React.useState(false);
  const [user, setUser] = React.useState<UserData | null>(null);
  const [saving, setSaving] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);
  const [messageType, setMessageType] = React.useState<"success" | "error">("success");
  const [files, setFiles] = React.useState<File[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = React.useState(false);

  // Form states (user)
  const [bio, setBio] = React.useState("");
  const [galleryText, setGalleryText] = React.useState("");

  // Escort fields
  const [escBio, setEscBio] = React.useState("");
  const [escDescription, setEscDescription] = React.useState("");
  const [escGalleryText, setEscGalleryText] = React.useState("");
  const [selectedServices, setSelectedServices] = React.useState<string[]>([]);
  const [servicesPricing, setServicesPricing] = React.useState<{[key: string]: {price: string, extra: boolean}}>({});
  const [generalPrices, setGeneralPrices] = React.useState<{label: string, price: string}[]>([]);
  // Contact data (dynamic)
  const [contactData, setContactData] = React.useState<{[key: string]: string}>({});
  // Location data
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [postalCode, setPostalCode] = React.useState("");
  const [state, setState] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [incall, setIncall] = React.useState(false);
  const [outcall, setOutcall] = React.useState(false);
  const [travelAvailable, setTravelAvailable] = React.useState(false);
  // Escort general extras
  const [slogan, setSlogan] = React.useState("");
  const [age, setAge] = React.useState<number | "">("");
  const [nationality, setNationality] = React.useState<string>("");
  const [languages, setLanguages] = React.useState<string[]>([]);
  const [heightCm, setHeightCm] = React.useState<number | "">("");
  const [weightKg, setWeightKg] = React.useState<number | "">("");
  const [bodyType, setBodyType] = React.useState("");
  const [hairColor, setHairColor] = React.useState("");
  const [hairLength, setHairLength] = React.useState("");
  const [breastType, setBreastType] = React.useState("");
  const [breastSize, setBreastSize] = React.useState("");
  const [intimateArea, setIntimateArea] = React.useState("");
  const [piercings, setPiercings] = React.useState("");
  const [tattoos, setTattoos] = React.useState("");
  const [clothingStyle, setClothingStyle] = React.useState("");
  const [clothingSize, setClothingSize] = React.useState("");
  const [shoeSize, setShoeSize] = React.useState("");
  // dropdown state
  const [openNation, setOpenNation] = React.useState(false);
  const [nationQuery, setNationQuery] = React.useState("");
  const [openLang, setOpenLang] = React.useState(false);
  const [langQuery, setLangQuery] = React.useState("");


  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const u = JSON.parse(stored);
        fetch(`/api/user/me?userId=${u.id}`)
          .then((r) => r.json())
          .then((data) => {
            if (data?.user) {
              setUser(data.user);
              setBio(data.user.profileBio || "");
              setGalleryText((data.user.profileGallery || []).join("\n"));
              if (data.user.escortProfile) {
                setEscBio(data.user.escortProfile.bio || "");
                setEscDescription(data.user.escortProfile.description || "");
                setEscGalleryText((data.user.escortProfile.gallery || []).join("\n"));
                const sv = data.user.escortProfile.services;
                if (sv && typeof sv === "object" && !Array.isArray(sv)) {
                  setSelectedServices((sv as any).selected || []);
                  setServicesPricing((sv as any).pricing || {});
                  setGeneralPrices((sv as any).general || []);
                }
                // Load contact data
                const profile = data.user.escortProfile as any;
                const contacts: {[key: string]: string} = {};
                ['whatsapp', 'telegram', 'signal', 'viber', 'wechat', 'line', 'snapchat', 'instagram', 'twitter', 'onlyfans', 'website'].forEach(key => {
                  if (profile[key]) contacts[key] = profile[key];
                });
                setContactData(contacts);
                // Load location data
                setAddress(profile.address || "");
                setCity(profile.city || "");
                setPostalCode(profile.postalCode || "");
                setState(profile.state || "");
                setCountry(profile.country || "");
                setIncall(profile.incall || false);
                setOutcall(profile.outcall || false);
                setTravelAvailable(profile.travelAvailable || false);
                setSlogan((data.user.escortProfile as any).slogan || "");
                setAge((data.user.escortProfile as any).age ?? "");
                setNationality((data.user.escortProfile as any).nationality || "");
                setLanguages((data.user.escortProfile as any).languages || []);
                setHeightCm((data.user.escortProfile as any).heightCm ?? "");
                setWeightKg((data.user.escortProfile as any).weightKg ?? "");
                setBodyType((data.user.escortProfile as any).bodyType || "");
                setHairColor((data.user.escortProfile as any).hairColor || "");
                setHairLength((data.user.escortProfile as any).hairLength || "");
                setBreastType((data.user.escortProfile as any).breastType || "");
                setBreastSize((data.user.escortProfile as any).breastSize || "");
                setIntimateArea((data.user.escortProfile as any).intimateArea || "");
                setPiercings((data.user.escortProfile as any).piercings || "");
                setTattoos((data.user.escortProfile as any).tattoos || "");
                setClothingStyle((data.user.escortProfile as any).clothingStyle || "");
                setClothingSize((data.user.escortProfile as any).clothingSize || "");
                setShoeSize((data.user.escortProfile as any).shoeSize || "");
              }
            }
          })
          .catch(() => {});
      }
    } catch {}
    setMounted(true);
  }, []);

  const saveUserGeneral = async () => {
    if (!user) return;
    setSaving("user-general");
    setMessage(null);
    try {
      const res = await fetch("/api/user/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, bio, gallery: galleryText.split("\n").filter(Boolean) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to save");
      setMessageType("success");
      setMessage(t("profile.fields.saved"));
      setTimeout(() => setMessage(null), 3000);
    } catch (e: any) {
      setMessageType("error");
      setMessage(e.message);
      setTimeout(() => setMessage(null), 5000);
    } finally {
      setSaving(null);
    }
  };

  const saveEscort = async () => {
    if (!user) return;
    setSaving("escort");
    setMessage(null);
    try {
      const res = await fetch("/api/escort/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          bio: escBio,
          description: escDescription,
          gallery: escGalleryText.split("\n").filter(Boolean),
          services: { selected: selectedServices, pricing: servicesPricing, general: generalPrices },
          ...contactData,
          address,
          city,
          postalCode,
          state,
          country,
          incall,
          outcall,
          travelAvailable,
          slogan,
          age: typeof age === "number" ? age : Number(age) || null,
          nationality,
          languages,
          heightCm: typeof heightCm === "number" ? heightCm : Number(heightCm) || null,
          weightKg: typeof weightKg === "number" ? weightKg : Number(weightKg) || null,
          bodyType,
          hairColor,
          hairLength,
          breastType,
          breastSize,
          intimateArea,
          piercings,
          tattoos,
          clothingStyle,
          clothingSize,
          shoeSize,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to save");
      setMessageType("success");
      setMessage(t("profile.fields.saved"));
      setTimeout(() => setMessage(null), 3000);
    } catch (e: any) {
      setMessageType("error");
      setMessage(e.message);
      setTimeout(() => setMessage(null), 5000);
    } finally {
      setSaving(null);
    }
  };

  const isEscort = !!user?.isEscort;
  const endpoint = isEscort ? "escortMedia" : "galleryImage";
  const { startUpload, isUploading } = useUploadThing(endpoint, {
    onClientUploadComplete: async (res) => {
      try {
        const entries = (res || []).map((f: any) => {
          const url = f?.url as string | undefined;
          const name: string = (f?.name as string) || "";
          const isVideo = /\.(mp4|webm|ogg|ogv|mov|avi|mkv)$/i.test(name);
          if (!url) return null;
          return isVideo ? `video:${url}` : url;
        }).filter(Boolean) as string[];
        if (!user || entries.length === 0) return;
        if (isEscort) {
          const newGallery = [
            ...((user.escortProfile?.gallery as string[] | undefined) || []),
            ...entries,
          ];
          const r = await fetch("/api/escort/profile/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.id, gallery: newGallery }),
          });
          const d = await r.json();
          if (!r.ok) throw new Error(d?.error || "Failed to save");
          setUser((prev) => (prev ? { ...prev, escortProfile: { ...(prev.escortProfile || {}), gallery: newGallery } } as any : prev));
          setEscGalleryText(newGallery.join("\n"));
          setMessage(t("profile.fields.saved"));
        } else {
          const newGallery = [
            ...((user.profileGallery as string[] | undefined) || []),
            ...entries.filter((e) => !e.startsWith("video:")),
          ];
          const r = await fetch("/api/user/profile/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.id, gallery: newGallery }),
          });
          const d = await r.json();
          if (!r.ok) throw new Error(d?.error || "Failed to save");
          setUser((prev) => (prev ? { ...prev, profileGallery: newGallery } : prev));
          setGalleryText(newGallery.join("\n"));
          setMessage(t("profile.fields.saved"));
        }
      } catch (e: any) {
        setMessage(e?.message || "Upload failed");
      } finally {
        setFiles([]);
      }
    },
    onUploadError: (error: Error) => setMessage(error.message),
  });

  if (!mounted) return null;

  return (
    <>
      <Card style={{ padding: 24 }}>
        <Tabs.Root defaultValue="general">
          <Tabs.List className="mb-4">
            <Tabs.Trigger value="general">{t("profile.tabs.general")}</Tabs.Trigger>
            {isEscort && <Tabs.Trigger value="description">{t("profile.tabs.description")}</Tabs.Trigger>}
            <Tabs.Trigger value="gallery">{t("profile.tabs.gallery")}</Tabs.Trigger>
            {isEscort && <Tabs.Trigger value="services">{t("profile.tabs.services")}</Tabs.Trigger>}
            {isEscort && <Tabs.Trigger value="contact">{t("profile.tabs.contact")}</Tabs.Trigger>}
            {isEscort && <Tabs.Trigger value="location">{t("profile.tabs.location")}</Tabs.Trigger>}
          </Tabs.List>

        {/* General */}
        <Tabs.Content value="general">
          <GeneralTab
            isEscort={isEscort}
            slogan={slogan}
            setSlogan={setSlogan}
            age={age}
            setAge={setAge}
            nationality={nationality}
            setNationality={setNationality}
            languages={languages}
            setLanguages={setLanguages}
            heightCm={heightCm}
            setHeightCm={setHeightCm}
            weightKg={weightKg}
            setWeightKg={setWeightKg}
            bodyType={bodyType}
            setBodyType={setBodyType}
            hairColor={hairColor}
            setHairColor={setHairColor}
            hairLength={hairLength}
            setHairLength={setHairLength}
            breastType={breastType}
            setBreastType={setBreastType}
            breastSize={breastSize}
            setBreastSize={setBreastSize}
            intimateArea={intimateArea}
            setIntimateArea={setIntimateArea}
            piercings={piercings}
            setPiercings={setPiercings}
            tattoos={tattoos}
            setTattoos={setTattoos}
            clothingStyle={clothingStyle}
            setClothingStyle={setClothingStyle}
            clothingSize={clothingSize}
            setClothingSize={setClothingSize}
            shoeSize={shoeSize}
            setShoeSize={setShoeSize}
            openNation={openNation}
            setOpenNation={setOpenNation}
            nationQuery={nationQuery}
            setNationQuery={setNationQuery}
            openLang={openLang}
            setOpenLang={setOpenLang}
            langQuery={langQuery}
            setLangQuery={setLangQuery}
            onSave={isEscort ? saveEscort : saveUserGeneral}
            saving={saving}
          />
        </Tabs.Content>

        {/* Description (escort) */}
        {isEscort && (
          <Tabs.Content value="description">
            <DescriptionTab
              escDescription={escDescription}
              setEscDescription={setEscDescription}
              onSave={saveEscort}
              saving={saving}
            />
          </Tabs.Content>
        )}

        {/* Gallery */}
        <Tabs.Content value="gallery">
          <Flex direction="column" gap="4">
            <Box className="rounded-md p-3" style={{ background: "var(--gray-3)" }}>
              <Flex direction="column" gap="3">
                <Flex align="center" gap="2">
                  <UploadIcon />
                  <Text as="div" size="2" weight="bold" className="block">{t("profile.upload.title")}</Text>
                </Flex>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragActive(false);
                    const dropped = Array.from(e.dataTransfer.files || []);
                    const maxImage = 10 * 1024 * 1024;
                    const maxVideo = 200 * 1024 * 1024;
                    const filtered = dropped.filter((f) => {
                      if (f.type?.startsWith("image/")) return f.size <= maxImage;
                      if (f.type?.startsWith("video/")) return isEscort && f.size <= maxVideo;
                      return false;
                    });
                    if (filtered.length !== dropped.length) {
                      setMessage(t("profile.upload.rejected"));
                    }
                    if (filtered.length) setFiles((prev) => [...prev, ...filtered]);
                  }}
                  style={{
                    border: `2px dashed ${dragActive ? "crimson" : "var(--gray-6)"}`,
                    background: "var(--gray-2)",
                    borderRadius: 10,
                    padding: 16,
                    display: "flex",
                    alignItems: "stretch",
                    justifyContent: "space-between",
                    gap: 12,
                    opacity: isUploading ? 0.7 : 1,
                    pointerEvents: isUploading ? "none" : "auto",
                  }}
                  className="flex-col md:flex-row md:items-center md:justify-between"
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Text size="2">{t("profile.upload.drag_or_select")}</Text>
                    <Text size="1" color="gray">
                      {isEscort ? t("profile.upload.media_limit") : t("profile.upload.images_limit")}
                    </Text>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }} className="flex-wrap md:flex-nowrap">
                    <input
                      ref={inputRef}
                      type="file"
                      multiple
                      accept={isEscort ? "image/*,video/*" : "image/*"}
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const selected = Array.from(e.target.files || []);
                        const maxImage = 10 * 1024 * 1024;
                        const maxVideo = 200 * 1024 * 1024;
                        const filtered = selected.filter((f) => {
                          if (f.type?.startsWith("image/")) return f.size <= maxImage;
                          if (f.type?.startsWith("video/")) return isEscort && f.size <= maxVideo;
                          return false;
                        });
                        if (filtered.length !== selected.length) {
                          setMessage(t("profile.upload.rejected"));
                        }
                        if (filtered.length) setFiles((prev) => [...prev, ...filtered]);
                        if (inputRef.current) inputRef.current.value = "";
                      }}
                    />
                    <Button size="2" onClick={() => inputRef.current?.click()} disabled={isUploading} className="w-full md:w-auto">{t("profile.upload.choose_files")}</Button>
                    <Button size="2" variant="soft" onClick={() => setFiles([])} disabled={!files.length || isUploading} className="w-full md:w-auto">{t("profile.upload.clear_selection")}</Button>
                    <Button
                      size="2"
                      variant="solid"
                      onClick={async () => { if (!files.length || isUploading) return; await startUpload(files); }}
                      disabled={!files.length || isUploading}
                      className="w-full md:w-auto"
                    >
                      {isUploading ? t("profile.upload.uploading") : `${t("profile.upload.upload")} (${files.length})`}
                    </Button>
                  </div>
                </div>
                {isUploading && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <Flex align="center" gap="2">
                      <ReloadIcon style={{ color: "crimson" }} />
                      <Text size="2">{t("profile.upload.uploading")}</Text>
                    </Flex>
                    <div style={{ height: 6, width: "100%", background: "var(--gray-5)", borderRadius: 6, overflow: "hidden" }}>
                      <div style={{ width: "100%", height: "100%", background: "crimson" }} />
                    </div>
                  </div>
                )}
                {files.length > 0 && (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 10 }}>
                    {files.map((f, idx) => {
                      const isVid = f.type?.startsWith("video/");
                      const url = !isVid ? URL.createObjectURL(f) : "";
                      return (
                        <div key={f.name + f.size + idx} style={{ position: "relative", border: "1px solid var(--gray-6)", borderRadius: 8, overflow: "hidden" }}>
                          <div style={{ position: "absolute", top: 6, right: 6, zIndex: 1 }}>
                            <IconButton size="1" variant="soft" onClick={() => setFiles((prev) => prev.filter((_, i) => i !== idx))}>
                              <TrashIcon />
                            </IconButton>
                          </div>
                          <div style={{ aspectRatio: "1/1", background: "var(--gray-1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {isVid ? (
                              <VideoIcon />
                            ) : (
                              <img src={url} alt={f.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            )}
                          </div>
                          <div style={{ padding: 6 }}>
                            <Text size="1" color="gray">{f.name}</Text>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Flex>
            </Box>

            <Box className="rounded-md p-3" style={{ background: "var(--gray-3)" }}>
              <Text as="label" size="2" weight="bold" className="block mb-2">{t("profile.tabs.gallery")}</Text>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                  gap: 12,
                }}
              >
                {((isEscort ? user?.escortProfile?.gallery : user?.profileGallery) || []).map((url) => {
                  const prefixed = typeof url === "string" && url.startsWith("video:");
                  const mediaUrl = prefixed ? url.slice(6) : url;
                  const isVid = prefixed || /\.(mp4|webm|ogg|ogv|mov|avi|mkv)$/i.test(mediaUrl);
                  const isCurrentAvatar = user?.avatar === mediaUrl;
                  return (
                    <div key={url} style={{ position: "relative", border: "1px solid var(--gray-6)", borderRadius: 8, overflow: "hidden" }}>
                      <div style={{ position: "absolute", top: 6, right: 6, zIndex: 1 }}>
                        <IconButton
                          size="1"
                          variant="soft"
                          onClick={async () => {
                            if (!user) return;
                            try {
                              const source = (isEscort ? (user.escortProfile?.gallery || []) : (user.profileGallery || []));
                              const newGallery = source.filter((g) => g !== url);
                              if (isEscort) {
                                const r = await fetch("/api/escort/profile/update", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ userId: user.id, gallery: newGallery }),
                                });
                                const d = await r.json();
                                if (!r.ok) throw new Error(d?.error || "Failed to delete");
                                setUser((prev) => (prev ? { ...prev, escortProfile: { ...(prev.escortProfile || {}), gallery: newGallery } } as any : prev));
                                setEscGalleryText(newGallery.join("\n"));
                              } else {
                                const r = await fetch("/api/user/profile/update", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ userId: user.id, gallery: newGallery }),
                                });
                                const d = await r.json();
                                if (!r.ok) throw new Error(d?.error || "Failed to delete");
                                setUser((prev) => (prev ? { ...prev, profileGallery: newGallery } : prev));
                                setGalleryText(newGallery.join("\n"));
                              }
                              if (user.avatar === mediaUrl) {
                                const r2 = await fetch("/api/user/profile/update", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ userId: user.id, avatar: null }),
                                });
                                await r2.json();
                                setUser((prev) => (prev ? { ...prev, avatar: undefined } : prev));
                                try {
                                  const stored = localStorage.getItem("user");
                                  if (stored) {
                                    const uu = JSON.parse(stored);
                                    if (uu?.id === user.id) {
                                      localStorage.setItem("user", JSON.stringify({ ...uu, avatar: undefined }));
                                      window.dispatchEvent(new Event("gnd:user:update"));
                                    }
                                  }
                                } catch {}
                              }
                              setMessage(t("profile.fields.saved"));
                            } catch (e: any) {
                              setMessage(e?.message || "Delete failed");
                            }
                          }}
                        >
                          <TrashIcon />
                        </IconButton>
                      </div>
                      <div style={{ aspectRatio: "1/1", background: "var(--gray-1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {isVid ? (
                          <video src={mediaUrl} controls style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <img src={mediaUrl} alt="media" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        )}
                      </div>
                      {!isVid && (
                        <div style={{ padding: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          {isCurrentAvatar ? (
                            <Badge color="green" variant="solid">{t("profile.upload.avatar_badge")}</Badge>
                          ) : (
                            <span />
                          )}
                          {!isCurrentAvatar && (
                            <Button
                              size="1"
                              onClick={async () => {
                                if (!user) return;
                                try {
                                  const r = await fetch("/api/user/profile/update", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ userId: user.id, avatar: mediaUrl }),
                                  });
                                  const d = await r.json();
                                  if (!r.ok) throw new Error(d?.error || "Failed to save");
                                  setUser((prev) => (prev ? { ...prev, avatar: mediaUrl } : prev));
                                  try {
                                    const stored = localStorage.getItem("user");
                                    if (stored) {
                                      const uu = JSON.parse(stored);
                                      if (uu?.id === user.id) {
                                        localStorage.setItem("user", JSON.stringify({ ...uu, avatar: mediaUrl }));
                                        window.dispatchEvent(new Event("gnd:user:update"));
                                      }
                                    }
                                  } catch {}
                                  setMessage(t("profile.fields.saved"));
                                } catch (e: any) {
                                  setMessage(e?.message || "Failed to set avatar");
                                }
                              }}
                            >
                              {t("profile.upload.set_as_avatar")}
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Box>
          </Flex>
        </Tabs.Content>

        {/* Services & Prices (escort) */}
        {isEscort && (
          <Tabs.Content value="services">
            <ServicesTab
              selectedServices={selectedServices}
              setSelectedServices={setSelectedServices}
              servicesPricing={servicesPricing}
              setServicesPricing={setServicesPricing}
              generalPrices={generalPrices}
              setGeneralPrices={setGeneralPrices}
              onSave={saveEscort}
              saving={saving}
            />
          </Tabs.Content>
        )}

        {/* Contact (escort) */}
        {isEscort && (
          <Tabs.Content value="contact">
            <ContactTab
              contactData={contactData}
              setContactData={setContactData}
              onSave={saveEscort}
              saving={saving}
            />
          </Tabs.Content>
        )}

        {/* Location (escort) */}
        {isEscort && (
          <Tabs.Content value="location">
            <LocationTab
              address={address}
              setAddress={setAddress}
              city={city}
              setCity={setCity}
              postalCode={postalCode}
              setPostalCode={setPostalCode}
              state={state}
              setState={setState}
              country={country}
              setCountry={setCountry}
              incall={incall}
              setIncall={setIncall}
              outcall={outcall}
              setOutcall={setOutcall}
              travelAvailable={travelAvailable}
              setTravelAvailable={setTravelAvailable}
              onSave={saveEscort}
              saving={saving}
            />
          </Tabs.Content>
        )}
      </Tabs.Root>

      </Card>

      {message && (
        <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999, maxWidth: 400 }}>
          <Callout.Root color={messageType === "success" ? "green" : "red"} size="2">
            <Callout.Icon>
              {messageType === "success" ? <CheckCircledIcon /> : <CrossCircledIcon />}
            </Callout.Icon>
            <Callout.Text>{message}</Callout.Text>
          </Callout.Root>
        </div>
      )}
    </>
  );
}
