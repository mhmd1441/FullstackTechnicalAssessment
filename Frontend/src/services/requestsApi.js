const API_URL = import.meta.env.VITE_API_URL

async function handleResponse(response) {
  if (response.ok) {
    return response.json()
  }

  let message = 'Something went wrong.'

  try {
    const error = await response.json()
    message = error.message || message
  } catch {
    // default 
  }

  throw new Error(message)
}

export async function getRequests(
  page = 1,
  pageSize = 10,
  status = '',
  signal
) {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  })

  if (status) {
    params.append('status', status)
  }

  const response = await fetch(
  `${API_URL}/api/requests?${params.toString()}`,
  { signal }
)

  return handleResponse(response)
}

export async function createRequest(request) {
  const response = await fetch(`${API_URL}/api/requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  return handleResponse(response)
}

export async function updateRequestStatus(id, status) {
  const response = await fetch(`${API_URL}/api/requests/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  })

  return handleResponse(response)
}