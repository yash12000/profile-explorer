import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import { Profile } from '../types/profile';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ProfileDetails() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!id) return;
        const data = await api.getProfile(id);
        setProfile(data);
      } catch (err) {
        setError('Failed to load profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            {error || 'Profile not found'}
          </h2>
          <p className="text-gray-600">
            Please check the URL or try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={profile.photo}
              alt={profile.name}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Profile Details
            </div>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              {profile.name}
            </h1>
            <p className="mt-4 text-gray-600">{profile.description}</p>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Contact Information
              </h2>
              <div className="space-y-2">
                {profile.email && (
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-gray-500 mr-2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{profile.email}</span>
                  </div>
                )}
                {profile.phone && (
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-gray-500 mr-2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{profile.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {profile.occupation && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Occupation
                </h2>
                <p className="text-gray-600">{profile.occupation}</p>
              </div>
            )}

            {profile.birthdate && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Birth Date
                </h2>
                <p className="text-gray-600">{profile.birthdate}</p>
              </div>
            )}

            {profile.interests && profile.interests.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Interests
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Location
              </h2>
              <div className="space-y-2">
                <p className="text-gray-600">
                  {profile.address.street}, {profile.address.city},{' '}
                  {profile.address.state}, {profile.address.country}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${profile.address.coordinates.lat},${profile.address.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 