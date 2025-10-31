"use client";
import React from "react";
import { Box, Card, Flex, Avatar, Text, Badge } from "@radix-ui/themes";

interface EscortCardGridProps {
  username?: string;
  avatar?: string;
  image?: string;
  age?: number;
  location?: string;
  slogan?: string;
  tags?: string[];
}

export default function EscortCardGrid({
  username = "Scarlett",
  avatar = "https://i.pravatar.cc/80?img=65",
  image = "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1080&auto=format&fit=crop",
  age = 24,
  location = "Miami, FL",
  slogan = "Living my best life ✨",
  tags = ["GFE", "Dinner Dates", "Travel"]
}: EscortCardGridProps) {
  return (
    <Card size="2" className="overflow-hidden" style={{ cursor: "pointer", transition: "transform 0.2s" }}>
      <Box className="relative" style={{ height: 400 }}>
        {/* Main Image */}
        <img
          src={image}
          alt={username}
          className="w-full h-full object-cover"
          style={{ borderRadius: "8px 8px 0 0" }}
        />
        
        {/* Gradient Overlay at Bottom */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)",
        }} />

        {/* Profile Info - Bottom Left */}
        <Box style={{ position: "absolute", bottom: 12, left: 12, right: 12, zIndex: 2 }}>
          <Flex align="center" gap="2" mb="2">
            <Avatar size="1" src={avatar} fallback={username[0]} radius="full" />
            <Box>
              <Text size="2" weight="bold" style={{ color: "white", display: "block" }}>
                {username}
              </Text>
              <Text size="1" style={{ color: "rgba(255,255,255,0.7)", display: "block" }}>
                @{username.toLowerCase()}
              </Text>
            </Box>
          </Flex>
          <Text size="1" weight="bold" style={{ color: "white", display: "block", marginBottom: 4 }}>
            {age} • {location}
          </Text>
          <Text size="1" style={{ color: "rgba(255,255,255,0.9)", display: "block", marginBottom: 6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {slogan}
          </Text>
          <Flex gap="1" wrap="wrap">
            {tags.slice(0, 3).map((tag, i) => (
              <Badge key={i} size="1" variant="soft" style={{ background: "rgba(255,255,255,0.2)", color: "white", fontSize: "10px" }}>
                {tag}
              </Badge>
            ))}
          </Flex>
        </Box>
      </Box>
    </Card>
  );
}
