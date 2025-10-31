"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Box, Card, Flex, Button, Heading, Separator, Avatar, Text, Switch } from "@radix-ui/themes";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  EnvelopeClosedIcon,
  HeartIcon,
  PersonIcon,
  SunIcon,
  MoonIcon,
  GearIcon,
} from "@radix-ui/react-icons";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import i18n from "@/lib/i18n";
import { useTranslation } from "react-i18next";

interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
}

interface SidebarProps {
  appearance: "light" | "dark";
  onAppearanceChange: (v: boolean) => void;
  onSettingsOpen?: (open: boolean) => void;
}

export default function Sidebar({ appearance, onAppearanceChange, onSettingsOpen }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [registerOpen, setRegisterOpen] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const sync = () => {
      try {
        const storedUser = localStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch {}
    };
    sync();
    const handler = () => sync();
    window.addEventListener("gnd:user:update", handler);
    window.addEventListener("storage", handler);
    setMounted(true);
    return () => {
      window.removeEventListener("gnd:user:update", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  if (!mounted) return null;

  return (
    <>
      <Box className="hidden md:block">
        <Card mb="5">
          {user ? (
            <Flex direction="column" gap="4">
              <Flex align="center" gap="4">
                <Avatar size="3" src={user.avatar} fallback={user.username[0].toUpperCase()} radius="full" />
                <Flex direction="column" gap="0">
                  <Text weight="bold" size="2">{user.username}</Text>
                  <Text color="gray" size="1">@{user.username}</Text>
                </Flex>
              </Flex>
              <Button size="2" variant="soft" onClick={handleLogout} style={{ width: "100%" }}>
                {t("auth.logout")}
              </Button>
            </Flex>
          ) : (
            <Flex direction="column" gap="4" align="stretch" justify="center">
              <Box>
                <Text weight="bold" size="3" className="block mb-2">{t("auth.sign_in_to_continue")}</Text>
                <Text color="gray" size="2">{t("auth.login_or_register")}</Text>
              </Box>
              <Flex gap="2" style={{ width: "49%" }}>
                <Button
                  size="2"
                  style={{ width: "100%", justifyContent: "center" }}
                  onClick={() => setLoginOpen(true)}
                >
                  {t("auth.login")}
                </Button>
                <Button
                  size="2"
                  style={{ width: "100%", justifyContent: "center" }}
                  onClick={() => setRegisterOpen(true)}
                >
                  {t("auth.register")}
                </Button>
              </Flex>
            </Flex>
          )}
        </Card>
      <Card size="3">
        <Flex direction="column" gap="2">
          <Button
            variant="ghost"
            size="3"
            style={{
              width: "100%",
              justifyContent: "flex-start",
              padding: "8px 12px",
              opacity: pathname === "/" ? 1 : 0.7,
              fontWeight: pathname === "/" ? "bold" : "normal",
            }}
            className="!hover:bg-slate-700 dark:!hover:bg-slate-600 transition-colors"
            onClick={() => router.push("/")}
          >
            <HomeIcon /> {t("nav.home")}
          </Button>
          <Button
            variant="ghost"
            size="3"
            style={{ width: "100%", justifyContent: "flex-start", padding: "8px 12px" }}
            className="!hover:bg-slate-700 dark:!hover:bg-slate-600 transition-colors"
          >
            <MagnifyingGlassIcon /> {t("nav.explore")}
          </Button>
          <Button
            variant="ghost"
            size="3"
            style={{ width: "100%", justifyContent: "flex-start", padding: "8px 12px" }}
            className="!hover:bg-slate-700 dark:!hover:bg-slate-600 transition-colors"
          >
            <EnvelopeClosedIcon /> {t("nav.messages")}
          </Button>
          <Button
            variant="ghost"
            size="3"
            style={{ width: "100%", justifyContent: "flex-start", padding: "8px 12px" }}
            className="!hover:bg-slate-700 dark:!hover:bg-slate-600 transition-colors"
          >
            <HeartIcon /> {t("nav.favorites")}
          </Button>
          <Button
            variant="ghost"
            size="3"
            style={{
              width: "100%",
              justifyContent: "flex-start",
              padding: "8px 12px",
              opacity: pathname === "/profile" ? 1 : 0.7,
              fontWeight: pathname === "/profile" ? "bold" : "normal",
            }}
            className="!hover:bg-slate-700 dark:!hover:bg-slate-600 transition-colors"
            onClick={() => router.push("/profile")}
          >
            <PersonIcon /> {t("nav.profile")}
          </Button>
          <Button
            variant="ghost"
            size="3"
            style={{
              width: "100%",
              justifyContent: "flex-start",
              padding: "8px 12px",
              opacity: pathname === "/settings" ? 1 : 0.7,
              fontWeight: pathname === "/settings" ? "bold" : "normal",
            }}
            className="!hover:bg-slate-700 dark:!hover:bg-slate-600 transition-colors"
            onClick={() => router.push("/settings")}
          >
            <GearIcon /> {t("nav.settings")}
          </Button>
        </Flex>
        <Box mt="5">
          <Button size="3">{t("nav.premium")}</Button>
        </Box>
      </Card>
    </Box>
    <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    <RegisterModal open={registerOpen} onOpenChange={setRegisterOpen} />
    </>
  );
}
