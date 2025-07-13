export function PopupSuccess({ onOpenPopup }) {
  function handlePasskeyRegister() {}

  function handleGoToSignIn() {
    onOpenPopup({ type: "signin" });
  }
  return (
    <>
      <h2 className="popup__title">Cadastro concluído com sucesso!</h2>
      <h3 class="popup__passkey-title">Deseja ativar o Passkey?</h3>
      <p class="popup__passkey-description">
        Com o Passkey, você pode fazer login com segurança, sem precisar de
        senha.
      </p>
      <button
        onClick={handlePasskeyRegister}
        type="button"
        className="popup__button popup__button_passkey"
      >
        Registrar Passkey
      </button>
      <p className="popup__goto-text">
        ou{" "}
        <button
          onClick={handleGoToSignIn}
          type="button"
          className="popup__button popup__button_goto popup__button_goto_signin"
        >
          Entrar com senha
        </button>
      </p>
    </>
  );
}
