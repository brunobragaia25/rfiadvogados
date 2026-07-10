"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { nav } from "@/data/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 z-50 w-full border-b border-primary transition-colors duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur" : "bg-black"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="#" className="flex items-center">
          <Image
            src="/images/logo-rfi.svg"
            alt="RFI Advogados"
            width={198}
            height={32}
            className="h-6 w-auto lg:h-7"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm tracking-wide text-white/90 transition-colors hover:text-primary"
            >
              {item.label.toUpperCase()}
            </a>
          ))}
        </nav>

        <a
          href="#contato"
          className="hidden rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105 lg:inline-block"
        >
          FALE CONOSCO
        </a>

        <button
          aria-label="Abrir menu"
          className="relative z-10 flex h-8 w-8 items-center justify-center text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <motion.span
            animate={open ? "open" : "closed"}
            className="relative block h-4 w-6"
          >
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 7 },
              }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="absolute left-0 top-0 h-0.5 w-6 bg-white"
            />
            <motion.span
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 bg-white"
            />
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -7 },
              }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="absolute bottom-0 left-0 h-0.5 w-6 bg-white"
            />
          </motion.span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-0 top-[58px] bottom-0 flex flex-col gap-8 bg-black px-6 pt-10 lg:hidden"
          >
            {[...nav, { href: "#contato", label: "Fale Conosco" }].map((item, i) => (
              <motion.a
                key={item.href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 + i * 0.05, ease: "easeOut" }}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-2xl tracking-wide text-white/90"
              >
                {item.label.toUpperCase()}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
