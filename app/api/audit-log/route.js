import { getAuditLog } from "../../../lib/listings"
import { verifyToken } from "../../../lib/auth"

export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return Response.json({ error: "No token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = verifyToken(token)

    if (!user) {
      return Response.json({ error: "Invalid token" }, { status: 401 })
    }

    const auditLog = getAuditLog()

    return Response.json({ success: true, auditLog })
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
