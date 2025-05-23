export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates: Coordinates;
}

export interface Socials {
  linkedin?: string;
  twitter?: string;
  github?: string;
  portfolio?: string;
  website?: string;
  medium?: string;
}

export interface Profile {
  id: string;
  name: string;
  avatar: string;
  description: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  address: Address;
  skills: string[];
  socials: Socials;
}

export interface SearchFilters {
  query: string;
  location?: string;
  skill?: string;
}
