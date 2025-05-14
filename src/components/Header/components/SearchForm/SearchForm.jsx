export function SearchForm() {
  return (
    <section className="search">
      <h2 className="search__title">O que está acontecendo no mundo?</h2>
      <p className="search__description">
        Encontre as últimas notícias sobre qualquer tema e salve elas em sua
        conta pessoal
      </p>
      <form name="search" className="search__form">
        <fieldset className="search__fieldset">
          <label className="search__form-field">
            <input type="text" className="search__input" />
          </label>
          <button type="submit" className="search__form-button">
            Procurar
          </button>
        </fieldset>
      </form>
    </section>
  );
}
