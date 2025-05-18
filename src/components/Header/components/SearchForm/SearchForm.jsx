import { useState } from "react";
import "./SearchForm.css";

export function SearchForm({ onSearchRequest }) {
  const [inputValue, setInputValue] = useState("");

  function handleInputChange(evt) {
    setInputValue(evt.target.value);
  }

  function handleSearchSubmit(evt) {
    evt.preventDefault();
    onSearchRequest(inputValue);
  }

  return (
    <section className="search">
      <h2 className="search__title">O que está acontecendo no mundo?</h2>
      <p className="search__description">
        Encontre as últimas notícias sobre qualquer tema e salve elas em sua
        conta pessoal
      </p>
      <form
        onSubmit={handleSearchSubmit}
        name="search"
        className="search__form"
      >
        <fieldset className="search__fieldset">
          <label className="search__form-field">
            <input
              onChange={handleInputChange}
              type="text"
              className="search__input"
              placeholder="Yellowstone"
              value={inputValue}
            />
          </label>
          <button type="submit" className="search__form-button">
            Procurar
          </button>
        </fieldset>
      </form>
    </section>
  );
}
