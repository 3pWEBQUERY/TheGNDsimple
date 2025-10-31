"use client";
import React from "react";
import { Flex, Text, TextField, Button, Box, Badge, Select } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n";
import { COUNTRY_CODES } from "@/lib/constants/countryCodes";
import { LANGUAGE_CODES } from "@/lib/constants/languageCodes";

// Dropdown options
const BODY_TYPES = ["Schlank", "Athletisch", "Durchschnittlich", "Kurvig", "Mollig", "Muskulös", "Plus Size"];
const HAIR_COLORS = ["Blond", "Brünett", "Schwarz", "Rot", "Grau", "Weiß", "Gefärbt", "Andere"];
const HAIR_LENGTHS = ["Kurz", "Schulterlang", "Lang", "Sehr lang", "Kahl"];
const BREAST_TYPES = ["Natürlich", "Vergrößert", "Andere"];
const BREAST_SIZES = ["AA", "A", "B", "C", "D", "DD", "E", "F", "G", "H+"];
const INTIMATE_AREAS = ["Rasiert", "Teilweise rasiert", "Natürlich", "Andere"];
const PIERCINGS_OPTIONS = ["Keine", "Ohren", "Nase", "Bauchnabel", "Brustwarzen", "Intim", "Mehrere"];
const TATTOOS_OPTIONS = ["Keine", "Klein", "Mittel", "Groß", "Viele", "Ganzkörper"];
const CLOTHING_STYLES = ["Casual", "Elegant", "Sportlich", "Sexy", "Business", "Alternative", "Gemischt"];
const CLOTHING_SIZES = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const SHOE_SIZES = ["35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];

interface GeneralTabProps {
  isEscort: boolean;
  slogan: string;
  setSlogan: (v: string) => void;
  age: number | "";
  setAge: (v: number | "") => void;
  nationality: string;
  setNationality: (v: string) => void;
  languages: string[];
  setLanguages: (v: string[]) => void;
  heightCm: number | "";
  setHeightCm: (v: number | "") => void;
  weightKg: number | "";
  setWeightKg: (v: number | "") => void;
  bodyType: string;
  setBodyType: (v: string) => void;
  hairColor: string;
  setHairColor: (v: string) => void;
  hairLength: string;
  setHairLength: (v: string) => void;
  breastType: string;
  setBreastType: (v: string) => void;
  breastSize: string;
  setBreastSize: (v: string) => void;
  intimateArea: string;
  setIntimateArea: (v: string) => void;
  piercings: string;
  setPiercings: (v: string) => void;
  tattoos: string;
  setTattoos: (v: string) => void;
  clothingStyle: string;
  setClothingStyle: (v: string) => void;
  clothingSize: string;
  setClothingSize: (v: string) => void;
  shoeSize: string;
  setShoeSize: (v: string) => void;
  openNation: boolean;
  setOpenNation: (v: boolean) => void;
  nationQuery: string;
  setNationQuery: (v: string) => void;
  openLang: boolean;
  setOpenLang: (v: boolean) => void;
  langQuery: string;
  setLangQuery: (v: string) => void;
  onSave: () => void;
  saving: string | null;
}

export default function GeneralTab(props: GeneralTabProps) {
  const { t } = useTranslation();
  const locale = i18n.language || "en";
  const regionNames = React.useMemo(() => new Intl.DisplayNames([locale], { type: "region" }), [locale]);
  const languageNames = React.useMemo(() => new Intl.DisplayNames([locale], { type: "language" }), [locale]);
  const nationOptions = React.useMemo(() => COUNTRY_CODES.map((c) => ({ code: c, name: regionNames.of(c) || c })), [regionNames]);
  const languageOptions = React.useMemo(() => LANGUAGE_CODES.map((c) => ({ code: c, name: (languageNames.of(c) || c).toString() })), [languageNames]);

  return (
    <Flex direction="column" gap="4">
      {props.isEscort && (
        <>
          <Box className="rounded-md p-3" style={{ background: "var(--gray-3)" }}>
            <Flex direction="column" gap="3">
              <div>
                <Text as="label" size="2" className="block mb-1">{t("profile.fields.slogan")}</Text>
                <TextField.Root size="3" value={props.slogan} onChange={(e) => props.setSlogan(e.target.value)} />
              </div>
              <div>
                <Text as="label" size="2" className="block mb-1">{t("profile.fields.age")}</Text>
                <TextField.Root size="3" type="number" value={props.age as any} onChange={(e) => props.setAge(e.target.value === '' ? '' : Number(e.target.value))} />
              </div>
              <div>
                <Text as="label" size="2" className="block mb-1">{t("profile.fields.nationality")}</Text>
                <div style={{ position: "relative" }}>
                  <TextField.Root size="3" readOnly onClick={() => props.setOpenNation(!props.openNation)} value={props.nationality ? (regionNames.of(props.nationality) as string) : ''} placeholder={t("profile.fields.nationality")} />
                  {props.openNation && (
                    <div style={{ position: "absolute", zIndex: 10, top: 44, left: 0, right: 0, background: "var(--color-panel-solid)", border: "1px solid var(--gray-6)", borderRadius: 8, padding: 8, maxHeight: 260, overflow: "auto" }}>
                      <TextField.Root size="2" placeholder={t("profile.upload.drag_or_select")} value={props.nationQuery} onChange={(e) => props.setNationQuery(e.target.value)} />
                      <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
                        {nationOptions
                          .filter((o) => o.name.toLowerCase().includes(props.nationQuery.toLowerCase()))
                          .map((o) => (
                            <Button key={o.code} variant="ghost" onClick={() => { props.setNationality(o.code); props.setOpenNation(false); }}>{o.name}</Button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Text as="label" size="2" className="block mb-1">{t("profile.fields.languages")}</Text>
                <div style={{ position: "relative" }}>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
                    {props.languages.map((c) => (
                      <Badge key={c} variant="soft">
                        {languageNames.of(c) as string}
                      </Badge>
                    ))}
                  </div>
                  <TextField.Root size="3" readOnly onClick={() => props.setOpenLang(!props.openLang)} placeholder={t("profile.fields.languages")} />
                  {props.openLang && (
                    <div style={{ position: "absolute", zIndex: 10, top: 44, left: 0, right: 0, background: "var(--color-panel-solid)", border: "1px solid var(--gray-6)", borderRadius: 8, padding: 8, maxHeight: 260, overflow: "auto" }}>
                      <TextField.Root size="2" placeholder={t("profile.upload.drag_or_select")} value={props.langQuery} onChange={(e) => props.setLangQuery(e.target.value)} />
                      <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
                        {languageOptions
                          .filter((o) => o.name.toLowerCase().includes(props.langQuery.toLowerCase()))
                          .map((o) => {
                            const active = props.languages.includes(o.code);
                            return (
                              <Button key={o.code} variant={active ? "solid" : "ghost"} onClick={() => {
                                props.setLanguages(active ? props.languages.filter((x) => x !== o.code) : [...props.languages, o.code]);
                              }}>{o.name}</Button>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Flex>
          </Box>
          <Box className="rounded-md p-3" style={{ background: "var(--gray-3)" }}>
            <Flex direction="column" gap="3">
              <Text as="div" size="2" weight="bold" className="block">{t("profile.fields.appearance")}</Text>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
                <div>
                  <Text size="2" className="block mb-1">{t("profile.fields.height")}</Text>
                  <TextField.Root size="3" type="number" value={props.heightCm as any} onChange={(e) => props.setHeightCm(e.target.value === '' ? '' : Number(e.target.value))} placeholder="cm" />
                </div>
                <div>
                  <Text size="2" className="block mb-1">{t("profile.fields.weight")}</Text>
                  <TextField.Root size="3" type="number" value={props.weightKg as any} onChange={(e) => props.setWeightKg(e.target.value === '' ? '' : Number(e.target.value))} placeholder="kg" />
                </div>
                <div>
                  <Text size="2" className="block mb-1">{t("profile.fields.body_type")}</Text>
                  <Select.Root value={props.bodyType} onValueChange={props.setBodyType} size="3">
                    <Select.Trigger placeholder="Auswählen..." style={{ width: "100%" }} />
                    <Select.Content>
                      {BODY_TYPES.map(opt => <Select.Item key={opt} value={opt}>{opt}</Select.Item>)}
                    </Select.Content>
                  </Select.Root>
                </div>
                <div>
                  <Text size="2" className="block mb-1">{t("profile.fields.hair_color")}</Text>
                  <Select.Root value={props.hairColor} onValueChange={props.setHairColor} size="3">
                    <Select.Trigger placeholder="Auswählen..." style={{ width: "100%" }} />
                    <Select.Content>
                      {HAIR_COLORS.map(opt => <Select.Item key={opt} value={opt}>{opt}</Select.Item>)}
                    </Select.Content>
                  </Select.Root>
                </div>
                <div>
                  <Text size="2" className="block mb-1">{t("profile.fields.hair_length")}</Text>
                  <Select.Root value={props.hairLength} onValueChange={props.setHairLength} size="3">
                    <Select.Trigger placeholder="Auswählen..." style={{ width: "100%" }} />
                    <Select.Content>
                      {HAIR_LENGTHS.map(opt => <Select.Item key={opt} value={opt}>{opt}</Select.Item>)}
                    </Select.Content>
                  </Select.Root>
                </div>
                <div>
                  <Text size="2" className="block mb-1">{t("profile.fields.breast_type")}</Text>
                  <Select.Root value={props.breastType} onValueChange={props.setBreastType} size="3">
                    <Select.Trigger placeholder="Auswählen..." style={{ width: "100%" }} />
                    <Select.Content>
                      {BREAST_TYPES.map(opt => <Select.Item key={opt} value={opt}>{opt}</Select.Item>)}
                    </Select.Content>
                  </Select.Root>
                </div>
                <div>
                  <Text size="2" className="block mb-1">{t("profile.fields.breast_size")}</Text>
                  <Select.Root value={props.breastSize} onValueChange={props.setBreastSize} size="3">
                    <Select.Trigger placeholder="Auswählen..." style={{ width: "100%" }} />
                    <Select.Content>
                      {BREAST_SIZES.map(opt => <Select.Item key={opt} value={opt}>{opt}</Select.Item>)}
                    </Select.Content>
                  </Select.Root>
                </div>
                <div>
                  <Text size="2" className="block mb-1">{t("profile.fields.intimate_area")}</Text>
                  <Select.Root value={props.intimateArea} onValueChange={props.setIntimateArea} size="3">
                    <Select.Trigger placeholder="Auswählen..." style={{ width: "100%" }} />
                    <Select.Content>
                      {INTIMATE_AREAS.map(opt => <Select.Item key={opt} value={opt}>{opt}</Select.Item>)}
                    </Select.Content>
                  </Select.Root>
                </div>
                <div>
                  <Text size="2" className="block mb-1">{t("profile.fields.piercings")}</Text>
                  <Select.Root value={props.piercings} onValueChange={props.setPiercings} size="3">
                    <Select.Trigger placeholder="Auswählen..." style={{ width: "100%" }} />
                    <Select.Content>
                      {PIERCINGS_OPTIONS.map(opt => <Select.Item key={opt} value={opt}>{opt}</Select.Item>)}
                    </Select.Content>
                  </Select.Root>
                </div>
                <div>
                  <Text size="2" className="block mb-1">{t("profile.fields.tattoos")}</Text>
                  <Select.Root value={props.tattoos} onValueChange={props.setTattoos} size="3">
                    <Select.Trigger placeholder="Auswählen..." style={{ width: "100%" }} />
                    <Select.Content>
                      {TATTOOS_OPTIONS.map(opt => <Select.Item key={opt} value={opt}>{opt}</Select.Item>)}
                    </Select.Content>
                  </Select.Root>
                </div>
                <div>
                  <Text size="2" className="block mb-1">{t("profile.fields.clothing_style")}</Text>
                  <Select.Root value={props.clothingStyle} onValueChange={props.setClothingStyle} size="3">
                    <Select.Trigger placeholder="Auswählen..." style={{ width: "100%" }} />
                    <Select.Content>
                      {CLOTHING_STYLES.map(opt => <Select.Item key={opt} value={opt}>{opt}</Select.Item>)}
                    </Select.Content>
                  </Select.Root>
                </div>
                <div>
                  <Text size="2" className="block mb-1">{t("profile.fields.clothing_size")}</Text>
                  <Select.Root value={props.clothingSize} onValueChange={props.setClothingSize} size="3">
                    <Select.Trigger placeholder="Auswählen..." style={{ width: "100%" }} />
                    <Select.Content>
                      {CLOTHING_SIZES.map(opt => <Select.Item key={opt} value={opt}>{opt}</Select.Item>)}
                    </Select.Content>
                  </Select.Root>
                </div>
                <div>
                  <Text size="2" className="block mb-1">{t("profile.fields.shoe_size")}</Text>
                  <Select.Root value={props.shoeSize} onValueChange={props.setShoeSize} size="3">
                    <Select.Trigger placeholder="Auswählen..." style={{ width: "100%" }} />
                    <Select.Content>
                      {SHOE_SIZES.map(opt => <Select.Item key={opt} value={opt}>{opt}</Select.Item>)}
                    </Select.Content>
                  </Select.Root>
                </div>
              </div>
            </Flex>
          </Box>
        </>
      )}
      <Flex justify="end">
        <Button onClick={props.onSave} disabled={props.saving === (props.isEscort ? "escort" : "user-general")}>
          {props.saving ? t("common.saving") : t("profile.fields.save")}
        </Button>
      </Flex>
    </Flex>
  );
}
