import React, { FormEvent, useState } from "react";
import type { Page } from "../App";

interface ContatoProps {
  navigate: (page: Page) => void;
}

function Contato({ navigate }: ContatoProps) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Deixa o FormSubmit processar o formulário normalmente
    // e apenas registra o envio no estado da página.
    setSent(true);
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
          >
            Enviar mensagem →
          </button>
        </form>
      </section>
    </main>
  );
}

export default Contato;