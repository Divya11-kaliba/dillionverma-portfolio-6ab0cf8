// "use client";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { cn } from "@/lib/utils";
// import { motion } from "framer-motion";
// import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
// import Link from "next/link";
// import React from "react";


// interface ResumeCardProps {
//   logoUrl: string;
//   altText: string;
//   title: string;
//   subtitle?: string;
//   href?: string;
//   badges?: readonly string[];
//   period: string;
//   description?: string;
//   className?: string;
//   showExpand?: boolean;
// }

// export const ResumeCard = ({
//   logoUrl,
//   altText,
//   title,
//   subtitle,
//   href,
//   badges,
//   period,
//   description,
//   className,
//   showExpand = false, 
// }: ResumeCardProps) => {
//   const [isExpanded, setIsExpanded] = React.useState(false);

//   const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
//     if (description) {
//       e.preventDefault();
//       setIsExpanded(!isExpanded);
//     }
//   };

//   return (
//     <Link
//       href={href || "#"}
//       className="block cursor-pointer"
//       onClick={handleClick}
//     >
//       <motion.div
//         whileHover={{ scale: 1.05 }}
//         transition={{ duration: 0.3 }}
//         className={cn(
//           "relative bg-white/10 border border-gray-700 shadow-lg backdrop-blur-md rounded-xl p-5  min-h-[220px] flex flex-col hover:bg-white/20 transition-all w-full flex-grow",
//           className
//         )}
//       >
//         <Card className="flex flex-col h-full w-full">
//           {/* Header: Logo & Title */}
//           <CardHeader className="flex items-center space-x">
//             <Avatar className="border size-14 bg-muted-background dark:bg-foreground">
//               <AvatarImage src={logoUrl} alt={altText} className="object-contain" />
//               <AvatarFallback>{altText[0]}</AvatarFallback>
//             </Avatar>

//             <div className="flex flex-col justify-center">
//               <h3 className="text-lg font-semibold text-center">{title}</h3>
//               <p className="text-gray-400 text-sm text-center">{subtitle}</p>
//               <p className="text-xs text-gray-700 dark:text-gray-100  text-center">{period}</p>
//             </div>
//           </CardHeader>

//           {/* Badges */}
//           {badges && badges.length > 0 && (
//             <div className="flex flex-wrap gap-2 mt-2">
//               {badges.map((badge, index) => (
//                 <Badge
//                   variant="secondary"
//                   className="text-xs px-2 py-1 rounded-md bg-gray-800 text-white"
//                   key={index}
//                 >
//                   {badge}
//                 </Badge>
//               ))}
//             </div>
//           )}

//           {/* Description (Initially Hidden, Expands on Click) */}
//           {description && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: isExpanded ? 1 : 0, height: isExpanded ? "auto" : 0 }}
//               transition={{ duration: 0.5, ease: "easeInOut" }}
//               className="overflow-hidden mt-2 px-2 text-sm text-gray-700 dark:text-gray-300"
//             >
//               {description}
//             </motion.div>
//           )}

