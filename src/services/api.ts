import { Profile, ProfileFormData } from '../types/profile';

const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'John Doe',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    description: 'Software engineer from New York.',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      coordinates: { lat: 40.7128, lng: -74.006 },
    },
    email: 'john.doe@example.com',
    phone: '+1 555-1234',
    occupation: 'Software Engineer',
    birthdate: '1990-01-01',
    interests: ['coding', 'music', 'travel'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    description: 'Graphic designer from London.',
    address: {
      street: '456 Queen St',
      city: 'London',
      state: '',
      country: 'UK',
      coordinates: { lat: 51.5074, lng: -0.1278 },
    },
    email: 'jane.smith@example.com',
    phone: '+44 20 7946 0958',
    occupation: 'Graphic Designer',
    birthdate: '1985-05-15',
    interests: ['art', 'photography', 'travel'],
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