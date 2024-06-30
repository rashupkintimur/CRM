export default function resetModal(modal) {
  const inputs = modal.querySelectorAll(".modal__input");
  const contacts = modal.querySelectorAll(".modal-div-contact");

  inputs.forEach((input) => {
    input.value = "";
  });

  contacts.forEach((contact) => {
    contact.remove();
  });

  modal.querySelector(".modal-error").innerHTML = "";

  modal.querySelector(".modal-contacts").style.paddingTop = "";
}
