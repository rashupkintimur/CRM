export default function showError(typeError) {
  const p = document.createElement("p");
  p.classList.add("modal-error__text");

  switch (typeError) {
    case "surname":
      p.textContent = "Фамилия не введена";
      break;
    case "name":
      p.textContent = "Имя не введено";
      break;
    case "minValue":
      p.textContent =
        "Каждое поле контакта должно быть в длину не менее 11 символов";
      break;
    case "emailError":
      p.textContent = '"Email" поля должны включать символ "@"';
      break;
    case "numberError":
      p.textContent =
        'В поле "Телефон" и "Доп. телефон" должны быть только числовые данные';
      break;
  }

  return p;
}
