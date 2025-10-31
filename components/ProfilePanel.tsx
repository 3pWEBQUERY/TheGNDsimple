"use client";
import React from "react";
import { Card, Box, Flex, Avatar, Text, Heading, Button } from "@radix-ui/themes";
import i18n from "@/lib/i18n";
import { useTranslation } from "react-i18next";

export default function ProfilePanel() {
  const { t } = useTranslation();
  const [mounted, setMounted] = React.useState(false);
  const [user, setUser] = React.useState<{ id: string; email: string; username: string; avatar?: string } | null>(null);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const u = JSON.parse(stored);
        setUser(u);
        fetch(`/api/user/me?userId=${u.id}`)
          .then((r) => r.json())
          .then((data) => {
            if (data?.user) setUser((prev) => ({ ...prev, ...data.user }));
          })
          .catch(() => {});
      }
    } catch {}
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Card size="3">
      <Heading size="6" mb="4">{t("nav.profile")}</Heading>
      {user ? (
        <Flex align="center" gap="4">
          <Avatar size="5" radius="full" src={user.avatar} fallback={(user.username || "U").slice(0,1).toUpperCase()} />
          <Box>
            <Text size="4" weight="bold">{user.username}</Text>
            <Text color="gray">@{user.username}</Text>
            <Box mt="2">
              <Text as="span" weight="bold">{t("form.email")}:</Text>{" "}
              <Text as="span">{user.email}</Text>
            </Box>
          </Box>
        </Flex>
      ) : (
        <Text color="gray">{t("auth.sign_in_to_continue")}</Text>
      )}
    </Card>
  );
}
