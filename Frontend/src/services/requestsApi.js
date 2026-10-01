const API_URL = import.meta.env.VITE_API_URL

export async function getRequests() {
  const response = await fetch(`${API_URL}/api/requests`)

  if (!response.ok) {
    throw new Error('Failed to fetch client requests.')
  }

  return response.json()
}