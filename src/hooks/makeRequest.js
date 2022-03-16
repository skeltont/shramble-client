const WEBAPP_URL = "http://localhost:4000";

export function makePostRequest(path, body, callback) {
  fetch(WEBAPP_URL + path, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('shrambleToken')
      },
      body: JSON.stringify(body)
  }).then((res) => res.json())
    .then((data) => callback(data))
    .catch((error) => console.log(error));
}

export function makeGetRequest(path, callback) {
  fetch(WEBAPP_URL + path, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('shrambleToken')
    }
  }).then((res) => res.json())
    .then((data) => callback(data))
    .catch((error) => console.log(error));
}