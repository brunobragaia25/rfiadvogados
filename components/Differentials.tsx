import Image from "next/image";
import { differentials } from "@/data/content";
import CountUp from "./CountUp";
import Reveal from "./Reveal";

export default function Differentials() {
  return (
    <section id="diferenciais" className="bg-primary py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="text-center">
          <span className="inline-block rounded-full border border-white/30 px-4 py-1.5 text-xs tracking-[0.15em] text-white/80">
            {differentials.badge}
          </span>
          <h2 className="font-heading mx-auto mt-6 max-w-3xl text-[32px] font-semibold leading-[32px] text-white sm:text-5xl sm:leading-none">
            {differentials.title}
          </h2>
        </Reveal>

        <Reveal className="mt-16 grid overflow-hidden bg-white md:h-[368px] md:grid-cols-2">
          <div className="flex items-center p-8 lg:p-12">
            <p className="text-2xl leading-[28.8px] text-black/80 lg:text-[32px] lg:leading-[38.4px]">
              {differentials.text}
            </p>
          </div>
          <div className="relative h-64 md:h-full">
            <Image
              src={differentials.image}
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {differentials.stats.slice(0, 2).map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.1}
              className="flex h-[227px] flex-col items-center justify-center bg-navy p-10 text-center"
            >
              <p className="font-heading text-[38px] font-semibold text-white lg:text-[64px]">
                <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-sm text-white/80 lg:text-xl">{stat.label}</p>
            </Reveal>
          ))}
        </div>
        <Reveal
          delay={0.2}
          className="mt-8 flex h-[227px] flex-col items-center justify-center bg-navy p-10 text-center"
        >
          <p className="font-heading text-[38px] font-semibold text-white lg:text-[64px]">
            <CountUp
              value={differentials.stats[2].value}
              prefix={differentials.stats[2].prefix}
              suffix={differentials.stats[2].suffix}
            />
          </p>
          <p className="mt-3 text-sm text-white/80 lg:text-xl">{differentials.stats[2].label}</p>
        </Reveal>
      </div>
    </section>
  );
}
