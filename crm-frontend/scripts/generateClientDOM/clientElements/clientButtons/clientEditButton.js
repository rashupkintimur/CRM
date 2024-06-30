export default function getEditButton() {
  const button = document.createElement("button");
  const img = document.createElement("img");
  img.src = "./img/edit.svg";
  button.classList.add("client__btn", "client__btn--edit");
  button.textContent = "Изменить";
  button.prepend(img);

  return button;
}
