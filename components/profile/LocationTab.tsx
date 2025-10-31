"use client";
import React from "react";
import { Flex, Text, TextField, Button, Box, Switch } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import { HomeIcon, RocketIcon, EnterIcon } from "@radix-ui/react-icons";

interface LocationTabProps {
  address: string;
  setAddress: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  postalCode: string;
  setPostalCode: (v: string) => void;
  state: string;
  setState: (v: string) => void;
  country: string;
  setCountry: (v: string) => void;
  incall: boolean;
  setIncall: (v: boolean) => void;
  outcall: boolean;
  setOutcall: (v: boolean) => void;
  travelAvailable: boolean;
  setTravelAvailable: (v: boolean) => void;
  onSave: () => void;
  saving: string | null;
}

export default function LocationTab(props: LocationTabProps) {
  const { t } = useTranslation();

  return (
    <Flex direction="column" gap="4">
      <Box className="rounded-md p-3" style={{ background: "var(--gray-3)" }}>
        <Text as="div" size="2" weight="bold" className="block mb-3">
          Standortinformationen
        </Text>
        <Flex direction="column" gap="3">
          <div>
            <Text as="label" size="2" className="block mb-1">Stadt</Text>
            <TextField.Root
              size="3"
              placeholder="z.B. Berlin"
              value={props.city}
              onChange={(e) => props.setCity(e.target.value)}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12 }}>
            <div>
              <Text as="label" size="2" className="block mb-1">Adresse (optional)</Text>
              <TextField.Root
                size="3"
                placeholder="z.B. Hauptstraße 123"
                value={props.address}
                onChange={(e) => props.setAddress(e.target.value)}
              />
            </div>
            <div>
              <Text as="label" size="2" className="block mb-1">PLZ</Text>
              <TextField.Root
                size="3"
                placeholder="10115"
                value={props.postalCode}
                onChange={(e) => props.setPostalCode(e.target.value)}
              />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <Text as="label" size="2" className="block mb-1">Bundesland/Region</Text>
              <TextField.Root
                size="3"
                placeholder="z.B. Bayern"
                value={props.state}
                onChange={(e) => props.setState(e.target.value)}
              />
            </div>
            <div>
              <Text as="label" size="2" className="block mb-1">Land</Text>
              <TextField.Root
                size="3"
                placeholder="z.B. Deutschland"
                value={props.country}
                onChange={(e) => props.setCountry(e.target.value)}
              />
            </div>
          </div>
        </Flex>
      </Box>

      <Box className="rounded-md p-3" style={{ background: "var(--gray-3)" }}>
        <Text as="div" size="2" weight="bold" className="block mb-3">
          Service-Optionen
        </Text>
        <Flex direction="column" gap="3">
          <Flex align="center" justify="between" p="3" style={{ background: "var(--gray-2)", borderRadius: 8 }}>
            <Flex align="center" gap="2">
              <HomeIcon width="20" height="20" />
              <Flex direction="column" gap="1">
                <Text size="2" weight="bold">Incall</Text>
                <Text size="1" color="gray">Kunden kommen zu dir</Text>
              </Flex>
            </Flex>
            <Switch
              checked={props.incall}
              onCheckedChange={props.setIncall}
              size="2"
            />
          </Flex>
          <Flex align="center" justify="between" p="3" style={{ background: "var(--gray-2)", borderRadius: 8 }}>
            <Flex align="center" gap="2">
              <EnterIcon width="20" height="20" />
              <Flex direction="column" gap="1">
                <Text size="2" weight="bold">Outcall</Text>
                <Text size="1" color="gray">Du besuchst Kunden</Text>
              </Flex>
            </Flex>
            <Switch
              checked={props.outcall}
              onCheckedChange={props.setOutcall}
              size="2"
            />
          </Flex>
          <Flex align="center" justify="between" p="3" style={{ background: "var(--gray-2)", borderRadius: 8 }}>
            <Flex align="center" gap="2">
              <RocketIcon width="20" height="20" />
              <Flex direction="column" gap="1">
                <Text size="2" weight="bold">Reisebegleitung</Text>
                <Text size="1" color="gray">Verfügbar für Reisen</Text>
              </Flex>
            </Flex>
            <Switch
              checked={props.travelAvailable}
              onCheckedChange={props.setTravelAvailable}
              size="2"
            />
          </Flex>
        </Flex>
      </Box>

      <Flex justify="end">
        <Button onClick={props.onSave} disabled={props.saving === "escort"}>
          {props.saving === "escort" ? t("common.saving") : t("profile.fields.save")}
        </Button>
      </Flex>
    </Flex>
  );
}
