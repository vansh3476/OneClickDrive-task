import { getListingById, updateListing } from "../../../../lib/listings"
import { verifyToken } from "../../../../lib/auth"

export async function GET(request, { params }) {
  try {
    const { id } = params
    const listing = getListingById(id)

    if (!listing) {
      return Response.json({ error: "Listing not found" }, { status: 404 })
    }

    return Response.json({ success: true, listing })
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
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

    const { id } = params
    const body = await request.json()

    const updatedListing = updateListing(id, body, user.email)

    if (!updatedListing) {
      return Response.json({ error: "Listing not found" }, { status: 404 })
    }

    return Response.json({ success: true, listing: updatedListing })
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
