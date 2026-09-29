import React, { FormEvent, useState } from "react";
import type { Page } from "../App";
import { supabase } from "./lib/supabase";

interface DocumentarProps {
  navigate: (page: Page) => void;
}

function Documentar({ navigate }: DocumentarProps) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSending(true);
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const city = String(data.get("city") || "");
    const location = String(data.get("location") || "");
    const observation = String(data.get("observation") || "");
    const permanence = String(data.get("permanence") || "");
    const additionalInformation = String(
      data.get("additional_information") || ""
    );

    const file = data.get("attachment") as File | null;

    try {
      let imageUrl = "";

      // 1. Envia a imagem para o Storage
      if (file && file.size > 0) {
        if (file.size > 10 * 1024 * 1024) {
          throw new Error("A imagem precisa ter no máximo 10 MB.");
        }

        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {
          throw new Error(
            "A imagem precisa ser JPG, PNG ou WEBP."
          );
        }

        const extension =
          file.name.split(".").pop()?.toLowerCase() || "jpg";

        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2)}.${extension}`;

        const filePath = `cases/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("case-images")
          .upload(filePath, file, {
            contentType: file.type,
            upsert: false,
          });

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } = supabase.storage
          .from("case-images")
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      }

      // 2. Salva o caso na tabela cases
      
      const { error: insertError } = await supabase
      .from("cases")
      .insert({
        nome: name,
        email,
        cidade: city,
        localização: location,
        titulo: `Caso em ${location}`,
        descrição: observation,
        permanência: permanence,
        informações_adicionais: additionalInformation,
        imagem_url: imageUrl,
        status: "pending",
      });

      // 3. Mostra a tela de sucesso
      setSent(true);
      form.reset();
    } catch (err: any) {
      console.error("ERRO SUPABASE:", err);
    
      setError(
        err?.message ||
          err?.details ||
          err?.hint ||
          "Não conseguimos enviar o formulário. Tente novamente."
      );
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <main className="document-page">
        <section className="document-success">
          <span className="section-number">01</span>

          <h1>Recebemos.</h1>

          <p>
            Obrigada por contribuir com o arquivo do PermaneSER.
            O material será revisado antes de entrar no arquivo público.
          </p>

          <div className="success-actions">
            <button
              className="button-primary"
              onClick={() => setSent(false)}
            >
              Documentar outro caso
            </button>

            <button
              className="button-secondary"
              onClick={() => navigate("explorar")}
            >
              Explorar o arquivo
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="document-page">
      <section className="document-hero">
        <div>
          <span className="section-number">01 / DOCUMENTAR</span>

          <h1>
            Antes de mudar um espaço,
            <em> é preciso olhar para ele.</em>
          </h1>
        </div>

        <p>
          Uma grade, um banco, uma divisão na calçada ou uma superfície
          inclinada podem parecer detalhes isolados. Mas, quando observados
          com atenção, também contam uma história sobre quem pode usar
          aquele lugar.
        </p>
      </section>

      <section className="document-form-wrap">
        <div className="form-intro">
          <span>ENVIAR UM CASO</span>

          <h2>
            O que você encontrou
            <br />
            pela cidade?
          </h2>

          <p>
            Preencha o máximo de informações que puder. Os materiais
            enviados passam por revisão antes de serem publicados.
          </p>
        </div>

        <form
          className="field-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form-grid">
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
          </div>

          <div className="form-grid">
            <label>
              Cidade
              <input
                type="text"
                name="city"
                placeholder="Ex.: Curitiba"
                required
              />
            </label>

            <label>
              Localização
              <input
                type="text"
                name="location"
                placeholder="Rua, praça, viaduto..."
                required
              />
            </label>
          </div>

          <label>
            O que você observou?
            <textarea
              name="observation"
              placeholder="Descreva o espaço e os elementos que chamaram sua atenção."
              rows={6}
              required
            />
          </label>

          <label>
            O que esse espaço permite ou impede?
            <textarea
              name="permanence"
              placeholder="É possível sentar? Deitar? Esperar? Circular? Permanecer?"
              rows={5}
              required
            />
          </label>

          <label>
            Outras observações
            <textarea
              name="additional_information"
              placeholder="Contexto, horário, frequência de uso, outras informações..."
              rows={4}
            />
          </label>

          <label className="upload-box">
            <span>FOTO DO ESPAÇO</span>

            <strong>Escolher imagem</strong>

            <small>
              JPG, PNG ou WEBP · até 10 MB
            </small>

            <input
              type="file"
              name="attachment"
              accept="image/png,image/jpeg,image/webp"
            />
          </label>

          <input
            type="text"
            name="_honey"
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />

          <button
            type="submit"
            className="form-submit"
            disabled={sending}
          >
            {sending ? "Enviando..." : "Enviar caso →"}
          </button>

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}

export default Documentar;