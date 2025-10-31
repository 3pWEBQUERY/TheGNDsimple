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

interface RegisterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RegisterModal({ open, onOpenChange }: RegisterModalProps) {
  const { t } = useTranslation();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || t("auth.registration_failed") || "");
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
            <Heading size="6">{t("auth.register")}</Heading>
            <Dialog.Close>
              <Button variant="ghost" size="2">
                <Cross2Icon />
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Title>

        <Box mb="4">
          <Text as="label" size="2" weight="bold" className="block mb-2">{t("form.username")}</Text>
          <TextField.Root
            placeholder="johndoe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            size="3"
          />
        </Box>

        <Box mb="4">
          <Text as="label" size="2" weight="bold" className="block mb-2">{t("form.email")}</Text>
          <TextField.Root
            placeholder="your@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="3"
          />
        </Box>

        <Box mb="4">
          <Text as="label" size="2" weight="bold" className="block mb-2">{t("form.password")}</Text>
          <TextField.Root
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="3"
          />
        </Box>

        <Box mb="6">
          <Text as="label" size="2" weight="bold" className="block mb-2">{t("form.confirm_password")}</Text>
          <TextField.Root
            placeholder="••••••••"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          <Button onClick={handleRegister} disabled={loading}>
            {loading ? t("auth.registering") : t("auth.register")}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
