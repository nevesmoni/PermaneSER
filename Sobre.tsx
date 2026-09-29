import React from "react";

interface SobreProps {
  navigate: (page: string) => void;
}

function Sobre({ navigate }: SobreProps) {
  return (
    <div className="about-page">

      <section className="about-hero">

        <div className="about-number">
          05
        </div>

        <div>

          <span className="section-label">
            SOBRE O PROJETO
          </span>

          <h1>
            Uma pergunta
            <br />
            que começou
            <br />
            <em>na cidade.</em>
          </h1>

        </div>

        <p>
          O PermaneSER nasceu da pesquisa sobre arquitetura hostil
          e da vontade de observar como decisões espaciais influenciam
          a forma como ocupamos os lugares públicos.
        </p>

      </section>

      <section className="about-origin">

        <div className="about-origin-label">
          DE ONDE VEIO
        </div>

        <div className="about-origin-content">

          <h2>
            Quem decide
            <br />
            como devemos
            <br />
            ocupar a cidade?
          </h2>

          <p>
            O projeto começou a partir do meu trabalho de pesquisa sobre
            arquitetura hostil e do desenvolvimento de uma palestra TEDx
            sobre o tema.
          </p>

          <p>
            Ao estudar bancos, grades, pedras, superfícies inclinadas e
            outros elementos urbanos, uma questão ficou cada vez mais
            presente: quando um espaço dificulta que alguém sente,
            descanse ou permaneça, isso também faz parte do projeto daquele
            lugar.
          </p>

          <p>
            O PermaneSER nasceu para documentar essas situações, reunir
            diferentes olhares e imaginar outras possibilidades para os
            espaços que compartilhamos.
          </p>

        </div>

      </section>

      <section className="about-ted">

        <div className="ted-image">
          <span>TEDx · ARQUIVO</span>
        </div>

        <div className="ted-content">

          <span className="section-label">
            PESQUISA
          </span>

          <h2>
            Da arquitetura
            <br />
            hostil ao arquivo.
          </h2>

          <p>
            A pesquisa que deu origem ao projeto também explorou a relação
            entre urbanismo, matemática e planejamento. Geometria, estatística,
            modelagem e dados ajudam a definir como infraestrutura e serviços
            são distribuídos pela cidade.
          </p>

          <p>
            Se a precisão pode ser usada para organizar o espaço,
            ela também pode ser usada para pensar em espaços mais acessíveis,
            acolhedores e inclusivos.
          </p>

        </div>

      </section>

      <section className="about-principles">

        <span className="section-label">
          PRINCÍPIOS
        </span>

        <div className="principles-grid">

          <div>
            <span>01</span>
            <h3>Observar</h3>
            <p>
              Antes de propor mudanças, olhar atentamente para o espaço.
            </p>
          </div>

          <div>
            <span>02</span>
            <h3>Documentar</h3>
            <p>
              Transformar observações individuais em um arquivo coletivo.
            </p>
          </div>

          <div>
            <span>03</span>
            <h3>Reimaginar</h3>
            <p>
              Criar novas possibilidades para os lugares que compartilhamos.
            </p>
          </div>

        </div>

      </section>

      <section className="about-end">

        <h2>
          A cidade não é
          <br />
          <em>imutável.</em>
        </h2>

        <button
          className="hero-button"
          onClick={() => navigate("explorar")}
        >
          Explorar o arquivo
          <span>→</span>
        </button>

      </section>

    </div>
  );
}

export default Sobre;