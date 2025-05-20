import "./SavedNewsHeader.css";

export function SavedNewsHeader({ user, newsData }) {
  return (
    <section className="saved-news-header">
      <p className="saved-news-header__text">Artigos salvos</p>
      <h2 className="saved-news-header__title">{`Elise, você tem 5 artigos salvos`}</h2>
      <p className="saved-news-header__keywords">
        Por palavras-chave: Natureza, Yellowstone, e 2 outras
      </p>
    </section>
  );
}
