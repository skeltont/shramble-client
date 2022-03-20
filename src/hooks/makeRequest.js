const WEBAPP_URL = "http://localhost:4000";

export async function makePostRequest(path, body) {
  try {
    let request = await fetch(WEBAPP_URL + path, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('shrambleToken')
      },
      body: JSON.stringify(body)
    })

    return {
      status: request.status,
      ok: request.ok,
      data: await request.json()
    }
  } catch (error) {
    console.error(error)

    return error
  }
}

export async function makeGetRequest(path) {
  try {
    let request = await fetch(WEBAPP_URL + path, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('shrambleToken')
      }
    })
    
    return {
      status: request.status,
      ok: request.ok,
      data: await request.json()
    }
  } catch (error) {
    console.error(error)

    return error
  }
}
