import getFullName from "./clientElements/clientFullName.js";
import getId from "./clientElements/clientId.js";
import getDate from "./clientElements/clientDate.js";
import getButtons from "./clientElements/clientButtons/clientButtons.js";
import getContacts from "./clientElements/clientContacts.js";

export default function getClient(userData) {
  const wrapperClient = document.createElement("div");
  wrapperClient.classList.add("client");

  wrapperClient.append(getId(userData.id));
  wrapperClient.append(
    getFullName(userData.name, userData.surname, userData.lastName)
  );
  wrapperClient.append(getDate(userData.createdAt, true));
  wrapperClient.append(getDate(userData.updatedAt));
  wrapperClient.append(getContacts(userData.contacts));
  wrapperClient.append(getButtons());

  return wrapperClient;
}
