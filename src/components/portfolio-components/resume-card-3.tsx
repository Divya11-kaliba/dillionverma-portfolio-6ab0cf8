"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";


interface ResumeCardProps {
  logoUrl?: string;
  altText: string;
  title?: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period?: string;
  description?: string;
  className?: string;
  showExpand?: boolean;
  onToggleExpand?: (expanded: boolean) => void;
}

export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
  className,
  showExpand = false,
  onToggleExpand, 
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (description) {
      e.preventDefault();
    const next = !isExpanded;
    setIsExpanded(next);
    onToggleExpand?.(next); 
    }
  };

  return (
    <Link
      href={href || "#"}
      className="block cursor-pointer"
      onClick={handleClick}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "relative bg-white/10 border border-gray-700 shadow-lg backdrop-blur-md rounded-xl p-5  min-h-[220px] flex flex-col hover:bg-white/20 transition-all w-full flex-grow",
          className
        )}
      >
        <Card className="flex flex-col min-h-[250px] sm:h-full w-full">
          {/* Header: Logo & Title */}
          <CardHeader className="flex items-center space-x">
            <Avatar className="border size-14 bg-muted-background dark:bg-foreground">
              <AvatarImage src={logoUrl} alt={altText} className="object-contain" />
              <AvatarFallback>{altText[0]}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col justify-center">
              <h3 className="text-lg font-semibold text-center">{title}</h3>
              <p className="text-gray-400 text-sm text-center">{subtitle}</p>
              <p className="text-xs text-gray-700 dark:text-gray-100  text-center">{period}</p>
            </div>
          </CardHeader>

          {/* Badges */}
          {badges && badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {badges.map((badge, index) => (
                <Badge
                  variant="secondary"
                  className="text-xs px-2 py-1 rounded-md bg-gray-800 text-white"
                  key={index}
                >
                  {badge}
                </Badge>
              ))}
            </div>
          )}
          <CardContent>
          {/* Description (Initially Hidden, Expands on Click) */}
          {description && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: isExpanded ? 1 : 0, height: isExpanded ? "auto" : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden mt-2 px-2 text-sm text-gray-700 dark:text-gray-300"
            >
              {description}
            </motion.div>
          )}

          {/* Expand Icon */}
          {showExpand && (
          <div className="flex justify-end mt-2">
            <button onClick={() => setIsExpanded(!isExpanded)}>              
            </button>
          </div>
        )}
        </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
};

