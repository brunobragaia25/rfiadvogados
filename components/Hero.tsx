"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { hero } from "@/data/content";

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section id="hero" className="relative flex h-[720px] items-center bg-black sm:h-auto sm:min-h-screen">
      <Image
        src={hero.image}
        alt="Escritório RFI Advogados"
        fill
        preload
        sizes="100vw"
        className="hidden object-cover opacity-70 sm:block"
      />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-black via-black/70 to-black/20 sm:block" />

      <motion.div
        className="relative mx-auto w-full max-w-7xl px-6 pt-24 sm:pb-0 lg:px-10"
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
      >
        <motion.h1
          variants={item}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-heading max-w-3xl text-[40px] font-bold leading-[40px] text-primary lg:text-[88px] lg:leading-none"
        >
          {hero.title}
        </motion.h1>
        <motion.p
          variants={item}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-6 max-w-xl text-base leading-7 text-white/90 lg:text-2xl lg:leading-[42px]"
        >
          {hero.description}
        </motion.p>
        <motion.div
          variants={item}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <a
            href="#areas"
            className="rounded-full bg-primary px-7 py-3.5 text-sm font-medium tracking-wide text-white transition-transform hover:scale-105"
          >
            ÁREAS DE ATUAÇÃO
          </a>
          <a
            href="#contato"
            className="text-sm font-medium tracking-wide text-white/90 underline-offset-4 hover:underline"
          >
            ENTRE EM CONTATO
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
