export default function getDeleteButton() {
  const button = document.createElement("button");
  const img = document.createElement("img");
  img.src = "./img/delete.svg";
  button.classList.add("client__btn", "client__btn--delete");
  button.textContent = "Удалить";
  button.prepend(img);

  return button;
}
