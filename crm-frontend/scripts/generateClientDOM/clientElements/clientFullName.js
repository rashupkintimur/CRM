export default function getFullName(name, surname, lastName) {
  const fullName = document.createElement("h3");
  fullName.classList.add("client__fullName");
  fullName.textContent = `${surname} ${name} ${lastName}`;

  return fullName;
}