//           {/* Expand Icon */}
//           {showExpand && (
//           <div className="flex justify-end mt-2">
//             <button onClick={() => setIsExpanded(!isExpanded)}>              
//             </button>
//           </div>
//         )}
//         </Card>
//       </motion.div>
//     </Link>
//   );
// };

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import Link from "next/link";
import React, { useEffect, useId, useRef } from "react";

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
  showExpand?: boolean;
  onExpandChange?: (expanded: boolean) => void;
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
  onExpandChange, 
}: ResumeCardProps) => {
  const [active, setActive] = React.useState(false);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  // Handle Escape key and body overflow
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
        onExpandChange?.(false);
      }
    }

    document.body.style.overflow = active ? "hidden" : "auto";

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, onExpandChange]);

  // Handle clicking outside the modal
  const handleOutsideClick = () => {
    setActive(false);
    onExpandChange?.(false);
  };


  return (
    <>
      {/* Modal Overlay - Only appears when card is expanded */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-10"
            onClick={handleOutsideClick}
            suppressHydrationWarning
          />
        )}
      </AnimatePresence>

      {/* Expanded Card Modal - Only appears when card is expanded */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <motion.div
              layoutId={`card-${title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] bg-white dark:bg-neutral-900 rounded-xl p-6 overflow-hidden shadow-lg"
            >
              {/* Card Header with Avatar and Title */}
              <div className="flex items-center space-x-4 mb-4">
                <motion.div layoutId={`avatar-${title}-${id}`}>
                  <Avatar className="border size-16 bg-muted-background dark:bg-foreground">
                    <AvatarImage src={logoUrl} alt={altText} className="object-contain" />
                    <AvatarFallback>{altText[0]}</AvatarFallback>
                  </Avatar>
                </motion.div>

                <div>
                  <motion.h3 layoutId={`title-${title}-${id}`} className="text-xl font-bold">
                    {title}
                  </motion.h3>
                  {subtitle && (
                    <motion.p layoutId={`subtitle-${title}-${id}`} className="text-sm text-gray-400">
                      {subtitle}
                    </motion.p>
                  )}
                  <motion.p layoutId={`period-${title}-${id}`} className="text-sm text-gray-700 dark:text-gray-100">
                    {period}
                  </motion.p>
                </div>
              </div>

              {/* Badges */}
              {badges && badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
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

              {/* Description */}
              {description && (
                <p className="mt-4 text-justify">{description}</p>
              )}

              {/* Website Link */}
              {href && (
                <div className="mt-4 flex justify-center">
                  <a
                    href={href}
                    target="_blank"
                    className="inline-block bg-green-500 text-white px-4 py-2 rounded"
                    suppressHydrationWarning
                  >
                    Visit Website
                  </a>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={() =>{
                  setActive(false);
                  onExpandChange?.(false);
                }}
                className="absolute top-2 right-2 bg-gray-200 dark:bg-gray-800 rounded-full p-1.5 text-gray-800 dark:text-gray-200"
                suppressHydrationWarning
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Card - Clickable to open modal */}
      <div
        onClick={() => {
          if (description) {
            setActive(true);
            onExpandChange?.(true);
          }
        }}
        className="cursor-pointer"
        suppressHydrationWarning
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          layoutId={`card-${title}-${id}`}
          className={cn(
            "relative bg-white/10 border border-gray-700 shadow-lg backdrop-blur-md rounded-xl p-5 min-h-[220px] flex flex-col hover:bg-white/20 transition-all w-full flex-grow",
            className
          )}
          suppressHydrationWarning
        >
          <Card className="flex flex-col h-full w-full">
            {/* Header: Logo & Title */}
            <CardHeader className="flex items-center space-x">
              <motion.div layoutId={`avatar-${title}-${id}`}>
                <Avatar className="border size-14 bg-muted-background dark:bg-foreground">
                  <AvatarImage src={logoUrl} alt={altText} className="object-contain" />
                  <AvatarFallback>{altText[0]}</AvatarFallback>
                </Avatar>
              </motion.div>

              <div className="flex flex-col justify-center">
                <motion.h3 layoutId={`title-${title}-${id}`} className="text-lg font-semibold text-center">
                  {title}
                </motion.h3>
                {subtitle && (
                  <motion.p layoutId={`subtitle-${title}-${id}`} className="text-gray-400 text-sm text-center">
                    {subtitle}
                  </motion.p>
                )}
                <motion.p layoutId={`period-${title}-${id}`} className="text-xs text-gray-700 dark:text-gray-100 text-center">
                  {period}
                </motion.p>
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

            {/* View Details Indicator */}
            {description && (
              <div className="mt-auto  text-sm text-blue-600 dark:text-blue-400 text-center">
                View Details
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </>
  );
};