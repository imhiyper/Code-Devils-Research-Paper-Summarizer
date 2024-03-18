"use client";
import { MotionValue, useScroll, motion, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { IconType } from "react-icons";
import {
  FiArrowRight,
  FiFileText,
  FiKey,
  FiClock,
  FiVolume2,
} from "react-icons/fi";

export const FeatureSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <>
      <div ref={ref} className="relative">
        {CARDS.map((c, idx) => (
          <Card
            key={c.id}
            card={c}
            scrollYProgress={scrollYProgress}
            position={idx + 1}
          />
        ))}
      </div>
      <div className="h-20 bg-white" />
    </>
  );
};

interface CardProps {
  position: number;
  card: CardType;
  scrollYProgress: MotionValue;
}

const Card = ({ position, card, scrollYProgress }: CardProps) => {
  const scaleFromPct = (position - 1) / CARDS.length;
  const y = useTransform(scrollYProgress, [scaleFromPct, 1], [0, -CARD_HEIGHT]);

  const isOddCard = position % 2;

  return (
    <motion.div
      style={{
        height: CARD_HEIGHT,
        y: position === CARDS.length ? undefined : y,
        background: isOddCard ? "black" : "white",
        color: isOddCard ? "white" : "black",
      }}
      className="sticky top-0 flex w-full origin-top flex-col items-center justify-center px-4"
    >
      <card.Icon className="mb-4 text-4xl" />
      <h3 className="mb-6 text-center text-4xl font-semibold md:text-6xl">
        {card.title}
      </h3>
      <p className="mb-8 max-w-lg text-center text-sm md:text-base">
        {card.description}
      </p>
      <a
        href={card.routeTo}
        target="_blank"
        className={`flex items-center gap-2 rounded px-6 py-4 text-base font-medium uppercase text-black transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 md:text-lg ${
          card.ctaClasses
        } ${
          isOddCard
            ? "shadow-[4px_4px_0px_white] hover:shadow-[8px_8px_0px_white]"
            : "shadow-[4px_4px_0px_black] hover:shadow-[8px_8px_0px_black]"
        }`}
      >
        <span>Debrief Now</span>
        <FiArrowRight />
      </a>
    </motion.div>
  );
};

const CARD_HEIGHT = 666;

type CardType = {
  id: number;
  Icon: IconType;
  title: string;
  description: string;
  ctaClasses: string;
  routeTo: string;
};

const CARDS: CardType[] = [
  {
    id: 1,
    Icon: FiFileText,
    title: "Instant Paper Summaries",
    description:
      "Upload your research paper and get a concise summary in seconds. SwiftDebrief analyzes the content and extracts the essential information for you.",
    ctaClasses: "bg-blue-300",
    routeTo: "/upload",
  },
  {
    id: 2,
    Icon: FiKey,
    title: "Key Points Extraction",
    description:
      "Quickly grasp the main ideas of a research paper. SwiftDebrief identifies and highlights the key points, making it easy to understand the core concepts.",
    ctaClasses: "bg-green-300",
    routeTo: "/upload",
  },
  {
    id: 3,
    Icon: FiClock,
    title: "Save Time and Effort",
    description:
      "Streamline your research process with SwiftDebrief. No more manual reading and note-taking. Get the information you need in a fraction of the time.",
    ctaClasses: "bg-orange-300",
    routeTo: "/upload",
  },
  {
    id: 4,
    Icon: FiVolume2,
    title: "Audio Summaries",
    description:
      "Listen to the summary and key points of research papers with SwiftDebrief's audio feature. Enjoy the convenience of having the insights read out loud to you.",
    ctaClasses: "bg-purple-300",
    routeTo: "/upload",
  },
];
