"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
  className?: string;
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
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
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
          "relative bg-white/10 border border-gray-700 shadow-lg backdrop-blur-md rounded-xl p-5 w-full max-w-sm hover:bg-white/20 transition-all",
          className
        )}
      >
        <Card className="flex flex-col">
          {/* Header: Logo & Title */}
          <CardHeader className="flex items-center space-x-4">
            <Avatar className="border size-12 bg-muted-background dark:bg-foreground">
              <AvatarImage src={logoUrl} alt={altText} className="object-contain" />
              <AvatarFallback>{altText[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-gray-400 text-sm">{subtitle}</p>
              <p className="text-xs text-gray-500">{period}</p>
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

          {/* Description (Expandable) */}
          {description && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: isExpanded ? 1 : 0, height: isExpanded ? "auto" : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="mt-3 text-sm text-gray-300"
            >
              {description}
            </motion.div>
          )}

          {/* Expand Icon */}
          <div className="flex justify-end">
            <ChevronRightIcon
              className={cn(
                "size-5 transform transition-transform duration-300",
                isExpanded ? "rotate-90" : "rotate-0"
              )}
            />
          </div>
        </Card>
      </motion.div>
    </Link>
  );
};
