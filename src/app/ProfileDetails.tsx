import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Profile } from '../types/profile';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../services/api';

const mapContainerStyle = {
  width: '100%',
  height: '300px'
};

const ProfileDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;
      
      try {
        const data = await api.getProfile(id);
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Profile not found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex items-start space-x-6">
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-32 h-32 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
              <p className="mt-2 text-gray-600">{profile.description}</p>
              
              {profile.contactInfo && (
                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
                  {profile.contactInfo.email && (
                    <p className="text-gray-600">Email: {profile.contactInfo.email}</p>
                  )}
                  {profile.contactInfo.phone && (
                    <p className="text-gray-600">Phone: {profile.contactInfo.phone}</p>
                  )}
                </div>
              )}

              {profile.interests && profile.interests.length > 0 && (
                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-gray-900">Interests</h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Location</h2>
            <div className="h-[300px] rounded-lg overflow-hidden">
              <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={profile.address.coordinates}
                  zoom={12}
                >
                  <Marker
                    position={profile.address.coordinates}
                    title={profile.name}
                  />
                </GoogleMap>
              </LoadScript>
            </div>
            <div className="mt-4 text-gray-600">
              <p>{profile.address.street}</p>
              <p>{profile.address.city}, {profile.address.state}</p>
              <p>{profile.address.country}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails; 