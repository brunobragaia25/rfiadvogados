import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, phone, email, message } = await request.json();

  if (!name || !phone || !email || !message) {
    return Response.json(
      { error: "Todos os campos são obrigatórios." },
      { status: 400 },
    );
  }

  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL!,
    to: process.env.CONTACT_TO_EMAIL!,
    replyTo: email,
    subject: `Novo contato pelo site — ${name}`,
    html: `
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Telefone:</strong> ${phone}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  });

  if (error) {
    return Response.json(
      { error: "Não foi possível enviar a mensagem." },
      { status: 500 },
    );
  }

  return Response.json({ success: true });
}
