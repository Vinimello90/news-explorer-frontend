import "./About.css";
import photo from "../../../../images/profile.jpg";

export function About() {
  return (
    <section className="about">
      <img src={photo} alt="" className="about__author-photo" />
      <div className="about__content">
        <h2 className="about__title">Sobre o autor</h2>
        <p className="about__description">
          Sou Vinicius Barretto Mello, tenho 34 anos e venho de uma trajetória
          como designer gráfico. Atualmente, estou focado em desenvolvimento
          fullstack, atuando com HTML, CSS, metodologia BEM, JavaScript, POO,
          React e consumo de APIs REST no frontend; e com Node.js, Express,
          MongoDB, Mongoose e desenvolvimento de APIs RESTful no backend. Também
          utilizo Git e GitHub para controle de versão.
        </p>
        <p className="about__description">
          Durante minha jornada na TripleTen, este projeto foi essencial para
          consolidar meus conhecimentos e aprofundar meu entendimento sobre
          estrutura de código e experiência do usuário.
        </p>
      </div>
    </section>
  );
}
