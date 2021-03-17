const API_BASE_URL = `http://${process.env.SVC_HOSTNAME}:${process.env.SVC_PORT}`;

export async function makeReservation(payload) {
  const opts = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  const fetchResponse = await fetch(`${API_BASE_URL}/coordinator/makeReservation`, opts)
  const data = await fetchResponse.json();
  return data;
}

export async function getDisallowedTimeslots(date) {
  const opts = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  };

  const fetchResponse = await fetch(`${API_BASE_URL}/inventory/disallowed/${date}`, opts)
  const data = await fetchResponse.json();
  return data;
}

export async function setInventory(payload) {
  const opts = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  const fetchResponse = await fetch(`${API_BASE_URL}/inventory`, opts)
  const data = await fetchResponse.json();
  return data;
}

export async function getInventoryForDate(date) {
  const opts = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const fetchResponse = await fetch(`${API_BASE_URL}/inventory/list/${date}`, opts)
  const data = await fetchResponse.json();
  return data;
}