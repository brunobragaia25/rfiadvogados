import Image from "next/image";
import { about, pillars } from "@/data/content";
import Reveal from "./Reveal";

export default function AboutSection() {
  return (
    <section id="quem-somos" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="text-center">
          <span className="inline-block rounded-full border border-black/15 px-4 py-1.5 text-xs tracking-[0.15em] text-black/70">
            {about.badge}
          </span>
          <h2 className="font-heading mt-6 text-[32px] font-semibold leading-[32px] text-primary sm:text-5xl sm:leading-none">
            {about.title}
          </h2>
        </Reveal>

        <div className="mt-16">
          {about.blocks.map((block, i) => (
            <Reveal
              key={block.image}
              delay={i * 0.15}
              className={`grid overflow-hidden md:grid-cols-[4fr_5fr] ${
                block.theme === "primary" ? "bg-primary" : "bg-black"
              }`}
            >
              <div
                className={`relative h-64 md:h-auto ${
                  i === 1 ? "md:order-2" : ""
                }`}
              >
                <Image
                  src={block.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center gap-5 p-8 lg:p-16">
                {block.paragraphs.map((p) => (
                  <p key={p} className="max-w-[556px] text-base leading-7 text-white/90 lg:text-xl lg:leading-[35px]">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.1} className="rounded-2xl bg-[#F7F7F7] p-8">
              <h3 className="font-heading text-[28px] font-semibold leading-[28px] text-primary lg:text-4xl lg:leading-none">
                {pillar.title}
              </h3>
              {pillar.text && (
                <p className="mt-4 text-base leading-6 text-black/70 lg:text-xl lg:leading-[30px]">{pillar.text}</p>
              )}
              {pillar.list && (
                <ul className="mt-4 space-y-2 text-base leading-6 text-black/70 lg:text-xl lg:leading-[30px]">
                  {pillar.list.map((item) => (
                    <li key={item}>✔ {item}</li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
