"use client"

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import { Profile } from '../types/profile';
import LoadingSpinner from './LoadingSpinner';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default function ProfileDetails() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    if (!id) return;

    try {
      const data = await api.getProfile(id);
      setProfile(data);
    } catch (err) {
      setError('Failed to load profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile.photo} alt={profile.name} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{profile.name}</CardTitle>
              {profile.occupation && (
                <p className="text-gray-600">{profile.occupation}</p>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {profile.description && (
              <div>
                <h3 className="text-lg font-semibold mb-2">About</h3>
                <p className="text-gray-700">{profile.description}</p>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.email && (
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-gray-900">{profile.email}</p>
                  </div>
                )}
                {profile.phone && (
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="text-gray-900">{profile.phone}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="text-gray-900">
                    {profile.address.street}
                    <br />
                    {profile.address.city}, {profile.address.state}
                    <br />
                    {profile.address.country}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Coordinates</p>
                  <p className="text-gray-900">
                    Lat: {profile.address.coordinates.lat}
                    <br />
                    Lng: {profile.address.coordinates.lng}
                  </p>
                </div>
              </div>
            </div>

            {profile.birthdate && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Birth Date</h3>
                <p className="text-gray-900">{profile.birthdate}</p>
              </div>
            )}

            {profile.interests && profile.interests.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
