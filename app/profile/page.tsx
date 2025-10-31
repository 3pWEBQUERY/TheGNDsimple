"use client";
import React from "react";
import { Theme, Box } from "@radix-ui/themes";
import TopBar from "@/components/TopBar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import ProfileTabs from "@/components/ProfileTabs";

export default function ProfilePage() {
  const [appearance, setAppearance] = React.useState<"light" | "dark">("dark");

  const handleAppearanceChange = (v: boolean) => {
    setAppearance(v ? "dark" : "light");
  };

  return (
    <Theme accentColor="red" scaling="95%" appearance={appearance}>
      <Box className="min-h-[100svh]" style={{ background: "var(--gray-1)", color: "var(--gray-12)" }}>
        <Box className="mx-auto w-full max-w-7xl px-4 py-6 flex flex-col min-h-[100svh]">
          <TopBar />
          <div className="flex-1 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
            <Sidebar appearance={appearance} onAppearanceChange={handleAppearanceChange} />
            <ProfileTabs />
          </div>
          <Footer />
        </Box>
      </Box>
    </Theme>
  );
}
