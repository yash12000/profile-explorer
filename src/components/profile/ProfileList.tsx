import { useState } from "react";
import { useProfiles } from "../../contexts/ProfilesContext";
import ProfileCard from "./ProfileCard";
import SearchFilter from "./SearchFilter";
import MapView from "../map/MapView";
import { Profile, SearchFilters } from "../../types";
import { Loader, MapPin } from "lucide-react";

const ProfileList = () => {
  const { profiles, loading, error } = useProfiles();
  const [filters, setFilters] = useState<SearchFilters>({ query: "" });
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [showMap, setShowMap] = useState(false);

  const handleFilterChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const handleSummaryClick = (profile: Profile) => {
    setSelectedProfile(profile);
    setShowMap(true);
  };

  const handleCloseMap = () => {
    setShowMap(false);
  };

  const filteredProfiles = profiles.filter((profile) => {
    const matchesQuery =
      profile.name.toLowerCase().includes(filters.query.toLowerCase()) ||
      profile.role.toLowerCase().includes(filters.query.toLowerCase()) ||
      profile.company.toLowerCase().includes(filters.query.toLowerCase()) ||
      profile.description.toLowerCase().includes(filters.query.toLowerCase());

    const matchesLocation =
      !filters.location ||
      profile.address.city
        .toLowerCase()
        .includes(filters.location.toLowerCase()) ||
      profile.address.state
        .toLowerCase()
        .includes(filters.location.toLowerCase());

    const matchesSkill =
      !filters.skill ||
      profile.skills.some((skill) =>
        skill.toLowerCase().includes(filters.skill!.toLowerCase())
      );

    return matchesQuery && matchesLocation && matchesSkill;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center">
          <Loader className="w-10 h-10 text-primary-500 animate-spin" />
          <p className="mt-4 text-gray-600">Loading profiles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-error-50 p-4 rounded-md border border-error-100 text-error-700">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SearchFilter onFilterChange={handleFilterChange} />

      {filteredProfiles.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No profiles found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search filters to find what you're looking for.
          </p>
        </div>
      ) : (
        <div>
          <p className="text-sm text-gray-500 mb-3">
            Showing {filteredProfiles.length} profiles
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onSummaryClick={handleSummaryClick}
              />
            ))}
          </div>
        </div>
      )}

      {showMap && selectedProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col animate-slide-up">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {selectedProfile.name}'s Location
              </h2>
              <button
                onClick={handleCloseMap}
                className="text-gray-500 hover:text-gray-700"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 min-h-[400px]">
              <MapView
                profiles={[selectedProfile]}
                initialCenter={selectedProfile.address.coordinates}
              />
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-start">
                <MapPin className="text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">
                    {selectedProfile.address.street}
                  </p>
                  <p className="text-gray-600">
                    {selectedProfile.address.city},{" "}
                    {selectedProfile.address.state}{" "}
                    {selectedProfile.address.zipCode}
                  </p>
                  <p className="text-gray-600">
                    {selectedProfile.address.country}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileList;
