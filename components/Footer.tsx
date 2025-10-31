"use client";
import React from "react";
import { Box, Card, Flex, Text, Select } from "@radix-ui/themes";
import i18n from "@/lib/i18n";
import { useTranslation } from "react-i18next";

interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
}

export default function Footer() {
  const { t } = useTranslation();
  const [lang, setLang] = React.useState<string>("en");
  const languages: { value: string; label: string }[] = React.useMemo(
    () => [
      { value: "en", label: "English" },
      { value: "de", label: "Deutsch" },
      { value: "es", label: "Español" },
      { value: "fr", label: "Français" },
      { value: "it", label: "Italiano" },
      { value: "pl", label: "Polski" },
      { value: "cs", label: "Čeština" },
      { value: "hu", label: "Magyar" },
      { value: "ro", label: "Română" },
    ],
    []
  );

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    try {
      const current = i18n.language || localStorage.getItem("lang") || "en";
      setLang(current);
      document.documentElement.lang = current;
    } catch {}
    setMounted(true);
  }, []);

  const handleLangChange = (value: string) => {
    setLang(value);
    try {
      localStorage.setItem("lang", value);
      document.documentElement.lang = value;
      i18n.changeLanguage(value);
      window.dispatchEvent(new CustomEvent("lang-changed", { detail: { lang: value } }));
    } catch {}
  };

  if (!mounted) return null;

  return (
    <>
      <Box className="md:hidden mt-6">
        <Card>
          <Flex align="center" justify="between">
            <Text size="2" color="gray">{t("footer.rights")}</Text>
            <Select.Root value={lang} onValueChange={handleLangChange}>
              <Select.Trigger placeholder={t("footer.language")} style={{ minWidth: 160 }}>
                {languages.find((l) => l.value === lang)?.label || t("footer.language")}
              </Select.Trigger>
              <Select.Content style={{ width: 220 }}>
                {languages.map((l) => (
                  <Select.Item
                    key={l.value}
                    value={l.value}
                    style={{ padding: "8px 10px" }}
                  >
                    <Flex align="center" gap="2">
                      <span style={{ fontWeight: 600 }}>{l.label}</span>
                    </Flex>
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Flex>
        </Card>
      </Box>
    </>
  );
}
