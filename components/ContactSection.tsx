"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/data/content";
import Reveal from "./Reveal";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) throw new Error();

      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const buttonLabel = {
    idle: "ENVIE SUA MENSAGEM",
    sending: "ENVIANDO...",
    sent: "MENSAGEM ENVIADA",
    error: "ERRO — TENTE NOVAMENTE",
  }[status];

  return (
    <section id="contato" className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:px-10">
        <Reveal className="order-2 overflow-hidden rounded-2xl md:order-1">
          <iframe
            title="Localização RFI Advogados"
            src={contact.mapEmbedSrc}
            className="h-80 w-full lg:h-full lg:min-h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>

        <Reveal delay={0.15} className="order-1 md:order-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="font-heading text-lg text-primary" htmlFor="name">
              Nome
            </label>
            <input
              id="name"
              name="name"
              required
              placeholder="Escreva o seu nome completo"
              className="mt-2 w-full border-b border-black/20 bg-transparent py-2 outline-none placeholder:text-black/40 focus:border-primary"
            />
          </div>
          <div>
            <label className="font-heading text-lg text-primary" htmlFor="phone">
              Telefone
            </label>
            <input
              id="phone"
              name="phone"
              required
              placeholder="Escreva o seu telefone"
              className="mt-2 w-full border-b border-black/20 bg-transparent py-2 outline-none placeholder:text-black/40 focus:border-primary"
            />
          </div>
          <div>
            <label className="font-heading text-lg text-primary" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Escreva o seu e-mail"
              className="mt-2 w-full border-b border-black/20 bg-transparent py-2 outline-none placeholder:text-black/40 focus:border-primary"
            />
          </div>
          <div>
            <label className="font-heading text-lg text-primary" htmlFor="message">
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={3}
              placeholder="Digite a sua mensagem"
              className="mt-2 w-full resize-y border-b border-black/20 bg-transparent py-2 outline-none placeholder:text-black/40 focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium tracking-wide text-white transition-transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
          >
            {buttonLabel}
          </button>
        </form>
        </Reveal>
      </div>
    </section>
  );
}
