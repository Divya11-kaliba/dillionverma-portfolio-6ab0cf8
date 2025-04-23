"use client";

import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useOutsideClick  from '@/hooks/use-outside-click';
import { cn } from "@/lib/utils";

interface Card {
  company: string;
  href: string;
  location: string;
  title: string;
  logoUrl: string;
  start: string;
  end: string;
  description: string;
}

interface ExpandableCardProps {
  cards: Card[];
}

export function ExpandableCard({ cards }: ExpandableCardProps) {
  const [active, setActive] = useState<Card | null>(null);
  const [showAll, setShowAll] = useState(false);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    document.body.style.overflow = active ? "hidden" : "auto";

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      {/* Overlay when a card is expanded */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-10"
          />
        )}
      </AnimatePresence>

      {/* Expanded Card - Rendered Separately */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <motion.div
              layoutId={`card-${active.company}-${id}`} // Only apply layoutId here
              ref={ref}
              className="w-full max-w-[500px] bg-white dark:bg-neutral-900 rounded-xl p-6 overflow-hidden shadow-lg"
            >
              <motion.div
                layoutId={`image-${active.title}-${id}`}
                className=" items-center justify-items-center"
              >
                <Image
                  width={70}
                  height={70}
                  src={active.logoUrl}
                  alt={active.title}
                  className="w-60 h-60 rounded-lg"
                />
              </motion.div>

              <div className="mt-4">
                <div className="mt-4 flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold">{active.company}</h3>
                    <p className="text-sm">{active.title}</p>
                  </div>
                  <p className="text-sm text-right whitespace-nowrap">{`${active.start} - ${active.end}`}</p>
                </div>
                <p className="mt-4 text-justify">{active.description}</p>
                <div className="justify-self-center">
                  <a
                    href={active.href}
                    target="_blank"
                    className="mt-4 inline-block bg-green-500 text-white  px-4 py-2 rounded"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Card Grid - Keeps All Cards Visible */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 w-full px-4 sm:px-6 md:px-8">
        {(showAll ? cards : cards.slice(0, 6)).map((card) => (
          <motion.div
            key={card.company}
            onClick={() => setActive(card)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className={cn(
              "group overflow-hidden relative card flex flex-col hover:bg-white w-full md:w-[300px] lg:w-[350px] xl:w-[400px] h-80 dark:hover:bg-neutral-900 cursor-pointer transition-all duration-300 rounded-md shadow-xl justify-end p-4 border border-black dark:border-gray-700",
              "bg-cover dark:bg-transparent bg-customGray bg-no-repeat bg-center transition-all duration-500"
            )}
          >
            {/* Logo Image */}
            <Image
              width={120} // Increased size for better visibility
              height={120}
              src={card.logoUrl}
              alt={card.title}
              className="w-36 h-36 mb-10 self-center rounded-lg object-cover"
            />

            {/* Company Name */}
            <p className="font-bold text-lg pt-4 md:text-xl relative">
              {card.company}
            </p>

            {/* Job Title */}
            <h3 className="font-normal text-sm md:text-base relative">
              {card.title}
            </h3>
          </motion.div>
        ))}
      </ul>
      {cards.length > 6 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold transition"
          >
            {showAll ? "Hide" : "View More"}
          </button>
        </div>
      )}
    </>
  );
}
