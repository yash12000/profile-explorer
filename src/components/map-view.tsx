"use client"

import { useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { api } from '../services/api';
import { Profile } from '../types/profile';
import LoadingSpinner from './LoadingSpinner';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 0,
  lng: 0,
};

export default function MapView() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const data = await api.getProfiles();
      setProfiles(data);
    } catch (err) {
      setError('Failed to load profiles');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">{error}</h2>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile Locations</h1>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={2}
          >
            {profiles.map((profile) => (
              <Marker
                key={profile.id}
                position={{
                  lat: profile.address.coordinates.lat,
                  lng: profile.address.coordinates.lng,
                }}
                title={profile.name}
              />
            ))}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    google?: typeof google
    initMap?: () => void
  }
}
