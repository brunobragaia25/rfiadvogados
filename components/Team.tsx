"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { team } from "@/data/content";
import Reveal from "./Reveal";

// Alinha o primeiro card com a borda do container max-w-7xl, mas deixa o trilho ocupar a largura toda
const edgeInset =
  "px-6 scroll-px-6 lg:px-10 lg:scroll-px-10 xl:px-[calc((100%-80rem)/2+2.5rem)] xl:scroll-px-[calc((100%-80rem)/2+2.5rem)]";

export default function Team() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [progress, setProgress] = useState(0);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows]);

  // Arrastar com o mouse (toque já rola nativamente). Em vez de seguir o cursor 1:1, o trilho
  // persegue um alvo com interpolação, o que deixa o movimento macio. Ao soltar, o alvo ganha o
  // embalo da velocidade e assenta no card mais próximo. O snap do CSS fica desligado nesse tempo.
  const drag = useRef<{ x: number; left: number; lastX: number; lastT: number; v: number } | null>(null);
  const motion = useRef({ current: 0, target: 0, raf: 0 });
  const [dragging, setDragging] = useState(false);

  const clampScroll = (el: HTMLDivElement, value: number) =>
    Math.min(Math.max(value, 0), el.scrollWidth - el.clientWidth);

  const animate = () => {
    const el = trackRef.current;
    const m = motion.current;
    if (!el) return;
    m.current += (m.target - m.current) * 0.12;
    if (!drag.current && Math.abs(m.target - m.current) < 0.5) {
      el.scrollLeft = m.target;
      m.raf = 0;
      setDragging(false);
      return;
    }
    el.scrollLeft = m.current;
    m.raf = requestAnimationFrame(animate);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = e.currentTarget;
    const m = motion.current;
    if (!m.raf) {
      m.current = m.target = el.scrollLeft;
      m.raf = requestAnimationFrame(animate);
    }
    const now = performance.now();
    drag.current = { x: e.clientX, left: m.target, lastX: e.clientX, lastT: now, v: 0 };
    el.setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const now = performance.now();
    const dt = now - d.lastT;
    if (dt > 0) {
      // velocidade em px/ms, suavizada pra não depender de um único evento
      d.v = 0.7 * ((e.clientX - d.lastX) / dt) + 0.3 * d.v;
      d.lastX = e.clientX;
      d.lastT = now;
    }
    motion.current.target = clampScroll(e.currentTarget, d.left - (e.clientX - d.x));
  };

  const endDrag = () => {
    const el = trackRef.current;
    const d = drag.current;
    if (!d || !el) return;
    drag.current = null;

    const v = performance.now() - d.lastT > 80 ? 0 : d.v;
    const projected = motion.current.target - v * 350;
    const cards = Array.from(el.children as HTMLCollectionOf<HTMLElement>);
    const targets = cards.map((c) => clampScroll(el, c.offsetLeft - cards[0].offsetLeft));
    motion.current.target = targets.reduce((a, b) =>
      Math.abs(b - projected) < Math.abs(a - projected) ? b : a,
    );
  };

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    const [first, second] = Array.from((el?.children ?? []) as HTMLCollectionOf<HTMLElement>);
    if (!el || !first || !second) return;
    el.scrollBy({ left: dir * (second.offsetLeft - first.offsetLeft), behavior: "smooth" });
  };

  const arrows = <Arrows canPrev={canPrev} canNext={canNext} onStep={scrollByCard} />;

  return (
    <section id="equipe" className="overflow-hidden bg-primary pb-24 pt-4">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 sm:flex-row sm:items-end sm:justify-between lg:px-10">
        <Reveal className="text-center sm:text-left">
          <span className="inline-block rounded-full border border-white/30 px-4 py-1.5 text-xs tracking-[0.15em] text-white/80">
            {team.badge}
          </span>
          <h2 className="font-heading mt-6 text-[32px] font-semibold leading-[32px] text-white sm:text-5xl sm:leading-none">
            {team.title}
          </h2>
        </Reveal>

        <div className="hidden gap-3 sm:flex">{arrows}</div>
      </div>

      <Reveal delay={0.1}>
        <div
          ref={trackRef}
          onScroll={updateArrows}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className={`relative mt-10 flex gap-4 overflow-x-auto sm:mt-12 sm:gap-6 overflow-y-hidden pb-2 select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            dragging ? "cursor-grabbing" : "cursor-grab snap-x snap-mandatory"
          } ${edgeInset}`}
        >
          {team.members.map((member) => (
            <div
              key={member.name}
              className="w-[72vw] max-w-[340px] shrink-0 snap-start last:snap-end sm:w-[300px] lg:w-[340px]"
            >
              <div className="group">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-black/20">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    draggable={false}
                    sizes="(min-width: 1024px) 340px, (min-width: 640px) 300px, 72vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <p className="mt-4 font-heading text-xl text-white sm:mt-5 sm:text-2xl">{member.name}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-8 flex items-center gap-5 px-6 sm:hidden">
        <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-white transition-[width] duration-200"
            style={{ width: `${15 + progress * 85}%` }}
          />
        </div>
        <div className="flex gap-3">{arrows}</div>
      </div>
    </section>
  );
}

function Arrows({
  canPrev,
  canNext,
  onStep,
}: {
  canPrev: boolean;
  canNext: boolean;
  onStep: (dir: 1 | -1) => void;
}) {
  return (
    <>
      {[
        { dir: -1 as const, enabled: canPrev, Icon: ChevronLeft, label: "Anterior" },
        { dir: 1 as const, enabled: canNext, Icon: ChevronRight, label: "Próximo" },
      ].map(({ dir, enabled, Icon, label }) => (
        <button
          key={label}
          type="button"
          aria-label={label}
          onClick={() => onStep(dir)}
          disabled={!enabled}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white hover:text-primary disabled:pointer-events-none disabled:opacity-30 sm:h-12 sm:w-12"
        >
          <Icon className="h-5 w-5" />
        </button>
      ))}
    </>
  );
}
