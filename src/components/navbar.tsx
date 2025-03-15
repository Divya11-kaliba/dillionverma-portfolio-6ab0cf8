"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/magicui/dot-pattern";


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
  initial={{ y: -50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.6 }}
  className={`fixed top-0 left-0 w-full h-20 px-12 flex items-center justify-between bg-background backdrop-blur-lg transition-all duration-300 ${
    isScrolled ? "shadow-md dark:bg-gray-900/80" : "bg-transparent"
  }`}
>
  {/* Logo */}
  <Link href="/" className="text-3xl font-bold text-gray-900 dark:text-white">
  <div className="relative">
  <div className="absolute inset-0 w-full flex items-center justify-center">
  <DotPattern glow={true} className="absolute inset-0 w-full h-full"/>
  </div>
  <span className="relative z-10">{DATA.name}</span>
  </div>
  </Link>

  {/* Navigation Links - Spread Across Entire Screen */}
  <div className="flex space-x-12 text-lg ml-auto">
    {DATA.navbar.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300"
      >
        {item.label}
      </Link>
    ))}
  </div>
</motion.nav>


      {/* Bottom Dock Navigation (Restored to Original) */}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30 flex items-center justify-center">
        <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-[60px] h-16 w-auto max-w-md items-center px-4 bg-white/80 backdrop-blur-md shadow-lg dark:bg-gray-900/80 dark:shadow-gray-800 rounded-full">
          {DATA.navbar.map((item) => (
            <DockIcon key={item.href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                    )}
                  >
                    <item.icon className="size-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-8 mx-4" />
          {Object.entries(DATA.contact.social)
            .filter(([_, social]) => social.navbar)
            .map(([name, social]) => (
              <DockIcon key={name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={social.url}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-12 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                      )}
                    >
                      <social.icon className="size-5" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{name}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
          <Separator orientation="vertical" className="h-8 mx-4" />
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <ModeToggle />
              </TooltipTrigger>
              <TooltipContent>
                <p>Theme</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </div>
    </>
  );
};

export default Navbar;
