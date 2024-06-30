import openAndCloseModal from "./auxiliaryFunctions/openAndCloseModal.js";
import getClient from "./generateClientDOM/generateClient.js";
import * as requests from "./auxiliaryFunctions/requests.js";
import getDataModal from "./auxiliaryFunctions/getDataModal.js";
import setEditModal from "./auxiliaryFunctions/setEditModalData.js";
import resetModal from "./auxiliaryFunctions/resetModal.js";
import getContact from "./auxiliaryFunctions/getContact.js";
import getSortedClients from "./auxiliaryFunctions/sortClients.js";
import showError from "./auxiliaryFunctions/showError.js";

const wrapper = document.querySelector(".wrapper");
const clientsList = document.querySelector(".clients__list");
const searchInput = document.querySelector(".header__search");
const modalAdd = document.querySelector(".modal--add");
const modalEdit = document.querySelector(".modal--edit");
const modalDelete = document.querySelector(".modal--delete");
let modal = null;
let client = null;

document.addEventListener("DOMContentLoaded", async function () {
  const clients = await (await requests.getRequest()).json();

  if (!clients.length) return;

  clients.forEach((client) => {
    clientsList.append(getClient(client));
  });
});

searchInput.addEventListener("input", async function () {
  const clients = await (
    await requests.getRequest({ search: this.value })
  ).json();

  clientsList.querySelectorAll(".client").forEach((client) => {
    client.remove();
  });

  if (!clients.length) return;

  clients.forEach((client) => {
    clientsList.append(getClient(client));
  });
});

document.addEventListener("click", async function (event) {
  const eventTarget = event.target;

  if (eventTarget.closest(".content__btn")) {
    modal = modalAdd;
    openAndCloseModal(wrapper, modal);
    return;
  }

  if (
    eventTarget.closest(".modal__exit") ||
    eventTarget.closest(".modal__second-action-btn--cancel")
  ) {
    if (modal !== modalDelete) resetModal(modal);
    openAndCloseModal(wrapper, modal);
    return;
  }

  if (eventTarget.closest(".modal__action-btn--add")) {
    let errorText = null;
    const errorBlock = modal.querySelector(".modal-error");

    if (
      !(
        modal.querySelector(".modal__input--surname").value &&
        modal.querySelector(".modal__input--name").value
      )
    ) {
      if (!modal.querySelector(".modal__input--surname").value) {
        errorText = showError("surname");
        errorBlock.innerHTML = "";
      } else if (!modal.querySelector(".modal__input--name").value) {
        errorText = showError("name");
        errorBlock.innerHTML = "";
      }
      errorBlock.append(errorText);
      return;
    }

    const allContacts = modal.querySelectorAll(".modal-div-contact");
    let isError = false;

    allContacts.forEach((contact) => {
      if (
        contact.querySelector(".modal-div-contact__input").value.length < 11
      ) {
        errorText = showError("minValue");
        errorBlock.innerHTML = "";
        errorBlock.append(errorText);
        isError = true;
        return;
      }

      if (
        (contact.querySelector(".modal-div-contact__input").name ===
          "Телефон" ||
          contact.querySelector(".modal-div-contact__input").name ===
            "Доп. телефон") &&
        !Number(contact.querySelector(".modal-div-contact__input").value)
      ) {
        errorText = showError("numberError");
        errorBlock.innerHTML = "";
        errorBlock.append(errorText);
        isError = true;
        return;
      }

      if (
        contact.querySelector(".modal-div-contact__input").name === "Email" &&
        !contact.querySelector(".modal-div-contact__input").value.includes("@")
      ) {
        errorText = showError("emailError");
        errorBlock.innerHTML = "";
        errorBlock.append(errorText);
        isError = true;
        return;
      }
    });

    if (isError) return;

    const infoUser = getDataModal(modal);
    const resultClient = await (await requests.postRequest(infoUser)).json();
    clientsList.append(getClient(resultClient));
    resetModal(modal);
    openAndCloseModal(wrapper, modal);
    return;
  }

  if (eventTarget.closest(".client__btn--delete")) {
    client = eventTarget.closest(".client");
    modal = modalDelete;
    openAndCloseModal(wrapper, modal);
    return;
  }

  if (eventTarget.closest(".modal__action-btn--delete")) {
    requests.deleteRequest(client.querySelector(".client__id").dataset.id);
    client.remove();
    openAndCloseModal(wrapper, modal);
    return;
  }

  if (eventTarget.closest(".client__btn--edit")) {
    client = eventTarget.closest(".client");
    modal = modalEdit;
    setEditModal(client, modal);
    openAndCloseModal(wrapper, modal);
    return;
  }

  if (eventTarget.closest(".modal__action-btn--edit")) {
    const userID = modal
      .querySelector(".modal__title span")
      .textContent.slice(4);
    const infoUser = getDataModal(modal);
    const patchedInfo = await (
      await requests.patchRequest(userID, infoUser)
    ).json();
    const updatedClient = getClient(patchedInfo);
    client.innerHTML = updatedClient.innerHTML;
    resetModal(modal);
    openAndCloseModal(wrapper, modal);
    return;
  }

  if (eventTarget.closest(".modal__second-action-btn--delete")) {
    resetModal(modal);
    openAndCloseModal(wrapper, modal);
    modal = modalDelete;
    openAndCloseModal(wrapper, modal);
    return;
  }

  if (eventTarget.closest(".contacts__btn")) {
    getContact(modal);

    if (modal.querySelectorAll(".modal-div-contact").length >= 10) {
      modal.querySelector(".contacts__btn").style.display = "none";
      return;
    }
    return;
  }

  if (eventTarget.closest(".clients__titles-title[data-type]")) {
    const clientsTitesTitleSelector = eventTarget.closest(
      ".clients__titles-title[data-type]"
    );

    document
      .querySelectorAll(".clients__titles-title")
      .forEach((titlesTitle) => {
        titlesTitle.classList.remove("--active");
      });

    clientsTitesTitleSelector.classList.add("--active");
    const sortedClients = getSortedClients(
      clientsTitesTitleSelector.dataset.type
    );

    if (!sortedClients.length) return;

    document.querySelectorAll(".client").forEach((client) => {
      client.remove();
    });

    sortedClients.forEach((client) => {
      clientsList.append(client);
    });
  }
});
