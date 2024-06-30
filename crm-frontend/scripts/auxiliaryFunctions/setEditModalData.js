import getContact from "./getContact.js";

export default function setEditModal(client, modal) {
  modal.querySelector(".modal__title span").textContent = `ID: ${
    client.querySelector(".client__id").dataset.id
  }`;

  const fullName = client
    .querySelector(".client__fullName")
    .textContent.split(" ");
  modal.querySelector(".modal__input--surname").value = fullName[0];
  modal.querySelector(".modal__input--name").value = fullName[1];
  modal.querySelector(".modal__input--lastName").value = fullName[2];

  const contactsClients = client.querySelectorAll(".client-list__item");

  contactsClients.forEach((contactClient) => {
    const a = contactClient.querySelector("a");
    getContact(modal, { type: a.dataset.type, value: a.href });
  });
}
