import photo from "../../../../images/placeholder.jpg";
import "./About.css";

export function About() {
  return (
    <section className="about">
      <img src={photo} alt="" className="about__author-photo" />
      <div className="about__content">
        <h2 className="about__title">Sobre o autor</h2>
        <p className="about__description">
          Esse bloco descreve o autor do projeto. Aqui você deve indicar seu
          nome, o que você faz e quais tecnologias de desenvolvedor você
          conhece.
        </p>
        <p className="about__description">
          Você também pode falar sobre sua experiência com o Practicum, o que
          aprendeu lá e como pode ajudar clientes em potencial.
        </p>
      </div>
    </section>
  );
}
