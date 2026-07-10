import Image from "next/image";
import { whyUs } from "@/data/content";
import Reveal from "./Reveal";

export default function WhyUsSection() {
  return (
    <section className="bg-primary-tint py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <h2 className="font-heading max-w-xl text-[32px] font-semibold leading-[32px] text-primary sm:text-5xl sm:leading-none">
            {whyUs.title}
          </h2>
          <p className="max-w-sm text-black/70 lg:text-right">
            {whyUs.description}
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {whyUs.reasons.map((reason, i) => (
            <Reveal key={reason.number} delay={i * 0.08}>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-heading text-sm font-semibold leading-none text-white lg:text-2xl">
                {reason.number}
              </span>
              <p className="mt-4 text-base leading-7 text-black/70 lg:text-xl lg:leading-[35px]">
                {reason.text}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 grid overflow-hidden bg-primary md:h-[460px] md:grid-cols-[2fr_3fr]">
          <div className="relative h-64 md:h-full">
            <Image
              src={whyUs.cta.image}
              alt=""
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-6 p-8 lg:p-16">
            <p className="font-heading text-[28px] font-semibold leading-[33.6px] text-white lg:text-[44px] lg:leading-[52.8px]">
              {whyUs.cta.text}
            </p>
            <a
              href="#contato"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-medium tracking-wide text-primary transition-transform hover:scale-105"
            >
              ENTRE EM CONTATO
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
