export interface Profile {
  id: string
  name: string
  photo: string
  description: string
  address: {
    street: string
    city: string
    state: string
    country: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  email?: string
  phone?: string
  occupation?: string
  birthdate?: string
  interests?: string[]
  createdAt: string
  updatedAt: string
}

export interface ProfileFormData {
  name: string
  photo: string
  description: string
  address: {
    street: string
    city: string
    state: string
    country: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  email?: string
  phone?: string
  occupation?: string
  birthdate?: string
  interests?: string[]
}
