"use client";
import React from "react";
import { Box, Card, Flex, Button, Avatar, Text, TextField, Separator, Badge } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import i18n from "@/lib/i18n";
import { useTranslation } from "react-i18next";

interface Profile {
  name: string;
  age: number;
  location: string;
  tags: string[];
}

interface RightPanelProps {
  profiles: Profile[];
}

export default function RightPanel({ profiles }: RightPanelProps) {
  const { t } = useTranslation();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Box className="hidden md:block">
      <Card size="3">
        <TextField.Root placeholder={t("rightPanel.search_placeholder") || ""} size="3">
          <TextField.Slot>
            <MagnifyingGlassIcon />
          </TextField.Slot>
        </TextField.Root>
        <Separator my="4" />
        <Flex direction="column" gap="3">
          {profiles.map((p, i) => (
            <Card key={i}>
              <Flex align="center" justify="between" gap="3">
                <Flex align="center" gap="3">
                  <Avatar
                    size="3"
                    src={`https://i.pravatar.cc/80?img=${i + 20}`}
                    fallback={p.name[0]}
                    radius="full"
                  />
                  <Box>
                    <Text weight="bold">
                      {p.name}, {p.age}
                    </Text>
                    <Text color="gray">{p.location}</Text>
                    <Flex gap="2" mt="2" wrap="wrap">
                      {p.tags.map((t, idx) => (
                        <Badge key={idx} variant="soft">
                          {t}
                        </Badge>
                      ))}
                    </Flex>
                  </Box>
                </Flex>
                <Flex direction="column" gap="2" align="end">
                  <Button variant="soft" size="2">
                    {t("ui.message")}
                  </Button>
                  <Button size="2">{t("ui.view_profile")}</Button>
                </Flex>
              </Flex>
            </Card>
          ))}
        </Flex>
      </Card>
    </Box>
  );
}
