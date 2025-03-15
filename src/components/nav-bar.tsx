"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Work", href: "#work" },
  { name: "Contact", href: "#contact" },
];

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
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full px-6 py-4 flex items-center justify-between backdrop-blur-md ${
        isScrolled ? "bg-white/80 shadow-md" : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-gray-900">
        PeushJha
      </Link>

      {/* Navigation Links */}
      <div className="flex space-x-6">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-gray-700 hover:text-black transition-colors duration-300"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
