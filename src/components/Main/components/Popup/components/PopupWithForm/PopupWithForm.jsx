export function PopupWithForm({ signIn }) {
  return (
    <form action="" name="signin" className="popup__form">
      <fieldset className="popup__fieldset">
        <label className="popup__field">
          E-mail
          <input type="email" name="email" className="popup__input" />
          <span className="popup__form-error">ronaldo</span>
        </label>
        <label className="popup__field">
          Password
          <input type="password" name="password" className="popup__input" />
          <span className="popup__form-error">ronaldo</span>
        </label>
        <span className="popup__form-error popup__form-error_submit">
          ronaldo
        </span>
        <button type="submit" className="popup__button popup__button_submit">
          Entrar
        </button>
      </fieldset>
    </form>
  );
}
