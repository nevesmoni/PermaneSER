import React from "react";

interface HomeProps {
  navigate: (page: string) => void;
}

function Home({ navigate }: HomeProps) {
  return (
    <div className="home">

      <section className="hero">

        <div className="hero-content">

          <div className="hero-kicker">
            <span>ARQUITETURA · CIDADE · PERTENCIMENTO</span>
          </div>

          <h1>
            Quem pode
            <br />
            <em>ficar?</em>
          </h1>

          <p className="hero-description">
            Até mesmo sentar, esperar ou descansar pode depender do lugar onde estamos.
          </p>

          <div className="hero-actions">

            <button
              className="hero-button"
              onClick={() => navigate("explorar")}
            >
              Explorar o arquivo
              <span>→</span>
            </button>

            <button
              className="hero-text-button"
              onClick={() => navigate("sobre")}
            >
              Sobre o projeto
              <span>↗</span>
            </button>

          </div>

          <div className="hero-location">
            <span>Curitiba, Brasil</span>
            <span>2026</span>
          </div>

        </div>

        <div className="hero-logo-area">

          <div className="hero-logo-glow"></div>

          <img
            src="/logo-permaneser.png"
            alt="PermaneSER"
            className="hero-logo"
          />

          <div className="hero-logo-caption">
            <span>PERMANESER</span>
            <span>ESPAÇOS PARA PERMANECER.</span>
          </div>

        </div>

      </section>

      <section className="hero-cards">

        <button
          className="hero-card"
          onClick={() => navigate("explorar")}
        >
          <span className="card-number">01</span>

          <div>
            <span className="card-label">EXPLORAR</span>

            <h3>Onde podemos ficar?</h3>

            <p>
              Conheça os lugares que já fazem parte do arquivo.
            </p>
          </div>

          <span className="card-arrow">↗</span>
        </button>

        <button
          className="hero-card"
          onClick={() => navigate("documentar")}
        >
          <span className="card-number">02</span>

          <div>
            <span className="card-label">DOCUMENTAR</span>

            <h3>Tem um lugar para mostrar?</h3>

            <p>
              Registre o que você encontra pela cidade.
            </p>
          </div>

          <span className="card-arrow">↗</span>
        </button>

        <button
          className="hero-card"
          onClick={() => navigate("reimaginar")}
        >
          <span className="card-number">03</span>

          <div>
            <span className="card-label">REIMAGINAR</span>

            <h3>E se fosse diferente?</h3>

            <p>
              Escolha um caso do arquivo e imagine outra possibilidade para ele.
            </p>
          </div>

          <span className="card-arrow">↗</span>
        </button>

      </section>

      <section className="home-intro">

        <div className="section-index">
          01
        </div>

        <div className="home-intro-content">

          <span className="section-label">
            UMA PERGUNTA
          </span>

          <h2>
            A cidade está cheia
            <br />
            de respostas.
          </h2>

          <p>
            Algumas estão nos bancos, nas calçadas, nos muros e nos lugares onde alguém decidiu que não deveríamos ficar.
          </p>

        </div>

      </section>

      <section className="home-feature">

        <div className="feature-image-placeholder">
          <span>ARQUIVO · 001</span>
        </div>

        <div className="feature-content">

          <span className="section-label">
            DO ARQUIVO
          </span>

          <h2>
            O espaço
            <br />
            também fala.
          </h2>

          <p>
            Um banco, uma grade, uma sombra, uma calçada. Pequenas escolhas podem mudar a forma como um corpo ocupa a cidade.
          </p>

          <button
            className="inline-link"
            onClick={() => navigate("explorar")}
          >
            Ver o arquivo →
          </button>

        </div>

      </section>

      <section className="home-end">

        <img
          src="/logo-permaneser.png"
          alt="PermaneSER"
          className="home-end-logo"
        />

        <div className="home-end-text">

          <span>PERMANESER</span>

          <h2>
            A cidade também
            <br />
            pode ser outra.
          </h2>

          <button
            className="hero-button"
            onClick={() => navigate("participe")}
          >
            Fazer parte
            <span>→</span>
          </button>

        </div>

      </section>

    </div>
  );
}

export default Home;