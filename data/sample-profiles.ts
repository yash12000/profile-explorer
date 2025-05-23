import type { Profile } from "@/types/profile"

export const sampleProfiles: Profile[] = [
  {
    id: "1",
    name: "John Smith",
    photo: "/placeholder.svg?height=200&width=200",
    description:
      "John is a software engineer with over 10 years of experience in web development. He specializes in React and Node.js applications.",
    address: "123 Tech Lane, San Francisco, CA 94107",
    email: "john.smith@example.com",
    phone: "(415) 555-1234",
    occupation: "Senior Software Engineer",
    birthdate: "April 12, 1985",
    coordinates: {
      lat: 37.7749,
      lng: -122.4194,
    },
  },
  {
    id: "2",
    name: "Emily Johnson",
    photo: "/placeholder.svg?height=200&width=200",
    description:
      "Emily is a UX designer who creates intuitive and beautiful user interfaces. She has worked with startups and large corporations alike.",
    address: "456 Design Ave, New York, NY 10001",
    email: "emily.johnson@example.com",
    phone: "(212) 555-6789",
    occupation: "UX/UI Designer",
    birthdate: "September 23, 1990",
    coordinates: {
      lat: 40.7128,
      lng: -74.006,
    },
  },
  {
    id: "3",
    name: "Michael Chen",
    photo: "/placeholder.svg?height=200&width=200",
    description:
      "Michael is a data scientist with expertise in machine learning and AI. He has published several papers on predictive analytics.",
    address: "789 Data Drive, Boston, MA 02108",
    email: "michael.chen@example.com",
    phone: "(617) 555-4321",
    occupation: "Data Scientist",
    birthdate: "January 15, 1988",
    coordinates: {
      lat: 42.3601,
      lng: -71.0589,
    },
  },
  {
    id: "4",
    name: "Sarah Williams",
    photo: "/placeholder.svg?height=200&width=200",
    description:
      "Sarah is a marketing specialist who has helped numerous companies increase their online presence and customer engagement.",
    address: "101 Market Street, Chicago, IL 60601",
    email: "sarah.williams@example.com",
    phone: "(312) 555-8765",
    occupation: "Marketing Director",
    birthdate: "July 8, 1983",
    coordinates: {
      lat: 41.8781,
      lng: -87.6298,
    },
  },
  {
    id: "5",
    name: "David Rodriguez",
    photo: "/placeholder.svg?height=200&width=200",
    description:
      "David is a product manager with a background in engineering. He excels at bridging the gap between technical and business teams.",
    address: "222 Product Road, Austin, TX 78701",
    email: "david.rodriguez@example.com",
    phone: "(512) 555-3456",
    occupation: "Product Manager",
    birthdate: "November 30, 1986",
    coordinates: {
      lat: 30.2672,
      lng: -97.7431,
    },
  },
]
