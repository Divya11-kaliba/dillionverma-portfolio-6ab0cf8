// "use client";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { cn } from "@/lib/utils";
// import { motion } from "framer-motion";
// import { ChevronDownIcon } from "lucide-react";
// import Link from "next/link";
// import React from "react";

// interface CertificateAchievementProps {
//   badgeUrl: string; // Logo for certificate or achievement
//   altText: string; // Alternative text for badge
//   title: string;
//   issuer?: string; // Only for certificates
//   date: string;
//   credentialUrl?: string; // Only for certificates
//   eventUrl?: string; // Only for achievements
//   description?: string;
//   technologies?: readonly string[]; // Used as badges (for achievements)
//   className?: string;
//   showExpand?: boolean;

// }

// export const CertificateAchievementCard = ({
//   badgeUrl,
//   altText,
//   title,
//   issuer,
//   date,
//   credentialUrl,
//   eventUrl,
//   description,
//   technologies,
//   className,
//   showExpand = false,
// }: CertificateAchievementProps) => {
//   const [isExpanded, setIsExpanded] = React.useState(false);

//   const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
//     if (description) {
//       e.preventDefault();
//       setIsExpanded(!isExpanded);
//     }
//   };

//   return (
//     <Link
//       href={credentialUrl || eventUrl || "#"}
//       className="block cursor-pointer"
//       onClick={handleClick}
//     >
//       <motion.div
//         whileHover={{ scale: 1.05 }}
//         transition={{ duration: 0.3 }}
//         className={cn(
//           " p-6 rounded-2xl bg-white/10 border border-gray-700 shadow-md transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 w-full flex flex-col min-h-[250px] h-full",
//           className
//         )}
//       >
//         <Card className="flex flex-col h-full">
//           {/* Header: Logo & Title */}
//           <CardHeader className="flex items-center gap-4">
//             <Avatar className="border size-14 bg-muted-background dark:bg-foreground">
//               <AvatarImage src={badgeUrl} alt={altText} className="object-contain" />
//               <AvatarFallback>{altText[0]}</AvatarFallback>
//             </Avatar>

//             <div className="flex flex-col justify-center">
//               <h3 className="text-lg font-semibold">{title}</h3>
//               {issuer && <p className="text-gray-400 text-sm">{issuer}</p>}
//               <p className="text-xs text-gray-700 dark:text-gray-100">{date}</p>
//             </div>
//           </CardHeader>

//           {/* Badges (Technologies Used in Achievements) */}
//           {technologies && technologies.length > 0 && (
//             <div className="flex flex-wrap gap-2 mt-2">
//               {technologies.map((tech, index) => (
//                 <Badge
//                   variant="secondary"
//                   className="text-xs px-2 py-1 rounded-md bg-gray-800 text-white"
//                   key={index}
//                 >
//                   {tech}
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
//             <div className="flex justify-end mt-2">
//               <button onClick={() => setIsExpanded(!isExpanded)}>
//                 <ChevronDownIcon
//                   className={cn(
//                     "size-5 transform transition-transform duration-300",
//                     isExpanded ? "rotate-180" : "rotate-0"
//                   )}
//                 />
//               </button>
//             </div>
//           )}
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
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

interface CertificateAchievementProps {
  badgeUrl: string; // Logo for certificate or achievement
  altText: string; // Alternative text for badge
  title: string;
  issuer?: string; // Only for certificates
  date: string;
  credentialUrl?: string; // Only for certificates
  eventUrl?: string; // Only for achievements
  description?: string;
  technologies?: readonly string[]; // Used as badges (for achievements)
  className?: string;
}

export const CertificateAchievementCard = ({
  badgeUrl,
  altText,
  title,
  issuer,
  date,
  credentialUrl,
  eventUrl,
  description,
  technologies,
  className,
}: CertificateAchievementProps) => {
  return (
    <Link href={credentialUrl || eventUrl || "#"} className="block cursor-pointer">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "p-6 rounded-2xl bg-white/10 border border-gray-700 shadow-md transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 w-full flex flex-col min-h-[250px] h-full",
          className
        )}
      >
        <Card className="flex flex-col h-full">
          {/* Header: Logo & Title */}
          <CardHeader className="flex items-center gap-4">
            <Avatar className="border size-14 bg-muted-background dark:bg-foreground">
              <AvatarImage src={badgeUrl} alt={altText} className="object-contain" />
              <AvatarFallback>{altText[0]}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col justify-center">
              <h3 className="text-lg font-semibold">{title}</h3>
              {issuer && <p className="text-gray-400 text-sm">{issuer}</p>}
              <p className="text-xs text-gray-700 dark:text-gray-100">{date}</p>
            </div>
          </CardHeader>

          {/* Badges (Technologies Used in Achievements) */}
          {technologies && technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {technologies.map((tech, index) => (
                <Badge
                  variant="secondary"
                  className="text-xs px-2 py-1 rounded-md bg-gray-800 text-white"
                  key={index}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          )}

          {/* Description */}
          {description && (
            <div className="mt-2 px-2 text-sm text-gray-700 dark:text-gray-300">
              {description}
            </div>
          )}
        </Card>
      </motion.div>
    </Link>
  );
};

