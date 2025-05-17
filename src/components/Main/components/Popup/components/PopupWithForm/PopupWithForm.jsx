export function PopupWithForm({ signIn }) {
  return (
    <form action="" name="signin" className="popup__form">
      <fieldset className="popup__fieldset">
        <label className="popup__field">
          E-mail
          <input
            type="email"
            name="email"
            className="popup__input"
            placeholder="Insira e-mail"
          />
          <span className="popup__form-error">E-mail inválido</span>
        </label>
        <label className="popup__field">
          Senha
          <input
            type="password"
            name="password"
            className="popup__input"
            placeholder="Insira a senha"
          />
          <span className="popup__form-error">Senha inválida</span>
        </label>
        <span className="popup__form-error popup__form-error_submit">
          Usuário ou senha inválido, tente novamente
        </span>
        <button type="submit" className="popup__button popup__button_submit">
          Entrar
        </button>
      </fieldset>
    </form>
  );
}
