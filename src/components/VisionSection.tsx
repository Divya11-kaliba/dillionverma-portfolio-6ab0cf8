"use client";
import { motion } from "framer-motion";

export default function VisionSection() {
  return (
    <section id="vision" className="relative py-16 text-center">
      <motion.h2
        className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        From Vision to Reality
      </motion.h2>

      <motion.p
        className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        This collaborative process ensures your ideas are transformed into a tangible and effective digital experience.
      </motion.p>
    </section>
  );
}


