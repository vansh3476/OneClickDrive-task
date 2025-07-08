const listings = [
  {
    id: 1,
    title: "2023 Tesla Model 3",
    description: "Electric sedan with autopilot features and premium interior",
    price: 89,
    location: "San Francisco, CA",
    status: "pending",
    submittedBy: "john@example.com",
    submittedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    title: "2022 BMW X5",
    description: "Luxury SUV perfect for family trips and business travel",
    price: 120,
    location: "Los Angeles, CA",
    status: "approved",
    submittedBy: "sarah@example.com",
    submittedAt: "2024-01-14T14:20:00Z",
  },
  {
    id: 3,
    title: "2021 Honda Civic",
    description: "Reliable and fuel-efficient compact car for city driving",
    price: 45,
    location: "New York, NY",
    status: "rejected",
    submittedBy: "mike@example.com",
    submittedAt: "2024-01-13T09:15:00Z",
  },
  {
    id: 4,
    title: "2023 Ford Mustang",
    description: "Sports car with powerful V8 engine and racing heritage",
    price: 95,
    location: "Miami, FL",
    status: "pending",
    submittedBy: "alex@example.com",
    submittedAt: "2024-01-12T16:45:00Z",
  },
  {
    id: 5,
    title: "2022 Toyota Prius",
    description: "Hybrid vehicle with excellent fuel economy and eco-friendly design",
    price: 55,
    location: "Seattle, WA",
    status: "approved",
    submittedBy: "emma@example.com",
    submittedAt: "2024-01-11T11:30:00Z",
  },
  {
    id: 6,
    title: "2023 Chevrolet Bolt EV",
    description: "Compact electric hatchback with great range and technology",
    price: 65,
    location: "Austin, TX",
    status: "pending",
    submittedBy: "daniel@example.com",
    submittedAt: "2024-01-10T10:30:00Z",
  },
  {
    id: 7,
    title: "2021 Audi Q7",
    description: "Premium SUV with quattro AWD and advanced driver assistance",
    price: 130,
    location: "Denver, CO",
    status: "approved",
    submittedBy: "olivia@example.com",
    submittedAt: "2024-01-09T14:20:00Z",
  },
  {
    id: 8,
    title: "2020 Mazda 3",
    description: "Sporty compact car with responsive handling and stylish design",
    price: 42,
    location: "Boston, MA",
    status: "rejected",
    submittedBy: "matt@example.com",
    submittedAt: "2024-01-08T09:15:00Z",
  },
  {
    id: 9,
    title: "2023 Dodge Charger",
    description: "Full-size performance sedan with bold styling and power",
    price: 99,
    location: "Atlanta, GA",
    status: "pending",
    submittedBy: "nina@example.com",
    submittedAt: "2024-01-07T16:45:00Z",
  },
  {
    id: 10,
    title: "2022 Hyundai Ioniq 5",
    description: "Modern electric crossover with futuristic design and rapid charging",
    price: 60,
    location: "Portland, OR",
    status: "approved",
    submittedBy: "lucas@example.com",
    submittedAt: "2024-01-06T11:30:00Z",
  },
  {
    id: 11,
    title: "2024 Kia EV6",
    description: "Next-gen electric crossover with long range and AWD",
    price: 75,
    location: "Chicago, IL",
    status: "pending",
    submittedBy: "ella@example.com",
    submittedAt: "2024-01-05T10:30:00Z",
  },
  {
    id: 12,
    title: "2023 Lexus RX 350",
    description: "Luxury crossover with smooth ride and premium features",
    price: 115,
    location: "Phoenix, AZ",
    status: "approved",
    submittedBy: "ryan@example.com",
    submittedAt: "2024-01-04T14:20:00Z",
  },
  {
    id: 13,
    title: "2021 Subaru Impreza",
    description: "Compact AWD sedan great for all weather conditions",
    price: 40,
    location: "Salt Lake City, UT",
    status: "rejected",
    submittedBy: "tina@example.com",
    submittedAt: "2024-01-03T09:15:00Z",
  },
  {
    id: 14,
    title: "2023 Nissan Z",
    description: "Reborn sports coupe with turbocharged engine and retro styling",
    price: 85,
    location: "San Diego, CA",
    status: "pending",
    submittedBy: "leo@example.com",
    submittedAt: "2024-01-02T16:45:00Z",
  },
  {
    id: 15,
    title: "2022 Volvo XC40 Recharge",
    description: "Compact electric SUV combining Scandinavian design and power",
    price: 78,
    location: "Minneapolis, MN",
    status: "approved",
    submittedBy: "megan@example.com",
    submittedAt: "2024-01-01T11:30:00Z",
  }
]

const auditLog = []

export function getAllListings(page = 1, limit = 10, status = null) {
  let filteredListings = [...listings]

  if (status && status !== "all") {
    filteredListings = listings.filter((listing) => listing.status === status)
  }

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  return {
    listings: filteredListings.slice(startIndex, endIndex),
    total: filteredListings.length,
    page,
    totalPages: Math.ceil(filteredListings.length / limit),
  }
}

export function getListingById(id) {
  return listings.find((listing) => listing.id === Number.parseInt(id))
}

export function updateListingStatus(id, status, adminEmail) {
  const listingIndex = listings.findIndex((listing) => listing.id === Number.parseInt(id))
  if (listingIndex !== -1) {
    const oldStatus = listings[listingIndex].status
    listings[listingIndex].status = status
    
    auditLog.push({
      id: auditLog.length + 1,
      listingId: Number.parseInt(id),
      action: `Status changed from ${oldStatus} to ${status}`,
      adminEmail,
      timestamp: new Date().toISOString(),
    })

    return listings[listingIndex]
  }
  return null
}

export function updateListing(id, updatedData, adminEmail) {
  const listingIndex = listings.findIndex((listing) => listing.id === Number.parseInt(id))
  if (listingIndex !== -1) {
    const oldListing = { ...listings[listingIndex] }
    listings[listingIndex] = { ...listings[listingIndex], ...updatedData }

    auditLog.push({
      id: auditLog.length + 1,
      listingId: Number.parseInt(id),
      action: "Listing details updated",
      adminEmail,
      timestamp: new Date().toISOString(),
      changes: Object.keys(updatedData).join(", "),
    })

    return listings[listingIndex]
  }
  return null
}

export function getAuditLog() {
  return auditLog.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
}
