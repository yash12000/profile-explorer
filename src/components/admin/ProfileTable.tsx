import { useState } from "react";
import { useProfiles } from "../../contexts/ProfilesContext";
import { Profile } from "../../types";
import { Edit, Trash2, AlertCircle } from "lucide-react";

interface ProfileTableProps {
  onEdit: (profile: Profile) => void;
}

const ProfileTable = ({ onEdit }: ProfileTableProps) => {
  const { profiles, deleteProfile } = useProfiles();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      deleteProfile(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
    }
  };

  return (
    <div className="bg-white shadow-sm overflow-hidden sm:rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Profile
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Role
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Location
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {profiles.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No profiles found
                </td>
              </tr>
            ) : (
              profiles.map((profile) => (
                <tr key={profile.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={profile.avatar}
                          alt={profile.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {profile.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {profile.company}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{profile.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {profile.address.city}
                    </div>
                    <div className="text-sm text-gray-500">
                      {profile.address.state}, {profile.address.country}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {profile.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => onEdit(profile)}
                        className="text-primary-600 hover:text-primary-900 focus:outline-none"
                      >
                        <Edit size={18} />
                        <span className="sr-only">Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(profile.id)}
                        className={`${
                          deleteConfirm === profile.id
                            ? "text-error-600 hover:text-error-900"
                            : "text-gray-500 hover:text-gray-700"
                        } focus:outline-none`}
                      >
                        {deleteConfirm === profile.id ? (
                          <AlertCircle size={18} />
                        ) : (
                          <Trash2 size={18} />
                        )}
                        <span className="sr-only">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileTable;
