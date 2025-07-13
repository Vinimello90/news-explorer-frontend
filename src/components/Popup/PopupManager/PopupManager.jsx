import { useContext } from "react";
import { PopupContext } from "../../../contexts/PopupContext";
import { PopupWithForm } from "./components/PopupWithForm/PopupWithForm";
import { PopupSuccess } from "./components/PopupSuccess/PopupSuccess";
import { PopupConfirmation } from "./components/PopupConfirmation/PopupConfirmation";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import { PopupPasskey } from "./components/PopupPasskey/PopupPasskey";

export function PopupManager() {
  const { popup, onOpenPopup } = useContext(PopupContext);
  const { onRemoveArticle } = useContext(CurrentUserContext);

  const popupComponents = {
    signin: <PopupWithForm popup={popup.type} onOpenPopup={onOpenPopup} />,
    signinPasskey: (
      <PopupWithForm popup={popup.type} onOpenPopup={onOpenPopup} />
    ),
    signup: <PopupWithForm popup={popup.type} onOpenPopup={onOpenPopup} />,
    success: <PopupSuccess onOpenPopup={onOpenPopup} />,
    confirmation: (
      <PopupConfirmation
        article={popup.savedArticle}
        onRemoveArticle={onRemoveArticle}
      />
    ),
    registerPasskey: (
      <PopupPasskey
        article={popup.savedArticle}
        onRemoveArticle={onRemoveArticle}
      />
    ),
  };

  return popupComponents[popup.type];
}
