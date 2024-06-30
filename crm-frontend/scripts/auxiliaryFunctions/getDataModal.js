export default function getDataModal(modal) {
  const surname =
    modal.querySelector(".modal__input--surname").value[0].toUpperCase() +
    modal.querySelector(".modal__input--surname").value.slice(1).toLowerCase();
  const name =
    modal.querySelector(".modal__input--name").value[0].toUpperCase() +
    modal.querySelector(".modal__input--name").value.slice(1).toLowerCase();

  let lastName = "";

  if (modal.querySelector(".modal__input--lastName").value.length) {
    lastName =
      modal.querySelector(".modal__input--lastName").value[0].toUpperCase() +
      modal
        .querySelector(".modal__input--lastName")
        .value.slice(1)
        .toLowerCase();
  }

  const contacts = modal.querySelectorAll(".modal-div-contact");
  const contactsUser = [];

  contacts.forEach((contact) => {
    const inputContact = contact.querySelector(".modal-div-contact__input");

    if (inputContact.value.length) {
      const type = inputContact.name;
      const value = inputContact.value;

      contactsUser.push({ type, value });
    }
  });

  const infoUser = {
    surname,
    name,
    lastName,
    contacts: contactsUser,
  };

  return infoUser;
}
