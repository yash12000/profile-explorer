export interface Profile {
  id: string
  name: string
  photo: string
  description: string
  address: string
  email?: string
  phone?: string
  occupation?: string
  birthdate?: string
  coordinates: {
    lat: number
    lng: number
  }
}
