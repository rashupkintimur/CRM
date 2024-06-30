import getDeleteButton from "./clientDeleteButton.js";
import getEditButton from "./clientEditButton.js";

export default function getButtons() {
  const wrapperButtons = document.createElement("div");
  wrapperButtons.classList.add("client__btns-block");

  wrapperButtons.append(getEditButton());
  wrapperButtons.append(getDeleteButton());

  return wrapperButtons;
}
