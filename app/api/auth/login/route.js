import { validateCredentials, generateToken } from "../../../../lib/auth"

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return Response.json({ error: "Email and password are required" }, { status: 400 })
    }

    const user = validateCredentials(email, password)

    if (!user) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = generateToken(user)

    return Response.json({
      success: true,
      token,
      user: { id: user.id, email: user.email, name: user.name },
    })
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
