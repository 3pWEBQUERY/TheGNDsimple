"use client";
import React from "react";
import { Box, Card, Flex, Heading, Button, Avatar, Text } from "@radix-ui/themes";
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

export default function TopBar() {
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
      <Box className="md:hidden mb-4">
        <Card>
          <Flex align="center" justify="between">
            <Heading size="5" className="font-mono">
              TheGND
            </Heading>
            <Flex align="center" gap="3">
              {user ? (
                <Flex align="center" gap="2">
                  <Avatar size="2" src={user.avatar} fallback={user.username[0].toUpperCase()} radius="full" />
                  <Box>
                    <Text size="2" weight="bold">
                      {user.username}
                    </Text>
                  </Box>
                  <Button size="2" variant="soft" onClick={handleLogout}>
                    {t("auth.logout")}
                  </Button>
                </Flex>
              ) : (
                <>
                  <Button
                    size="3"
                    style={{ width: "100px", height: "40px" }}
                    onClick={() => setLoginOpen(true)}
                  >
                    {t("auth.login")}
                  </Button>
                  <Button
                    size="3"
                    style={{ width: "100px", height: "40px" }}
                    onClick={() => setRegisterOpen(true)}
                  >
                    {t("auth.register")}
                  </Button>
                </>
              )}
            </Flex>
          </Flex>
        </Card>
      </Box>
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
      <RegisterModal open={registerOpen} onOpenChange={setRegisterOpen} />
    </>
  );
}
