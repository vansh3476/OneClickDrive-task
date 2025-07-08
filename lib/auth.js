
export const mockUsers = [
  {
    id: 1,
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
  },
]

export function validateCredentials(email, password) {
  return mockUsers.find((user) => user.email === email && user.password === password)
}

export function generateToken(user) {
  return Buffer.from(
    JSON.stringify({
      id: user.id,
      email: user.email,
      timestamp: Date.now(),
    }),
  ).toString("base64")
}

export function verifyToken(token) {
  try {
    const decoded = JSON.parse(Buffer.from(token, "base64").toString())
    const user = mockUsers.find((user) => user.id === decoded.id)

    const isValid = user && Date.now() - decoded.timestamp < 24 * 60 * 60 * 1000

    return isValid ? user : null
  } catch {
    return null
  }
}
