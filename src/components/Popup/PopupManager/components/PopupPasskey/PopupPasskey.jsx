import { startRegistration } from "@simplewebauthn/browser";

export function PopupPasskey({ onOpenPopup }) {
  async function handlePasskeyRegister() {
    const resp = await fetch("/generate-registration-options");
    const optionsJSON = await resp.json();
    let attResp;
    try {
      attResp = await startRegistration({ optionsJSON });
    } catch (err) {
      if (err.name === "InvalidStateError") {
        elemError.innerText =
          "Error: Authenticator was probably already registered by user";
      } else {
        elemError.innerText = err;
      }
      throw err;
    }
    const verificationResp = await fetch("/verify-registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attResp),
    });

    const verificationJSON = await verificationResp.json();

    if (verificationJSON && verificationJSON.verified) {
      console.log("Success!");
    } else {
      console.log(
        `Oh no, something went wrong! Response: ${JSON.stringify(
          verificationJSON
        )}`
      );
    }
  }

  return (
    <>
      <h2 class="popup__title">Deseja ativar o Passkey?</h2>
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
    </>
  );
}
