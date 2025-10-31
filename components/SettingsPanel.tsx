"use client";
import React from "react";
import { Box, Card, Flex, Button, Heading, Text, Switch, Separator } from "@radix-ui/themes";
import { Cross2Icon } from "@radix-ui/react-icons";

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
  appearance: "light" | "dark";
  onAppearanceChange: (v: boolean) => void;
}

export default function SettingsPanel({
  open,
  onClose,
  appearance,
  onAppearanceChange,
}: SettingsPanelProps) {
  if (!open) return null;

  return (
    <Card size="3">
      <Flex justify="between" align="center" mb="4">
        <Heading size="6">Settings</Heading>
        <Button variant="ghost" size="2" onClick={onClose}>
          <Cross2Icon />
        </Button>
      </Flex>

      <Separator mb="4" />

      <Box mb="6">
        <Text weight="bold" size="3" className="block mb-3">
          Appearance
        </Text>
        <Flex align="center" justify="between">
          <Text size="2">Dark Mode</Text>
          <Switch
            checked={appearance === "dark"}
            onCheckedChange={onAppearanceChange}
          />
        </Flex>
      </Box>

      <Separator mb="4" />

      <Box mb="6">
        <Text weight="bold" size="3" className="block mb-3">
          Account
        </Text>
        <Flex direction="column" gap="2">
          <Button variant="ghost" size="2" style={{ justifyContent: "flex-start" }}>
            Change Password
          </Button>
          <Button variant="ghost" size="2" style={{ justifyContent: "flex-start" }}>
            Privacy Settings
          </Button>
          <Button variant="ghost" size="2" style={{ justifyContent: "flex-start" }}>
            Notifications
          </Button>
        </Flex>
      </Box>

      <Separator mb="4" />

      <Box>
        <Text weight="bold" size="3" className="block mb-3">
          About
        </Text>
        <Text size="2" color="gray">
          TheGND v1.0.0
        </Text>
      </Box>
    </Card>
  );
}
