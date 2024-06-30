export default function getSortedClients(type) {
  let clients = document.querySelectorAll(".client");

  switch (type) {
    case "id":
      clients = Array.from(clients).sort((a, b) => {
        return (
          +a.querySelector(".client__id").dataset.id -
          +b.querySelector(".client__id").dataset.id
        );
      });
      break;
    case "fullname":
      clients = Array.from(clients).sort((a, b) => {
        a = getStrWithoutSpace(
          a.querySelector(".client__fullName").textContent
        );
        b = getStrWithoutSpace(
          b.querySelector(".client__fullName").textContent
        );

        if (a > b) return 1;
        else if (a == b) return 0;
        return -1;
      });
      break;
    case "createdAt":
      clients = Array.from(clients).sort((a, b) => {
        return parseDate(a, type) - parseDate(b, type);
      });
      break;
    case "updatedAt":
      clients = Array.from(clients).sort((a, b) => {
        return parseDate(b, type) - parseDate(a, type);
      });
      break;
  }

  return clients;
}

function getStrWithoutSpace(str) {
  return str.replaceAll(" ", "");
}

function parseDate(htmlElement, type) {
  let dateElement = null;

  if (type === "createdAt") {
    dateElement = htmlElement.querySelector(".client__createdAt");
  } else {
    dateElement = htmlElement.querySelector(".client__updatedAt");
  }

  const year = dateElement.textContent.slice(6, 10);
  const month =
    +(dateElement.textContent.slice(3, 5) - 1) < 10
      ? "0" + String(+dateElement.textContent.slice(3, 5))
      : String(+dateElement.textContent.slice(3, 5));
  const date = dateElement.textContent.slice(0, 2);
  const hour = dateElement.textContent.slice(10, 12);
  const minute = dateElement.textContent.slice(13, 15);

  const dateTime = new Date(year, month, date, hour, minute).getTime();

  return dateTime;
}
