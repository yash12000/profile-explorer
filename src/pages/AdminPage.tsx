import { useState } from "react";
import { useProfiles } from "../contexts/ProfilesContext";
import ProfileTable from "../components/admin/ProfileTable";
import ProfileForm from "../components/admin/ProfileForm";
import { Profile } from "../types";
import { Plus, Loader } from "lucide-react";

const AdminPage = () => {
  const { addProfile, updateProfile, loading } = useProfiles();
  const [showForm, setShowForm] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | undefined>(
    undefined
  );

  const handleAddClick = () => {
    setEditingProfile(undefined);
    setShowForm(true);
  };

  const handleEditClick = (profile: Profile) => {
    setEditingProfile(profile);
    setShowForm(true);
  };

  const handleFormSubmit = (
    profileData: Omit<Profile, "id"> | Partial<Profile>
  ) => {
    if (editingProfile) {
      updateProfile(editingProfile.id, profileData);
    } else {
      addProfile(profileData as Omit<Profile, "id">);
    }
    setShowForm(false);
    setEditingProfile(undefined);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProfile(undefined);
  };

  if (loading) {
    return (
      <div className="container-custom py-8 flex justify-center">
        <div className="flex flex-col items-center">
          <Loader className="w-10 h-10 text-primary-500 animate-spin" />
          <p className="mt-4 text-gray-600">Loading profiles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage profiles and their information
          </p>
        </div>

        {!showForm && (
          <button
            onClick={handleAddClick}
            className="mt-4 sm:mt-0 btn btn-primary flex items-center"
          >
            <Plus size={18} className="mr-1" />
            Add New Profile
          </button>
        )}
      </div>

      {showForm ? (
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 animate-fade-in">
          <ProfileForm
            profile={editingProfile}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </div>
      ) : (
        <ProfileTable onEdit={handleEditClick} />
      )}
    </div>
  );
};

export default AdminPage;
