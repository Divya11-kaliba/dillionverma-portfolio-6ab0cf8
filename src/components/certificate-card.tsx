"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { motion } from "framer-motion";

interface CertificateCardProps {
  title: string;
  issuer: string;
  date: string;
  description: string;
  imageUrl: string;
  className?: string;
}

export default function CertificateCard({
  title,
  issuer,
  date,
  description,
  imageUrl,
  className,
}: CertificateCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full w-full",
        className
      )}
    >
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        {/* Image on the left */}
        <div className="relative h-[180px] xs:h-[220px] sm:h-[250px] md:h-full  bg-background dark:bg-foreground">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
           fill
          className="h-full w-full  object-top object-contain"
        />
      )}
      </div>
      <div className="flex flex-col justify-between h-full bg-white dark:bg-background">
      <CardHeader className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4  bg-white dark:bg-background">
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          <CardTitle className="mt-1 text-base xs:text-lg sm:text-xl md:text-2xl py-2 sm:py-3 md:py-4 line-clamp-2">{title}</CardTitle>
          <time className="font-sans text-xs xs:text-sm sm:text-base md:text-lg text-muted-foreground dark:text-gray-300">Publish on: {date}</time>
          <div className="max-h-[100px] xs:max-h-[120px] sm:max-h-[150px] md:max-h-none overflow-y-auto">
            <Markdown className="prose max-w-full text-pretty font-sans text-xs xs:text-sm md:text-md text-muted-foreground dark:prose-invert">
                  {description}
                </Markdown>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="px-2 sm:px-3 md:px-4 pb-2 sm:pb-3 flex justify-center items-center bg-white dark:bg-background">
        <Badge className="px-1 sm:px-2 py-0.5 sm:py-1 text-xs xs:text-sm sm:text-base md:text-lg  dark:bg-gray-800 dark:text-white bg-gray-200 text-black">
          Issued By: {issuer}
        </Badge>
      </CardFooter>
      </div>       
    
      </div>
    </Card>
  );
}
