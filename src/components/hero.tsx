"use client";
import Image from "next/image";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { FiArrowDownCircle } from "react-icons/fi";

export const Hero = () => {
  return (
    <section id="#" className="h-screen bg-black">
      <NavBar />
      <Title />
      <Wrapper />
    </section>
  );
};

const NavBar = () => {
  return (
    <nav className="absolute left-0 right-0 top-0 z-[99999999]">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4 md:p-6">
        <Image
          src="/logo.webp"
          width={72}
          height={72}
          className="rounded-full"
          alt="logo"
        />
        {/* <h1 className="text-5xl">Logo</h1> */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.995, rotate: "3.5deg" }}
          onClick={() => (window.location.href = "/upload")}
          className="flex items-center gap-2 rounded-md bg-indigo-500 px-8 py-4 font-medium text-slate-50 transition-colors hover:bg-indigo-600"
        >
          <span>Get Started</span>
        </motion.button>
      </div>
    </nav>
  );
};

const Title = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-[999999]">
      <div className="mx-auto flex max-w-7xl items-end justify-between p-4 md:p-8">
        <div>
          <h1 className="mb-6 whitespace-normal text-6xl font-black leading-[1.1] text-slate-100 md:text-8xl">
            Debrief your research papers{" "}
            <span className="text-indigo-500">Faster. Better. Easier.</span>
          </h1>
          <p className="max-w-xl text-slate-300 md:text-lg font-semibold">
            SwiftDebrief is a revolutionary platform that simplifies research
            paper analysis. Upload a paper and instantly receive concise
            summaries, key points, and audio narration, saving you time and
            effort. Unlock the power of efficient research with SwiftDebrief.
          </p>
        </div>
        <FiArrowDownCircle className="hidden text-8xl text-indigo-500 md:block" />
      </div>
    </div>
  );
};

const Wrapper = () => {
  return (
    <>
      <Watermark text="Instant Insights" />
      <Watermark text="Paper Decoded" reverse />
      <Watermark text="Research Simplified" />
      <Watermark text="Knowledge Unlocked" reverse />
      <Watermark text="Effortless Analysis" />
      <Watermark text="Summaries in Seconds" reverse />
      <Watermark text="Audio Abstracts" />
      <Watermark text="Paper Gist" reverse />
      <Watermark text="Research Accelerated" />
    </>
  );
};

const Watermark = ({ reverse, text }: { reverse?: boolean; text: string }) => (
  <div className="flex -translate-y-12 select-none overflow-hidden">
    <TranslateWrapper reverse={reverse}>
      <span className="w-fit whitespace-nowrap text-[20vmax] font-black uppercase leading-[0.75] text-zinc-900">
        {text}
      </span>
    </TranslateWrapper>
    <TranslateWrapper reverse={reverse}>
      <span className="ml-48 w-fit whitespace-nowrap text-[20vmax] font-black uppercase leading-[0.75] text-zinc-900">
        {text}
      </span>
    </TranslateWrapper>
  </div>
);

const TranslateWrapper = ({
  children,
  reverse,
}: {
  children: ReactNode;
  reverse?: boolean;
}) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
      className="flex"
    >
      {children}
    </motion.div>
  );
};
