"use client";
import React from "react";
import { Box, Flex, TextField, Select, Badge, IconButton, Popover, Button, Text, Card } from "@radix-ui/themes";
import { MagnifyingGlassIcon, MixerHorizontalIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";

interface SearchFilterBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  ageMin?: number;
  ageMax?: number;
  city?: string;
  country?: string;
  bodyType?: string;
  hairColor?: string;
  breastSize?: string;
  services?: string[];
}

const BODY_TYPES = ["Schlank", "Athletisch", "Durchschnittlich", "Kurvig", "Mollig", "Muskulös", "Plus Size"];
const HAIR_COLORS = ["Blond", "Brünett", "Schwarz", "Rot", "Grau", "Weiß", "Gefärbt", "Andere"];
const BREAST_SIZES = ["AA", "A", "B", "C", "D", "DD", "E", "F", "G", "H+"];

export default function SearchFilterBar({ onSearch, onFilterChange }: SearchFilterBarProps) {
  const { t } = useTranslation();
  const [mounted, setMounted] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filters, setFilters] = React.useState<FilterState>({});
  const [filtersOpen, setFiltersOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilter = (key: keyof FilterState) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  const activeFilterCount = Object.keys(filters).filter(key => filters[key as keyof FilterState]).length;

  if (!mounted) return null;

  return (
    <Card size="3" mb="4">
      <Flex gap="3" align="center" mb="3">
        {/* Search Bar */}
        <Box style={{ flex: 1 }}>
          <TextField.Root
            size="3"
            placeholder={t("search.placeholder")}
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </Box>

        {/* Filter Button */}
        <Popover.Root open={filtersOpen} onOpenChange={setFiltersOpen}>
          <Popover.Trigger>
            <Button size="3" variant="soft">
              <MixerHorizontalIcon />
              {t("search.filter")}
              {activeFilterCount > 0 && (
                <Badge size="1" color="red" style={{ marginLeft: 4 }}>
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </Popover.Trigger>
          <Popover.Content style={{ width: 400, maxHeight: "80vh", overflow: "auto" }}>
            <Flex direction="column" gap="3">
              <Flex justify="between" align="center">
                <Text size="4" weight="bold">Filter</Text>
                {activeFilterCount > 0 && (
                  <Button size="1" variant="ghost" onClick={clearAllFilters}>
                    Alle löschen
                  </Button>
                )}
              </Flex>

              {/* Age Range */}
              <Box>
                <Text size="2" weight="bold" className="block mb-2">Alter</Text>
                <Flex gap="2">
                  <TextField.Root
                    size="2"
                    type="number"
                    placeholder="Von"
                    value={filters.ageMin || ""}
                    onChange={(e) => updateFilter("ageMin", e.target.value ? Number(e.target.value) : undefined)}
                  />
                  <TextField.Root
                    size="2"
                    type="number"
                    placeholder="Bis"
                    value={filters.ageMax || ""}
                    onChange={(e) => updateFilter("ageMax", e.target.value ? Number(e.target.value) : undefined)}
                  />
                </Flex>
              </Box>

              {/* Location */}
              <Box>
                <Text size="2" weight="bold" className="block mb-2">Standort</Text>
                <Flex direction="column" gap="2">
                  <TextField.Root
                    size="2"
                    placeholder="Stadt"
                    value={filters.city || ""}
                    onChange={(e) => updateFilter("city", e.target.value || undefined)}
                  />
                  <TextField.Root
                    size="2"
                    placeholder="Land"
                    value={filters.country || ""}
                    onChange={(e) => updateFilter("country", e.target.value || undefined)}
                  />
                </Flex>
              </Box>

              {/* Body Type */}
              <Box>
                <Flex justify="between" align="center" mb="2">
                  <Text size="2" weight="bold">Körperbau</Text>
                  {filters.bodyType && (
                    <Button size="1" variant="ghost" onClick={() => clearFilter("bodyType")}>
                      Löschen
                    </Button>
                  )}
                </Flex>
                <Select.Root value={filters.bodyType || undefined} onValueChange={(v) => updateFilter("bodyType", v)}>
                  <Select.Trigger placeholder="Auswählen..." style={{ width: "100%" }} />
                  <Select.Content>
                    {BODY_TYPES.map(type => (
                      <Select.Item key={type} value={type}>{type}</Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </Box>

              {/* Hair Color */}
              <Box>
                <Flex justify="between" align="center" mb="2">
                  <Text size="2" weight="bold">Haarfarbe</Text>
                  {filters.hairColor && (
                    <Button size="1" variant="ghost" onClick={() => clearFilter("hairColor")}>
                      Löschen
                    </Button>
                  )}
                </Flex>
                <Select.Root value={filters.hairColor || undefined} onValueChange={(v) => updateFilter("hairColor", v)}>
                  <Select.Trigger placeholder="Auswählen..." style={{ width: "100%" }} />
                  <Select.Content>
                    {HAIR_COLORS.map(color => (
                      <Select.Item key={color} value={color}>{color}</Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </Box>

              {/* Breast Size */}
              <Box>
                <Flex justify="between" align="center" mb="2">
                  <Text size="2" weight="bold">Brustgröße</Text>
                  {filters.breastSize && (
                    <Button size="1" variant="ghost" onClick={() => clearFilter("breastSize")}>
                      Löschen
                    </Button>
                  )}
                </Flex>
                <Select.Root value={filters.breastSize || undefined} onValueChange={(v) => updateFilter("breastSize", v)}>
                  <Select.Trigger placeholder="Auswählen..." style={{ width: "100%" }} />
                  <Select.Content>
                    {BREAST_SIZES.map(size => (
                      <Select.Item key={size} value={size}>{size}</Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </Box>
            </Flex>
          </Popover.Content>
        </Popover.Root>
      </Flex>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <Flex gap="2" wrap="wrap">
          {filters.ageMin && (
            <Badge size="2" variant="soft">
              Alter ab {filters.ageMin}
              <IconButton size="1" variant="ghost" onClick={() => clearFilter("ageMin")} style={{ marginLeft: 4 }}>
                <Cross2Icon width="12" height="12" />
              </IconButton>
            </Badge>
          )}
          {filters.ageMax && (
            <Badge size="2" variant="soft">
              Alter bis {filters.ageMax}
              <IconButton size="1" variant="ghost" onClick={() => clearFilter("ageMax")} style={{ marginLeft: 4 }}>
                <Cross2Icon width="12" height="12" />
              </IconButton>
            </Badge>
          )}
          {filters.city && (
            <Badge size="2" variant="soft">
              Stadt: {filters.city}
              <IconButton size="1" variant="ghost" onClick={() => clearFilter("city")} style={{ marginLeft: 4 }}>
                <Cross2Icon width="12" height="12" />
              </IconButton>
            </Badge>
          )}
          {filters.country && (
            <Badge size="2" variant="soft">
              Land: {filters.country}
              <IconButton size="1" variant="ghost" onClick={() => clearFilter("country")} style={{ marginLeft: 4 }}>
                <Cross2Icon width="12" height="12" />
              </IconButton>
            </Badge>
          )}
          {filters.bodyType && (
            <Badge size="2" variant="soft">
              {filters.bodyType}
              <IconButton size="1" variant="ghost" onClick={() => clearFilter("bodyType")} style={{ marginLeft: 4 }}>
                <Cross2Icon width="12" height="12" />
              </IconButton>
            </Badge>
          )}
          {filters.hairColor && (
            <Badge size="2" variant="soft">
              {filters.hairColor}
              <IconButton size="1" variant="ghost" onClick={() => clearFilter("hairColor")} style={{ marginLeft: 4 }}>
                <Cross2Icon width="12" height="12" />
              </IconButton>
            </Badge>
          )}
          {filters.breastSize && (
            <Badge size="2" variant="soft">
              Größe {filters.breastSize}
              <IconButton size="1" variant="ghost" onClick={() => clearFilter("breastSize")} style={{ marginLeft: 4 }}>
                <Cross2Icon width="12" height="12" />
              </IconButton>
            </Badge>
          )}
        </Flex>
      )}
    </Card>
  );
}
