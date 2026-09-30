import React, { FormEvent, useState } from "react";

interface ContatoProps {
  navigate?: (page: any) => void;
}

function Contato(_props: ContatoProps) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Impede o envio nativo do navegador: antes, a tela de sucesso
    // trocava o formulário na hora e o envio nunca chegava a acontecer.
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    setSending(true);
    setError("");

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/contato.permaneser@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: "Nova mensagem — PermaneSER",
            _captcha: "false",
            _template: "table",
            name: String(data.get("name") || ""),
            email: String(data.get("email") || ""),
            subject: String(data.get("subject") || ""),
            message: String(data.get("message") || ""),
          }),
        }
      );

      const result = await response.json().catch(() => null);

      if (!response.ok || !result || String(result.success) !== "true") {
        console.error("Erro FormSubmit:", response.status, result);
        throw new Error(
          "Não conseguimos enviar sua mensagem. Tente novamente ou escreva para contato.permaneser@gmail.com."
        );
      }

      form.reset();
      setSent(true);
    } catch (err) {
      console.error(err);

      if (err instanceof Error && err.message.startsWith("Não conseguimos")) {
        setError(err.message);
      } else {
        setError(
          "Não conseguimos enviar sua mensagem. Verifique sua conexão e tente novamente."
        );
      }
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <main className="contact-page">
        <section className="document-success">
          <span className="section-number">06</span>

          <h1>Mensagem recebida.</h1>

          <p>
            Obrigada por escrever. Sua mensagem chegou ao
            PermaneSER.
          </p>

          <button
            className="button-primary"
            onClick={() => setSent(false)}
          >
            Enviar outra mensagem
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div>
          <span className="section-number">
            06 / CONTATO
          </span>

          <h1>
            Tem algo
            <br />
            para contar?
          </h1>
        </div>

        <p>
          Um espaço que merece ser documentado, uma ideia
          para reimaginar, uma pesquisa, uma dúvida ou uma
          possibilidade de colaboração pode começar por aqui.
        </p>
      </section>

      <section className="contact-content">
        <div className="contact-note">
          <span>FALE COM O PROJETO</span>

          <h2>
            O PermaneSER
            <br />
            ainda está sendo construído.
          </h2>

          <p>
            Por isso, sugestões, críticas, pesquisas e novas
            possibilidades também fazem parte do projeto.
          </p>

          <div className="contact-email">
            <small>E-MAIL</small>

            <a href="mailto:contato.permaneser@gmail.com">
              contato.permaneser@gmail.com
            </a>
          </div>
        </div>

        <form
          className="field-form"
          action="https://formsubmit.co/contato.permaneser@gmail.com"
          method="POST"
          onSubmit={handleSubmit}
        >
          {/* Configurações do FormSubmit */}

          <input
            type="hidden"
            name="_subject"
            value="Nova mensagem — PermaneSER"
          />

          <input
            type="hidden"
            name="_captcha"
            value="false"
          />

          <input
            type="hidden"
            name="_template"
            value="table"
          />

          <label>
            Seu nome

            <input
              type="text"
              name="name"
              placeholder="Como podemos te chamar?"
              required
            />
          </label>

          <label>
            Seu e-mail

            <input
              type="email"
              name="email"
              placeholder="seu@email.com"
              required
            />
          </label>

          <label>
            Assunto

            <input
              type="text"
              name="subject"
              placeholder="Sobre o que você quer falar?"
              required
            />
          </label>

          <label>
            Sua mensagem

            <textarea
              name="message"
              placeholder="Escreva sua mensagem..."
              rows={8}
              required
            />
          </label>

          <button
            type="submit"
            className="form-submit"
            disabled={sending}
          >
            {sending ? "Enviando..." : "Enviar mensagem →"}
          </button>

          {error && <p className="form-error">{error}</p>}
        </form>
      </section>
    </main>
  );
}

export default Contato;
