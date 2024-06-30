export default function getContacts(contacts) {
  const contactsWrapper = document.createElement("div");
  contactsWrapper.classList.add("client__contacts");

  const contactsList = document.createElement("ul");
  contactsList.classList.add("client__list", "client-list");

  contacts.forEach((contact) => {
    const li = document.createElement("li");
    li.classList.add("client-list__item");

    const button = document.createElement("button");
    const a = document.createElement("a");
    const content = `${contact.type}: ${contact.value}`;

    switch (contact.type) {
      case "Телефон":
      case "Доп. телефон":
        a.dataset.type = contact.type;
        a.href = `tel:${contact.value}`;
        break;
      case "Email":
        a.dataset.type = contact.type;
        a.href = `mailto:${contact.value}`;
        break;
      default:
        a.dataset.type = contact.type;
        a.href = contact.value;
        break;
    }

    const img = document.createElement("img");

    switch (contact.type) {
      case "Телефон":
      case "Доп. телефон":
        img.src = "./img/phone.svg";
        break;
      case "Email":
        img.src = "./img/mail.svg";
        break;
      case "VK":
        img.src = "./img/vk.svg";
        break;
      case "Facebook":
        img.src = "./img/fb.svg";
        break;
    }

    a.append(img);
    button.append(a);
    li.append(button);

    tippy(button, {
      content,
    });

    contactsList.append(li);
  });

  contactsWrapper.append(contactsList);

  return contactsWrapper;
}
