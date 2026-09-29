import React, { FormEvent, useEffect, useState } from "react";
import type { Page } from "../App";
import { supabase } from "./lib/supabase";

interface ReimagineProps {
  navigate: (page: Page) => void;
  caseId?: string | null;
}

function Reimaginar({ navigate, caseId }: ReimagineProps) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const [cases, setCases] = useState<
    {
      id: number;
      titulo: string | null;
      localização: string | null;
      cidade: string | null;
    }[]
  >([]);

  useEffect(() => {
    async function loadCases() {
      const { data, error } = await supabase
        .from("cases")
        .select("id, titulo, localização, cidade")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao carregar casos:", error);
        return;
      }

      setCases(data || []);
    }

    loadCases();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSending(true);
    setError("");

    try {
      const form = event.currentTarget;
      const data = new FormData(form);

      const name = String(data.get("name") || "");
      const email = String(data.get("email") || "");
      const course = String(data.get("course") || "");
      const selectedCaseId = String(data.get("case") || "");
      const title = String(data.get("proposal_title") || "");
      const description = String(
        data.get("proposal_description") || ""
      );
      const reason = String(data.get("proposal_reason") || "");

      const file = data.get("attachment") as File | null;

      if (!selectedCaseId) {
        throw new Error("Selecione um caso.");
      }

      if (!file || file.size === 0) {
        throw new Error("Envie uma imagem do seu redesenho.");
      }

      if (file.size > 10 * 1024 * 1024) {
        throw new Error("A imagem deve ter no máximo 10 MB.");
      }

      const extension =
        file.name.split(".").pop()?.toLowerCase() || "jpg";

      const filePath = `redesigns/${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("redesign-images")
        .upload(filePath, file, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        console.error("Erro no upload:", uploadError);
        throw new Error(
          "Não conseguimos enviar a imagem. Tente novamente."
        );
      }

      const { data: publicUrlData } = supabase.storage
        .from("redesign-images")
        .getPublicUrl(filePath);

      const imageUrl = publicUrlData.publicUrl;

      const { error: insertError } = await supabase
        .from("redesigns")
        .insert({
          case_id: Number(selectedCaseId),
          nome: name,
          email,
          curso: course,
          titulo: title,
          descricao: description,
          motivo: reason,
          imagem_url: imageUrl,
          status: "pending",
        });

      if (insertError) {
        console.error("Erro ao salvar proposta:", insertError);
        throw new Error(
          "Não conseguimos salvar sua proposta. Tente novamente."
        );
      }

      setSent(true);
      form.reset();
    } catch (err) {
      console.error(err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Não conseguimos enviar a proposta. Tente novamente."
        );
      }
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <main className="reimagine-page">
        <section className="document-success">
          <span className="section-number">03</span>

          <h1>Proposta recebida.</h1>

          <p>
            Obrigada por reimaginar esse espaço.
            Sua proposta será analisada antes de ser adicionada
            ao caso correspondente.
          </p>

          <div className="success-actions">
            <button
              className="button-primary"
              onClick={() => setSent(false)}
            >
              Enviar outra proposta
            </button>

            <button
              className="button-secondary"
              onClick={() => navigate("explorar")}
            >
              Voltar ao arquivo
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="reimagine-page">

      <section className="reimagine-hero">
        <span className="section-number">
          03 / REIMAGINAR
        </span>

        <h1>
          Se foi possível desenhar a exclusão,
          <em>
            {" "}também é possível desenhar outras possibilidades.
          </em>
        </h1>

        <p>
          O arquivo do PermaneSER reúne casos que podem ser observados,
          pesquisados e reimaginados. Escolha um deles e pense em como
          aquele espaço poderia permitir outras formas de permanecer.
        </p>

        <button
          className="button-secondary"
          onClick={() => navigate("explorar")}
        >
          Escolher um caso →
        </button>
      </section>

      <section className="reimagine-process">
        <div className="process-heading">
          <span>COMO PARTICIPAR</span>

          <h2>
            Um caso.
            <br />
            Outra possibilidade.
          </h2>
        </div>

        <div className="process-steps">
          <article>
            <span>01</span>

            <h3>Escolha um caso</h3>

            <p>
              Explore o arquivo e encontre um espaço que você
              gostaria de observar com mais atenção.
            </p>
          </article>

          <article>
            <span>02</span>

            <h3>Reimagine</h3>

            <p>
              Faça um desenho, croqui, planta, colagem ou outra
              representação da sua proposta.
            </p>
          </article>

          <article>
            <span>03</span>

            <h3>Envie</h3>

            <p>
              Conte o que você mudou e por quê. A proposta será
              analisada antes de entrar no arquivo.
            </p>
          </article>
        </div>
      </section>

      <section className="reimagine-submit">
        <div className="form-intro">
          <span>ENVIAR PROPOSTA</span>

          <h2>
            Como você
            <br />
            redesenharia?
          </h2>

          <p>
            Você pode participar como estudante, pesquisador,
            arquiteto ou simplesmente como alguém interessado
            em imaginar outra cidade.
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
              Curso / universidade

              <input
                type="text"
                name="course"
                placeholder="Opcional"
              />
            </label>

            <label>
              Caso escolhido

              <select
                name="case"
                defaultValue={caseId || ""}
                required
              >
                <option value="">
                  Selecione um caso
                </option>

                {cases.map((item) => (
                  <option
                    key={item.id}
                    value={String(item.id)}
                  >
                    {item.titulo || `Caso ${item.id}`} —{" "}
                    {item.cidade || "Curitiba"}
                  </option>
                ))}
              </select>

            </label>

          </div>

          <label>
            Título da proposta

            <input
              type="text"
              name="proposal_title"
              placeholder="Dê um nome ao seu redesenho"
              required
            />
          </label>

          <label>
            O que você propõe?

            <textarea
              name="proposal_description"
              placeholder="Explique o que você mudaria no espaço."
              rows={6}
              required
            />
          </label>

          <label>
            Por que essa mudança importa?

            <textarea
              name="proposal_reason"
              placeholder="Que formas de permanência, circulação ou uso sua proposta pretende possibilitar?"
              rows={5}
              required
            />
          </label>

          <label className="upload-box">
            <span>SEU REDESENHO</span>

            <strong>
              Enviar desenho ou imagem
            </strong>

            <small>
              JPG, PNG ou WEBP · até 10 MB
            </small>

            <input
              type="file"
              name="attachment"
              accept="image/png,image/jpeg,image/webp"
              required
            />
          </label>

          <button
            type="submit"
            className="form-submit"
            disabled={sending}
          >
            {sending
              ? "Enviando..."
              : "Enviar proposta →"}
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

export default Reimaginar;