 "use client";
import React from "react";
import { Theme, Box } from "@radix-ui/themes";
import TopBar from "@/components/TopBar";
import Sidebar from "@/components/Sidebar";
import EscortCard from "@/components/EscortCard";
import EscortCardGrid from "@/components/EscortCardGrid";
import RightPanel from "@/components/RightPanel";
import SettingsPanel from "@/components/SettingsPanel";
import Footer from "@/components/Footer";
import SearchFilterBar, { FilterState } from "@/components/SearchFilterBar";

interface Escort {
  id: string;
  username: string;
  avatar: string | null;
  profile: {
    slogan: string | null;
    age: number | null;
    city: string | null;
    country: string | null;
    gallery: string[];
    services: any;
  } | null;
}

export default function Home() {
  const [appearance, setAppearance] = React.useState<"light" | "dark">("dark");
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [escorts, setEscorts] = React.useState<Escort[]>([]);
  const [filteredEscorts, setFilteredEscorts] = React.useState<Escort[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filters, setFilters] = React.useState<FilterState>({});
  const [useGridView, setUseGridView] = React.useState(false);
  
  const profiles = [
    { name: "Scarlett", age: 24, location: "Miami, FL", tags: ["GFE", "Dinner Dates", "Travel"] },
    { name: "Chloe", age: 28, location: "New York, NY", tags: ["Parties", "Outdoors"] },
    { name: "Isabella", age: 22, location: "Los Angeles, CA", tags: ["Cosplay", "Modeling"] },
    { name: "Ava", age: 25, location: "Chicago, IL", tags: ["Yoga", "Wellness"] },
  ];

  React.useEffect(() => {
    const fetchEscorts = async () => {
      try {
        const res = await fetch("/api/escorts/list?limit=50");
        const data = await res.json();
        if (data.escorts) {
          setEscorts(data.escorts);
          setFilteredEscorts(data.escorts);
        }
      } catch (error) {
        console.error("Failed to fetch escorts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEscorts();

    // Load user's grid view preference
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const u = JSON.parse(stored);
        if (u?.id) {
          fetch(`/api/user/me?userId=${u.id}`)
            .then((r) => r.json())
            .then((data) => {
              if (data?.user && typeof data.user.useGridView === "boolean") {
                setUseGridView(data.user.useGridView);
              }
            })
            .catch(() => {});
        }
      }
    } catch {}
  }, []);

  // Apply filters and search
  React.useEffect(() => {
    let result = [...escorts];

    // Apply search query
    if (searchQuery) {
      result = result.filter(escort => 
        escort.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        escort.profile?.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        escort.profile?.country?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.ageMin) {
      result = result.filter(escort => escort.profile?.age && escort.profile.age >= filters.ageMin!);
    }
    if (filters.ageMax) {
      result = result.filter(escort => escort.profile?.age && escort.profile.age <= filters.ageMax!);
    }
    if (filters.city) {
      result = result.filter(escort => 
        escort.profile?.city?.toLowerCase().includes(filters.city!.toLowerCase())
      );
    }
    if (filters.country) {
      result = result.filter(escort => 
        escort.profile?.country?.toLowerCase().includes(filters.country!.toLowerCase())
      );
    }
    if (filters.bodyType) {
      result = result.filter(escort => (escort.profile as any)?.bodyType === filters.bodyType);
    }
    if (filters.hairColor) {
      result = result.filter(escort => (escort.profile as any)?.hairColor === filters.hairColor);
    }
    if (filters.breastSize) {
      result = result.filter(escort => (escort.profile as any)?.breastSize === filters.breastSize);
    }

    setFilteredEscorts(result);
    setCurrentIndex(0); // Reset to first result
  }, [searchQuery, filters, escorts]);

  // TikTok-style scroll navigation
  React.useEffect(() => {
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      if (settingsOpen || filteredEscorts.length === 0) return;
      
      e.preventDefault();
      
      if (isScrolling) return;
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 100);

      if (Math.abs(e.deltaY) > 10) {
        isScrolling = true;
        
        if (e.deltaY > 0 && currentIndex < filteredEscorts.length - 1) {
          // Scroll down - next escort
          setCurrentIndex(prev => prev + 1);
        } else if (e.deltaY < 0 && currentIndex > 0) {
          // Scroll up - previous escort
          setCurrentIndex(prev => prev - 1);
        }
      }
    };

    const container = document.getElementById('escort-container');
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
      clearTimeout(scrollTimeout);
    };
  }, [currentIndex, filteredEscorts.length, settingsOpen]);

  const handleAppearanceChange = (v: boolean) => {
    setAppearance(v ? "dark" : "light");
  };

  return (
    <Theme accentColor="red" scaling="95%" appearance={appearance}>
      <Box style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "var(--gray-1)", color: "var(--gray-12)" }}>
        <Box className="mx-auto w-full max-w-7xl px-4 py-6" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <TopBar />
          <div className={`flex-1 grid gap-6 ${settingsOpen ? "grid-cols-1 md:grid-cols-[260px_1fr]" : useGridView ? "grid-cols-1 md:grid-cols-[260px_1fr]" : "grid-cols-1 md:grid-cols-[260px_1fr_360px]"}`}>
            <Sidebar
              appearance={appearance}
              onAppearanceChange={handleAppearanceChange}
              onSettingsOpen={setSettingsOpen}
            />
            {settingsOpen ? (
              <SettingsPanel
                open={settingsOpen}
                onClose={() => setSettingsOpen(false)}
                appearance={appearance}
                onAppearanceChange={(v) => setAppearance(v ? "dark" : "light")}
              />
            ) : (
              <>
                <div>
                  <SearchFilterBar 
                    onSearch={setSearchQuery}
                    onFilterChange={setFilters}
                  />
                  <div id="escort-container" style={{ overflow: useGridView ? "visible" : "visible", position: "relative", perspective: "1000px" }}>
                    {loading ? (
                    <Box style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 500, gap: "16px" }}>
                      <div style={{ 
                        width: "48px", 
                        height: "48px", 
                        border: "4px solid var(--gray-6)", 
                        borderTop: "4px solid var(--accent-9)", 
                        borderRadius: "50%", 
                        animation: "spin 1s linear infinite" 
                      }} />
                      <style dangerouslySetInnerHTML={{
                        __html: `
                          @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                          }
                        `
                      }} />
                      <p style={{ color: "var(--gray-11)" }}>Loading escorts...</p>
                    </Box>
                  ) : useGridView ? (
                    // Grid View - 3 columns, 12 items
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                      {filteredEscorts.slice(0, 12).map((escort) => (
                        <EscortCardGrid
                          key={escort.id}
                          username={escort.username}
                          avatar={escort.avatar || undefined}
                          image={escort.profile?.gallery?.[0] || undefined}
                          age={escort.profile?.age || undefined}
                          location={`${escort.profile?.city || ""}, ${escort.profile?.country || ""}`.trim()}
                          slogan={escort.profile?.slogan || undefined}
                          tags={[]}
                        />
                      ))}
                    </div>
                  ) : filteredEscorts.length > 0 ? (
                    // TikTok View - Single card with preview
                    <div style={{ position: "relative" }}>
                      {/* Next card preview (behind) */}
                      {filteredEscorts[currentIndex + 1] && (
                        <div style={{ 
                          position: "absolute", 
                          top: 20, 
                          left: 0, 
                          right: 0, 
                          zIndex: 0,
                          transform: "scale(0.95)",
                          opacity: 0.5,
                          filter: "brightness(0.7)"
                        }}>
                          <EscortCard
                            username={filteredEscorts[currentIndex + 1].username}
                            avatar={filteredEscorts[currentIndex + 1].avatar || undefined}
                            image={filteredEscorts[currentIndex + 1].profile?.gallery?.[0] || undefined}
                            age={filteredEscorts[currentIndex + 1].profile?.age || undefined}
                            location={`${filteredEscorts[currentIndex + 1].profile?.city || ""}, ${filteredEscorts[currentIndex + 1].profile?.country || ""}`.trim()}
                            slogan={filteredEscorts[currentIndex + 1].profile?.slogan || undefined}
                            tags={[]}
                          />
                        </div>
                      )}
                      
                      {/* Current card (front) */}
                      {filteredEscorts[currentIndex] && (
                        <div style={{ position: "relative", zIndex: 1 }}>
                          <EscortCard
                            key={filteredEscorts[currentIndex].id}
                            username={filteredEscorts[currentIndex].username}
                            avatar={filteredEscorts[currentIndex].avatar || undefined}
                            image={filteredEscorts[currentIndex].profile?.gallery?.[0] || undefined}
                            age={filteredEscorts[currentIndex].profile?.age || undefined}
                            location={`${filteredEscorts[currentIndex].profile?.city || ""}, ${filteredEscorts[currentIndex].profile?.country || ""}`.trim()}
                            slogan={filteredEscorts[currentIndex].profile?.slogan || undefined}
                            tags={[]}
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <Box style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 500 }}>
                      <p>No escorts available</p>
                    </Box>
                  )}
                  </div>
                </div>
                {!useGridView && <RightPanel profiles={profiles} />}
              </>
            )}
          </div>
        </Box>
        <Footer />
      </Box>
    </Theme>
  );
}
