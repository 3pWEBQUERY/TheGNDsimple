"use client";
import React from "react";
import { Flex, Text, TextField, Button, Box, IconButton } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import { PlusIcon, Cross2Icon } from "@radix-ui/react-icons";
import i18n from "@/lib/i18n";
import { SERVICES, getServiceLabel } from "@/lib/constants/services";

const AVAILABLE_SERVICES = Object.keys(SERVICES);

interface ServicesTabProps {
  selectedServices: string[];
  setSelectedServices: (v: string[]) => void;
  servicesPricing: {[key: string]: {price: string, extra: boolean}};
  setServicesPricing: (v: {[key: string]: {price: string, extra: boolean}}) => void;
  generalPrices: {label: string, price: string}[];
  setGeneralPrices: (v: {label: string, price: string}[]) => void;
  onSave: () => void;
  saving: string | null;
}

export default function ServicesTab(props: ServicesTabProps) {
  const { t } = useTranslation();
  const locale = i18n.language || "en";

  return (
    <Flex direction="column" gap="4">
      <Box className="rounded-md p-3" style={{ background: "var(--gray-3)" }}>
        <Text as="div" size="2" weight="bold" className="block mb-3">Services auswählen</Text>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 }}>
          {AVAILABLE_SERVICES.map((serviceKey) => {
            const isSelected = props.selectedServices.includes(serviceKey);
            const label = getServiceLabel(serviceKey, locale);
            return (
              <Button
                key={serviceKey}
                size="2"
                variant={isSelected ? "solid" : "soft"}
                onClick={() => {
                  if (isSelected) {
                    props.setSelectedServices(props.selectedServices.filter((s) => s !== serviceKey));
                    const copy = {...props.servicesPricing};
                    delete copy[serviceKey];
                    props.setServicesPricing(copy);
                  } else {
                    props.setSelectedServices([...props.selectedServices, serviceKey]);
                  }
                }}
              >
                {label}
              </Button>
            );
          })}
        </div>
      </Box>

      <Box className="rounded-md p-3" style={{ background: "var(--gray-3)" }}>
        <Flex justify="between" align="center" mb="3">
          <Text as="div" size="2" weight="bold">Allgemeine Preise</Text>
          <Button
            size="1"
            onClick={() => props.setGeneralPrices([...props.generalPrices, { label: "", price: "" }])}
          >
            <PlusIcon /> Hinzufügen
          </Button>
        </Flex>
        <Flex direction="column" gap="2">
          {props.generalPrices.map((gp, idx) => (
            <Flex key={idx} gap="2" align="center">
              <TextField.Root
                size="2"
                placeholder="z.B. 1 Stunde"
                value={gp.label}
                onChange={(e) => {
                  const copy = [...props.generalPrices];
                  copy[idx].label = e.target.value;
                  props.setGeneralPrices(copy);
                }}
                style={{ flex: 1 }}
              />
              <TextField.Root
                size="2"
                placeholder="Preis"
                value={gp.price}
                onChange={(e) => {
                  const copy = [...props.generalPrices];
                  copy[idx].price = e.target.value;
                  props.setGeneralPrices(copy);
                }}
                style={{ flex: 1 }}
              />
              <IconButton
                size="2"
                variant="soft"
                color="red"
                onClick={() => props.setGeneralPrices(props.generalPrices.filter((_, i) => i !== idx))}
              >
                <Cross2Icon />
              </IconButton>
            </Flex>
          ))}
        </Flex>
      </Box>

      {props.selectedServices.length > 0 && (
        <Box className="rounded-md p-3" style={{ background: "var(--gray-3)" }}>
          <Text as="div" size="2" weight="bold" className="block mb-3">Ausgewählte Services</Text>
          <Flex direction="column" gap="3">
            {props.selectedServices.map((serviceKey) => {
              const pricing = props.servicesPricing[serviceKey] || { price: "", extra: false };
              const label = getServiceLabel(serviceKey, locale);
              return (
                <Box key={serviceKey} p="3" style={{ background: "var(--gray-2)", borderRadius: 8 }}>
                  <Flex direction="column" gap="2">
                    <Text size="2" weight="bold">{label}</Text>
                    <Flex gap="2" align="center">
                      <TextField.Root
                        size="2"
                        placeholder="Preis (optional)"
                        value={pricing.price || ""}
                        onChange={(e) => {
                          props.setServicesPricing({
                            ...props.servicesPricing,
                            [serviceKey]: { ...(props.servicesPricing[serviceKey] || {}), price: e.target.value }
                          });
                        }}
                        style={{ flex: 1 }}
                      />
                      <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                        <input
                          type="checkbox"
                          checked={pricing.extra || false}
                          onChange={(e) => {
                            props.setServicesPricing({
                              ...props.servicesPricing,
                              [serviceKey]: { ...(props.servicesPricing[serviceKey] || {}), extra: e.target.checked }
                            });
                          }}
                        />
                        <Text size="2">Extra</Text>
                      </label>
                    </Flex>
                  </Flex>
                </Box>
              );
            })}
          </Flex>
        </Box>
      )}

      <Flex justify="end">
        <Button onClick={props.onSave} disabled={props.saving === "escort"}>
          {props.saving === "escort" ? t("common.saving") : t("profile.fields.save")}
        </Button>
      </Flex>
    </Flex>
  );
}
