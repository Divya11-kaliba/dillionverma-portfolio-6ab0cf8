"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Props {
  title: string
  description: string
  dates: string
  location: string
  image?: string
  classname: string
  links?: readonly {
    icon: React.ReactNode
    title: string
    href: string
  }[]
}

export function HackathonCard({ title, description, dates, location, image, classname, links }: Props) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
   
      <Card
        className={`relative  border bg-white dark:bg-background border-gray-700 dark:border-gray-700 dark:shadow-gray-800/50 overflow-hidden shadow-md transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg 
          ${isExpanded ? "h-auto" : "h-54 xs:h-62 sm:h-70"} active:scale-110 ${classname}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Image Section */}
        {image && (
          <div className="w-full h-40 relative bg-background dark:bg-foreground overflow-hidden">
            <Image src={image || "/placeholder.svg"} alt={title} fill className="w-full h-24 xs:h-28 sm:h-32 object-contain mb-4" />
          </div>
        )}

        {/* Content Section */}
        <CardHeader className="p-2 xs:p-3 sm:p-4 pb-0 bg-white dark:bg-background ">
          <p className="text-xs xs:text-sm text-gray-500 text-center dark:text-gray-200">{dates}</p>
          <CardTitle className="text-base xs:text-md text-center font-bold text-gray-700 dark:text-gray-100">{title}</CardTitle>
          <p className="text-xs xs:text-sm text-center text-gray-500 dark:text-gray-200">{location}</p>
        </CardHeader>
        
      {/* Read More Button (Collapsed View) */}
      {!isExpanded && (
        <div className="px-2 xs:px-3 sm:px-4 pt-1 xs:pt-1.5 sm:pt-2 text-center bg-white dark:bg-background ">
          <button
            onClick={() => setIsExpanded(true)}
            className="text-xs xs:text-sm  text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 focus:outline-none focus:ring-1 focus:ring-offset-1 sm:focus:ring-2 sm:focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Read more
          </button>
        </div>
      )}

      {/* Expanded Content with Animation */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="expanded-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >          



        <CardContent className="p-2 xs:p-3 sm:p-4 pt-1 xs:pt-1.5 sm:pt-2 bg-white dark:bg-background ">
          {/* Description Expands When Clicked */}
          <p className="text-xs xs:text-sm text-justify text-gray-400 dark:text-gray-400">{description}</p>
        </CardContent>

        <CardFooter className="-2 xs:p-3 sm:p-4 pt-0 flex flex-col items-start bg-white dark:bg-background ">
          {/* Links */}
          {links && links.length > 0 && (
            <div className="flex flex-wrap gap-1 xs:gap-1.5 sm:gap-2">
              {links.map((link, idx) => (
                <Link href={link.href} key={idx} onClick={(e) => e.stopPropagation()}>
                  <Badge
                    key={idx}
                    title={link.title}
                    className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-100 px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg flex items-center gap-1 sm:gap-2
                          text-xs xs:text-sm"
                  >
                    <span className="size-3 xs:size-3.5 sm:size-4">{link.icon}</span>
                    <span className="truncate max-w-[80px] sm:max-w-[100px]">{link.title}</span>
                  </Badge>
                </Link>
              ))}
            </div>
          )}
          
              {/* Read Less Button */}
              <div className="px-2 xs:px-3 sm:px-4 pt-1 xs:pt-1.5 sm:pt-2 text-center  ">
              <button
                onClick={() => setIsExpanded(false)}
                className="mt-1 xs:mt-1.5 sm:mt-2 text-xs xs:text-sm  text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 focus:outline-none focus:ring-1 focus:ring-offset-1 sm:focus:ring-2 sm:focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Read less
              </button>
              </div>
            </CardFooter>
          </motion.div>
        )}
      </AnimatePresence>
      </Card>

  )
}

