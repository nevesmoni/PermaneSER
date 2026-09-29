import React from "react";

interface ParticipeProps {
  navigate: (page: string) => void;
}

function Participe({ navigate }: ParticipeProps) {
  return (
    <div className="participate-page">

      <section className="participate-hero">

        <div className="participate-number">
          06
        </div>

        <div>

          <span className="section-label">
            PARTICIPE
          </span>

          <h1>
            O arquivo
            <br />
            também pode
            <br />
            ser <em>seu.</em>
          </h1>

        </div>

        <p>
          O PermaneSER foi pensado para ser construído por diferentes
          pessoas. Você pode documentar, reimaginar, pesquisar ou ajudar
          a levar o projeto para outros espaços.
        </p>

      </section>

      <section className="participation-options">

        <button
          className="participation-card"
          onClick={() => navigate("documentar")}
        >

          <span>01</span>

          <div>
            <span className="section-label">
              DOCUMENTAR
            </span>

            <h2>
              Encontrou
              <br />
              um caso?
            </h2>

            <p>
              Registre um espaço da sua cidade e ajude a ampliar o arquivo.
            </p>

            <strong>
              Documentar →
            </strong>
          </div>

        </button>

        <button
          className="participation-card"
          onClick={() => navigate("reimaginar")}
        >

          <span>02</span>

          <div>
            <span className="section-label">
              REIMAGINAR
            </span>

            <h2>
              Quer desenhar
              <br />
              outra possibilidade?
            </h2>

            <p>
              Escolha um caso documentado e desenvolva uma proposta.
            </p>

            <strong>
              Ver casos →
            </strong>
          </div>

        </button>

        <div className="participation-card">

          <span>03</span>

          <div>
            <span className="section-label">
              UNIVERSIDADES
            </span>

            <h2>
              Levar o projeto
              <br />
              para a academia.
            </h2>

            <p>
              Professores, estudantes, disciplinas e coletivos podem usar
              o arquivo como ponto de partida para pesquisas e oficinas.
            </p>

            <button
              className="card-inline-button"
              onClick={() => navigate("contato")}
            >
              Falar sobre uma colaboração →
            </button>
          </div>

        </div>

      </section>

      <section className="participate-collaboration">

        <div>

          <span className="section-label">
            ARQUITETOS VOLUNTÁRIOS
          </span>

          <h2>
            Diferentes pessoas
            <br />
            podem imaginar
            <br />
            diferentes cidades.
          </h2>

        </div>

        <div>

          <p>
            A proposta de reimaginação não precisa ser um projeto executivo.
            Pode ser um croqui, uma planta, uma colagem, um estudo ou outra
            forma de representar uma possibilidade espacial.
          </p>

          <p>
            O objetivo é colocar o caso documentado em discussão e mostrar
            que o espaço não precisa ser pensado de uma única maneira.
          </p>

          <button
            className="hero-button"
            onClick={() => navigate("contato")}
          >
            Quero colaborar
            <span>→</span>
          </button>

        </div>

      </section>

      <section className="participate-final">

        <img
          src="/logo-permaneser.png"
          alt="PermaneSER"
          className="participate-logo"
        />

        <h2>
          Documentar.
          <br />
          Reimaginar.
          <br />
          Permanecer.
        </h2>

      </section>

    </div>
  );
}

export default Participe;