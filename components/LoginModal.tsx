"use client";
import React from "react";
import {
  Dialog,
  Box,
  Flex,
  Button,
  TextField,
  Heading,
  Text,
} from "@radix-ui/themes";
import { Cross2Icon } from "@radix-ui/react-icons";
import i18n from "@/lib/i18n";
import { useTranslation } from "react-i18next";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const { t } = useTranslation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || t("auth.login_failed") || "");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.reload();
      onOpenChange(false);
    } catch (err) {
      setError(t("errors.generic") || "");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>
          <Flex justify="between" align="center" mb="4">
            <Heading size="6">{t("auth.login")}</Heading>
            <Dialog.Close>
              <Button variant="ghost" size="2">
                <Cross2Icon />
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Title>

        <Box mb="4">
          <Text as="label" size="2" weight="bold" className="block mb-2">
            {t("form.email")}
          </Text>
          <TextField.Root
            placeholder="your@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="3"
          />
        </Box>

        <Box mb="6">
          <Flex justify="between" align="center" mb="2">
            <Text as="label" size="2" weight="bold">
              {t("form.password")}
            </Text>
            <Button
              variant="ghost"
              size="1"
              onClick={() => console.log("Forgot password clicked")}
              style={{ padding: "0", height: "auto" }}
            >
              <Text size="1" color="red">
                {t("auth.forgot_password")}
              </Text>
            </Button>
          </Flex>
          <TextField.Root
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="3"
          />
        </Box>

        {error && (
          <Box mb="4" style={{ padding: "8px 12px", background: "var(--red-3)", borderRadius: "4px" }}>
            <Text size="2" color="red">
              {error}
            </Text>
          </Box>
        )}

        <Flex gap="3" justify="end">
          <Dialog.Close>
            <Button variant="soft">{t("common.cancel")}</Button>
          </Dialog.Close>
          <Button onClick={handleLogin} disabled={loading}>
            {loading ? t("auth.logging_in") : t("auth.login")}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
