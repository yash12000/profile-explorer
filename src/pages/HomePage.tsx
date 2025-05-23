import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { Profile } from "../types/profile";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await api.getProfiles();
        setProfiles(data);
      } catch (err) {
        setError("Failed to load profiles");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profiles</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search profiles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((profile) => (
            <Link
              key={profile.id}
              to={`/profile/${profile.id}`}
              className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {profile.name}
                </h2>
                <p className="text-gray-600 line-clamp-2">
                  {profile.description}
                </p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
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
                  <span>
                    {profile.address.city}, {profile.address.country}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredProfiles.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No profiles found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search query or check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
