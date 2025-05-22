import { Profile, ProfileFormData } from '../types/profile';

const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'John Doe',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    description: 'Software Engineer with 5 years of experience in web development.',
    address: {
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      coordinates: {
        lat: 37.7749,
        lng: -122.4194
      }
    },
    contactInfo: {
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567'
    },
    interests: ['Web Development', 'AI', 'Hiking'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    photo: 'https://randomuser.me/api/portraits/women/1.jpg',
    description: 'UX Designer passionate about creating beautiful and functional interfaces.',
    address: {
      street: '456 Market St',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      coordinates: {
        lat: 40.7128,
        lng: -74.0060
      }
    },
    contactInfo: {
      email: 'jane.smith@example.com',
      phone: '+1 (555) 987-6543'
    },
    interests: ['UI/UX Design', 'Photography', 'Travel'],
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z'
  }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  getProfiles: async (): Promise<Profile[]> => {
    await delay(500);
    return [...mockProfiles];
  },

  getProfile: async (id: string): Promise<Profile | null> => {
    await delay(300);
    const profile = mockProfiles.find(p => p.id === id);
    return profile || null;
  },

  createProfile: async (data: ProfileFormData): Promise<Profile> => {
    await delay(500);
    const newProfile: Profile = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockProfiles.push(newProfile);
    return newProfile;
  },

  updateProfile: async (id: string, data: ProfileFormData): Promise<Profile | null> => {
    await delay(500);
    const index = mockProfiles.findIndex(p => p.id === id);
    if (index === -1) return null;

    const updatedProfile: Profile = {
      ...mockProfiles[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    mockProfiles[index] = updatedProfile;
    return updatedProfile;
  },

  deleteProfile: async (id: string): Promise<boolean> => {
    await delay(300);
    const index = mockProfiles.findIndex(p => p.id === id);
    if (index === -1) return false;

    mockProfiles.splice(index, 1);
    return true;
  }
}; 