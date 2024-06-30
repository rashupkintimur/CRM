export default function getId(id) {
  const idTitle = document.createElement("h3");
  idTitle.classList.add("client__id");
  idTitle.dataset.id = id;
  idTitle.textContent = id.slice(0, 11);

  return idTitle;
}
