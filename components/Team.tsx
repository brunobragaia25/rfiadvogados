import Image from "next/image";
import { team } from "@/data/content";
import Reveal from "./Reveal";

export default function Team() {
  return (
    <section id="equipe" className="bg-primary pb-24 pt-4">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="text-center">
          <span className="inline-block rounded-full border border-white/30 px-4 py-1.5 text-xs tracking-[0.15em] text-white/80">
            {team.badge}
          </span>
          <h2 className="font-heading mt-6 text-[32px] font-semibold leading-[32px] text-white sm:text-5xl sm:leading-none">
            {team.title}
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {team.members.map((member, i) => (
            <Reveal key={member.name} delay={(i % 3) * 0.1} className="text-center">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-black/20">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 font-heading text-xl text-white">
                {member.name}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
