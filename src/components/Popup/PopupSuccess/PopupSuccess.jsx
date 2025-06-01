export function PopupSuccess({ han }) {
  return (
    <>
      <h2 className="popup__title">Cadastro concluído com sucesso!</h2>
      <button
        onClick={handleGoToSignIn}
        type="button"
        className="popup__button popup__button_goto popup__button_goto_signin"
      >
        Entrar
      </button>
    </>
  );
}
