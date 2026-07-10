import Image from "next/image";
import {
  Briefcase,
  Users,
  FileText,
  CircleDollarSign,
  Building2,
  Gavel,
  ShieldCheck,
  Landmark,
  type LucideIcon,
} from "lucide-react";
import { practiceAreas } from "@/data/content";
import Reveal from "./Reveal";

const icons: Record<string, LucideIcon> = {
  Briefcase,
  Users,
  FileText,
  CircleDollarSign,
  Building2,
  Gavel,
  ShieldCheck,
  Landmark,
};

export default function PracticeAreas() {
  return (
    <section id="areas" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="text-center">
          <span className="inline-block rounded-full border border-black/15 px-4 py-1.5 text-xs tracking-[0.15em] text-black/70">
            {practiceAreas.badge}
          </span>
          <h2 className="font-heading mt-6 text-[32px] font-semibold leading-[32px] text-primary sm:text-5xl sm:leading-none">
            {practiceAreas.title}
          </h2>
        </Reveal>

        <div className="mt-16 space-y-16">
          {practiceAreas.items.map((area, i) => {
            const Icon = icons[area.icon];
            const reversed = i % 2 === 1;
            return (
              <Reveal
                key={area.title}
                className={`flex flex-col items-center gap-8 md:gap-12 lg:gap-16 ${
                  reversed ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                <div className="relative h-64 w-full shrink-0 overflow-hidden md:h-[320px] md:w-[649px]">
                  <Image
                    src={area.image}
                    alt={area.title}
                    fill
                    sizes="(min-width: 768px) 649px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-tint text-primary">
                    <Icon size={20} />
                  </span>
                  <h3 className="font-heading mt-4 text-2xl font-semibold text-primary">
                    {area.title}
                  </h3>
                  <p className="mt-4 text-sm leading-[24.5px] text-black/70 lg:text-base lg:leading-7">
                    {area.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
