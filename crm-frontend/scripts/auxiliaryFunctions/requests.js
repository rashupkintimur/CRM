const url = "http://localhost:3000/api/clients/";

export function getRequest({ search } = {}) {
  if (!search) return fetch(url);

  return fetch(url + `?search=${search}`);
}

export function postRequest(data) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function deleteRequest(id) {
  fetch(url + id, {
    method: "DELETE",
  });
}

export function patchRequest(id, data) {
  return fetch(url + id, {
    method: "PATCH",
    "Content-Type": "application/json",
    body: JSON.stringify(data),
  });
}
