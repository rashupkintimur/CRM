import getDateClient from "../../auxiliaryFunctions/getDateClient.js";

export default function getDate(date, isCreated = false) {
  const clientDate = document.createElement("h3");
  const span = document.createElement("span");
  const dateObj = getDateClient(date);

  clientDate.append(`${dateObj.day}.${dateObj.month}.${dateObj.year}`);
  span.append(`${dateObj.hour}:${dateObj.minute}`);
  clientDate.append(span);

  if (isCreated) clientDate.classList.add("client__createdAt");
  else clientDate.classList.add("client__updatedAt");

  return clientDate;
}
