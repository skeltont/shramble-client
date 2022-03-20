const WEBAPP_URL = "http://localhost:4000";

export async function makePostRequest(path, body, callback) {
  try {
    let request = await fetch(WEBAPP_URL + path, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('shrambleToken')
      },
      body: JSON.stringify(body)
    })

    const { ok, status } = request

    if (!ok) throw request

    return {ok, status, data: await request.json()}
  } catch (error) {
    console.error(error)

    return error
  }
}
// export function makePostRequest(path, body, callback) {
//   fetch(WEBAPP_URL + path, {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': sessionStorage.getItem('shrambleToken')
//       },
//       body: JSON.stringify(body)
//   }).then((res) => res.json())
//     .then((data) => callback(data))
//     .catch((error) => console.log(error));
// }

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