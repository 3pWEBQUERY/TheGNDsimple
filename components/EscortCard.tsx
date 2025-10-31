"use client";
import React from "react";
import { Box, Card, Flex, Avatar, Text, IconButton, Badge } from "@radix-ui/themes";
import { HeartIcon, BookmarkIcon, Share2Icon, ChatBubbleIcon } from "@radix-ui/react-icons";

interface EscortCardProps {
  username?: string;
  avatar?: string;
  image?: string;
  age?: number;
  location?: string;
  slogan?: string;
  tags?: string[];
  likes?: number;
  comments?: number;
  bookmarks?: number;
}

export default function EscortCard({
  username = "Scarlett",
  avatar = "https://i.pravatar.cc/80?img=65",
  image = "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1080&auto=format&fit=crop",
  age = 24,
  location = "Miami, FL",
  slogan = "Living my best life ✨",
  tags = ["GFE", "Dinner Dates", "Travel"],
  likes = 379000,
  comments = 448,
  bookmarks = 5686
}: EscortCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(0) + "K";
    return num.toString();
  };

  return (
    <div style={{ animation: "slideUpFromPreview 0.6s cubic-bezier(0.4, 0, 0.2, 1)" }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slideUpFromPreview {
            from {
              transform: translateY(20px) scale(0.95);
              opacity: 0.5;
              filter: brightness(0.7);
            }
            to {
              transform: translateY(0) scale(1);
              opacity: 1;
              filter: brightness(1);
            }
          }
        `
      }} />
      <Card size="3" className="overflow-hidden">
        <Box className="relative" style={{ height: "calc(100vh - 200px)", maxHeight: 700, minHeight: 500 }}>
        {/* Main Image */}
        <img
          src={image}
          alt={username}
          className="w-full h-full object-cover"
          style={{ borderRadius: 8 }}
        />
        
        {/* Gradient Overlay at Bottom */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40%",
          background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
          borderRadius: "0 0 8px 8px"
        }} />

        {/* Profile Info - Bottom Left (TikTok Style) */}
        <Box style={{ position: "absolute", bottom: 16, left: 16, right: 80, zIndex: 2 }}>
          <Flex align="center" gap="2" mb="2">
            <Avatar size="2" src={avatar} fallback={username[0]} radius="full" />
            <Box>
              <Text size="2" weight="bold" style={{ color: "white", display: "block" }}>
                {username}
              </Text>
              <Text size="1" style={{ color: "rgba(255,255,255,0.7)", display: "block" }}>
                @{username.toLowerCase()}
              </Text>
            </Box>
          </Flex>
          <Text size="2" weight="bold" style={{ color: "white", display: "block", marginBottom: 4 }}>
            {age} • {location}
          </Text>
          <Text size="2" style={{ color: "rgba(255,255,255,0.9)", display: "block", marginBottom: 8 }}>
            {slogan}
          </Text>
          <Flex gap="2" wrap="wrap">
            {tags.map((tag, i) => (
              <Badge key={i} size="1" variant="soft" style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>
                {tag}
              </Badge>
            ))}
          </Flex>
        </Box>

        {/* Action Buttons - Right Side (TikTok Style) */}
        <Flex 
          direction="column" 
          gap="4" 
          style={{ 
            position: "absolute", 
            right: 12, 
            bottom: 16,
            zIndex: 2
          }}
        >
          <Flex direction="column" align="center" gap="1">
            <IconButton 
              size="3" 
              variant="soft"
              style={{ 
                background: "rgba(255,255,255,0.2)", 
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)"
              }}
            >
              <HeartIcon width="20" height="20" style={{ color: "white" }} />
            </IconButton>
            <Text size="1" weight="bold" style={{ color: "white" }}>
              {formatNumber(likes)}
            </Text>
          </Flex>

          <Flex direction="column" align="center" gap="1">
            <IconButton 
              size="3" 
              variant="soft"
              style={{ 
                background: "rgba(255,255,255,0.2)", 
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)"
              }}
            >
              <ChatBubbleIcon width="20" height="20" style={{ color: "white" }} />
            </IconButton>
            <Text size="1" weight="bold" style={{ color: "white" }}>
              {formatNumber(comments)}
            </Text>
          </Flex>

          <Flex direction="column" align="center" gap="1">
            <IconButton 
              size="3" 
              variant="soft"
              style={{ 
                background: "rgba(255,255,255,0.2)", 
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)"
              }}
            >
              <BookmarkIcon width="20" height="20" style={{ color: "white" }} />
            </IconButton>
            <Text size="1" weight="bold" style={{ color: "white" }}>
              {formatNumber(bookmarks)}
            </Text>
          </Flex>

          <Flex direction="column" align="center" gap="1">
            <IconButton 
              size="3" 
              variant="soft"
              style={{ 
                background: "rgba(255,255,255,0.2)", 
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)"
              }}
            >
              <Share2Icon width="20" height="20" style={{ color: "white" }} />
            </IconButton>
            <Text size="1" weight="bold" style={{ color: "white" }}>
              {formatNumber(32000)}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Card>
    </div>
  );
}
