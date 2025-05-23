import { useState } from "react";
import ProfileList from "../components/profile/ProfileList";
import MapView from "../components/map/MapView";
import { useProfiles } from "../contexts/ProfilesContext";
import { MapPin, Users } from "lucide-react";

const HomePage = () => {
  const { profiles, loading } = useProfiles();
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  return (
    <div className="container-custom py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile Explorer</h1>
          <p className="text-gray-600 mt-2">
            Browse professionals and explore their locations
          </p>
        </div>

        {!loading && profiles.length > 0 && (
          <div className="mt-4 sm:mt-0 flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === "list"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Users size={16} className="mr-1.5" />
              List View
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === "map"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <MapPin size={16} className="mr-1.5" />
              Map View
            </button>
          </div>
        )}
      </div>

      {viewMode === "list" ? (
        <ProfileList />
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="h-[calc(100vh-220px)] min-h-[400px]">
            <MapView profiles={profiles} zoom={3} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
