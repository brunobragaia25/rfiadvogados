import Image from "next/image";
import { MapPin, Phone, ArrowUp } from "lucide-react";
import { nav, contact, footer } from "@/data/content";

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-navy pb-16 pt-24 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-3 lg:px-10">
        <div>
          <Image
            src="/images/logo-rfi-footer.svg"
            alt="RFI Advogados"
            width={156}
            height={48}
            className="h-12 w-auto"
          />
          <p className="mt-8 max-w-xs leading-relaxed text-white/70">
            {footer.description}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm tracking-wide text-white/80 hover:text-primary"
            >
              {item.label.toUpperCase()}
            </a>
          ))}
          <a
            href="#contato"
            className="text-sm tracking-wide text-white/80 hover:text-primary"
          >
            FALE CONOSCO
          </a>

          <p className="mt-8 font-heading text-xl text-primary">NOSSAS REDES SOCIAIS</p>
          <div className="flex gap-3">
            <a
              href={contact.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-navy"
            >
              <LinkedinIcon />
            </a>
            <a
              href={contact.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-navy"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex items-start gap-3">
            <MapPin size={20} className="mt-0.5 shrink-0 text-primary" />
            <p className="text-white/80">{contact.address}</p>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={20} className="shrink-0 text-primary" />
            <p className="text-white/80">{contact.phone}</p>
          </div>

          <a
            href="#hero"
            className="mt-auto flex w-fit items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm tracking-wide hover:border-primary hover:text-primary"
          >
            VOLTAR AO TOPO
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
