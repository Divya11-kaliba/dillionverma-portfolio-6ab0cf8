"use client"

import { motion } from "framer-motion"
import BlurFade from "@/components/magicui/blur-fade"

const features = [
  "Custom Layout",
  "Easy to manage",
  "Advanced CMS",
  "Automatic Backup",
  "Consistency in Design",
  "Automatic Updates",
  "Responsive Website",
  "SEO Friendly",
  "Custom Layout",
  "Easy to manage",
  "Advanced CMS",
  "Automatic Backup",
]

export function FeatureGrid() {
  return (
    <BlurFade delay={0.5}>
      <div className="grid grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="bg-[#ff0054] p-6 flex items-center justify-center text-center h-32"
          >
            <p className="font-medium">{feature}</p>
          </motion.div>
        ))}
      </div>
    </BlurFade>
  )
}


