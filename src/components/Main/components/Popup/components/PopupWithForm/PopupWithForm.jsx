export function PopupWithForm({ signIn }) {
  return (
    <form action="" className="popup__form">
      <fieldset className="popup__fieldset">
        <label className="popup__field">
          <input type="email" name="email" className="popup__input" />
        </label>
        <label className="popup__field">
          <input type="password" name="password" className="popup__input" />
        </label>
        <button type="submit" className="popup__submit-button">
          Entrar
        </button>
      </fieldset>
    </form>
  );
}
