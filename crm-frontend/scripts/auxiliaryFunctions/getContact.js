export default function getContact(modal, { type, value } = {}) {
  if (!modal.querySelectorAll(".modal-div-contact").length) {
    modal.querySelector(".modal-contacts").style.paddingTop = "25px";
  }

  const contactWrapper = document.createElement("div");
  contactWrapper.classList.add("modal-div-contact");

  const selectContact = document.createElement("select");
  selectContact.name = "contacts";

  const inputContact = document.createElement("input");
  inputContact.classList.add("modal-div-contact__input");
  inputContact.placeholder = "Введите данные контакта";

  const closeSelect = document.createElement("button");
  closeSelect.classList.add("modal-div-contact__close");

  const closeSelectImg = document.createElement("img");
  closeSelectImg.src = "./img/cancel.svg";

  closeSelect.append(closeSelectImg);

  let optionSelect = null;
  let optionSelectSelected = null;

  for (let i = 0; i < 5; i++) {
    optionSelect = document.createElement("option");
    optionSelect.classList.add("modal-div-contact__option");

    switch (i) {
      case 0:
        optionSelect.value = "Телефон";
        optionSelect.textContent = "Телефон";
        if (type) {
          if (type === optionSelect.value) optionSelectSelected = optionSelect;
        }
        break;
      case 1:
        optionSelect.value = "Доп. телефон";
        optionSelect.textContent = "Доп. телефон";
        if (type) {
          if (type === optionSelect.value) optionSelectSelected = optionSelect;
        }
        break;
      case 2:
        optionSelect.value = "Email";
        optionSelect.textContent = "Email";
        if (type) {
          if (type === optionSelect.value) optionSelectSelected = optionSelect;
        }
        break;
      case 3:
        optionSelect.value = "VK";
        optionSelect.textContent = "Vk";
        if (type) {
          if (type === optionSelect.value) optionSelectSelected = optionSelect;
        }
        break;
      case 4:
        optionSelect.value = "Facebook";
        optionSelect.textContent = "Facebook";
        if (type) {
          if (type === optionSelect.value) optionSelectSelected = optionSelect;
        }
        break;
    }

    selectContact.append(optionSelect);
  }

  if (type && value) {
    optionSelectSelected.selected = true;
    inputContact.name = type;

    if (type === "Телефон") {
      inputContact.value = value.slice(4);
    } else if (type === "Email") {
      inputContact.value = value.slice(7);
    } else {
      inputContact.value = value;
    }
  } else {
    inputContact.name = "Телефон";
  }

  contactWrapper.append(selectContact);
  contactWrapper.append(inputContact);
  contactWrapper.append(closeSelect);

  closeSelect.addEventListener("mousedown", function () {
    contactWrapper.remove();

    if (modal.querySelectorAll(".modal-div-contact").length < 10) {
      modal.querySelector(".contacts__btn").style.display = "";
    }

    if (!modal.querySelectorAll(".modal-div-contact").length) {
      modal.querySelector(".modal-contacts").style.paddingTop = "";
    }
  });

  inputContact.addEventListener("focus", function () {
    closeSelect.style.display = "block";
  });

  inputContact.addEventListener("blur", function () {
    closeSelect.style.display = "";
  });

  modal
    .querySelector(".modal-contacts .modal__container")
    .append(contactWrapper);

  new Choices(selectContact, {
    searchEnabled: false,
    itemSelectText: "",
    position: "bottom",
  });

  selectContact.addEventListener("change", function () {
    inputContact.name = this.querySelector("option").value;
  });
}
