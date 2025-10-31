"use client";
import React from "react";
import { Flex, Text, Button, Box } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("../RichTextEditor"), { ssr: false });

interface DescriptionTabProps {
  escDescription: string;
  setEscDescription: (v: string) => void;
  onSave: () => void;
  saving: string | null;
}

export default function DescriptionTab(props: DescriptionTabProps) {
  const { t } = useTranslation();

  return (
    <Flex direction="column" gap="4">
      <Box className="rounded-md p-3" style={{ background: "var(--gray-3)" }}>
        <Text as="label" size="2" weight="bold" className="block mb-2">{t("profile.fields.description")}</Text>
        <RichTextEditor
          value={props.escDescription}
          onChange={props.setEscDescription}
          placeholder={t("profile.fields.description")}
        />
      </Box>
      <Flex justify="end">
        <Button onClick={props.onSave} disabled={props.saving === "escort"}>
          {props.saving === "escort" ? t("common.saving") : t("profile.fields.save")}
        </Button>
      </Flex>
    </Flex>
  );
}
