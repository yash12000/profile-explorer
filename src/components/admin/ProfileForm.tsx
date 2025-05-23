import { useState, useEffect } from "react";
import { Profile } from "../../types";
import { X, Plus } from "lucide-react";

interface ProfileFormProps {
  profile?: Profile;
  onSubmit: (profileData: Omit<Profile, "id"> | Partial<Profile>) => void;
  onCancel: () => void;
}

const defaultProfile: Omit<Profile, "id"> = {
  name: "",
  avatar: "",
  description: "",
  role: "",
  company: "",
  email: "",
  phone: "",
  address: {
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    coordinates: {
      lat: 0,
      lng: 0,
    },
  },
  skills: [],
  socials: {},
};

const ProfileForm = ({ profile, onSubmit, onCancel }: ProfileFormProps) => {
  const [formData, setFormData] = useState<
    Omit<Profile, "id"> | Partial<Profile>
  >(profile || defaultProfile);
  const [newSkill, setNewSkill] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...((formData as any)[parent] || {}),
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCoordinateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [, coord] = name.split(".");

    setFormData({
      ...formData,
      address: {
        ...formData.address!,
        coordinates: {
          ...formData.address!.coordinates,
          [coord]: parseFloat(value) || 0,
        },
      },
    });
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills?.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...(formData.skills || []), newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills?.filter((skill) => skill !== skillToRemove) || [],
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.company) newErrors.company = "Company is required";
    if (!formData.description)
      newErrors.description = "Description is required";

    if (!formData.address?.street)
      newErrors["address.street"] = "Street is required";
    if (!formData.address?.city) newErrors["address.city"] = "City is required";
    if (!formData.address?.state)
      newErrors["address.state"] = "State is required";
    if (!formData.address?.country)
      newErrors["address.country"] = "Country is required";

    if (!formData.address?.coordinates.lat)
      newErrors["coordinates.lat"] = "Latitude is required";
    if (!formData.address?.coordinates.lng)
      newErrors["coordinates.lng"] = "Longitude is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            {profile ? "Edit Profile" : "Create New Profile"}
          </h3>

          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="label">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name || ""}
                onChange={handleChange}
                className={`input ${
                  errors.name ? "border-error-500 focus:ring-error-500" : ""
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-error-600">{errors.name}</p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="avatar" className="label">
                Avatar URL
              </label>
              <input
                type="text"
                name="avatar"
                id="avatar"
                value={formData.avatar || ""}
                onChange={handleChange}
                className="input"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="role" className="label">
                Role
              </label>
              <input
                type="text"
                name="role"
                id="role"
                value={formData.role || ""}
                onChange={handleChange}
                className={`input ${
                  errors.role ? "border-error-500 focus:ring-error-500" : ""
                }`}
              />
              {errors.role && (
                <p className="mt-1 text-sm text-error-600">{errors.role}</p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="company" className="label">
                Company
              </label>
              <input
                type="text"
                name="company"
                id="company"
                value={formData.company || ""}
                onChange={handleChange}
                className={`input ${
                  errors.company ? "border-error-500 focus:ring-error-500" : ""
                }`}
              />
              {errors.company && (
                <p className="mt-1 text-sm text-error-600">{errors.company}</p>
              )}
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="description" className="label">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={3}
                value={formData.description || ""}
                onChange={handleChange}
                className={`input ${
                  errors.description
                    ? "border-error-500 focus:ring-error-500"
                    : ""
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-error-600">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email || ""}
                onChange={handleChange}
                className={`input ${
                  errors.email ? "border-error-500 focus:ring-error-500" : ""
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error-600">{errors.email}</p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="phone" className="label">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div className="sm:col-span-6">
              <h4 className="text-base font-medium text-gray-900 mb-3">
                Address Information
              </h4>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="address.street" className="label">
                    Street
                  </label>
                  <input
                    type="text"
                    name="address.street"
                    id="address.street"
                    value={formData.address?.street || ""}
                    onChange={handleChange}
                    className={`input ${
                      errors["address.street"]
                        ? "border-error-500 focus:ring-error-500"
                        : ""
                    }`}
                  />
                  {errors["address.street"] && (
                    <p className="mt-1 text-sm text-error-600">
                      {errors["address.street"]}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="address.city" className="label">
                    City
                  </label>
                  <input
                    type="text"
                    name="address.city"
                    id="address.city"
                    value={formData.address?.city || ""}
                    onChange={handleChange}
                    className={`input ${
                      errors["address.city"]
                        ? "border-error-500 focus:ring-error-500"
                        : ""
                    }`}
                  />
                  {errors["address.city"] && (
                    <p className="mt-1 text-sm text-error-600">
                      {errors["address.city"]}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="address.state" className="label">
                    State
                  </label>
                  <input
                    type="text"
                    name="address.state"
                    id="address.state"
                    value={formData.address?.state || ""}
                    onChange={handleChange}
                    className={`input ${
                      errors["address.state"]
                        ? "border-error-500 focus:ring-error-500"
                        : ""
                    }`}
                  />
                  {errors["address.state"] && (
                    <p className="mt-1 text-sm text-error-600">
                      {errors["address.state"]}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="address.zipCode" className="label">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="address.zipCode"
                    id="address.zipCode"
                    value={formData.address?.zipCode || ""}
                    onChange={handleChange}
                    className="input"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="address.country" className="label">
                    Country
                  </label>
                  <input
                    type="text"
                    name="address.country"
                    id="address.country"
                    value={formData.address?.country || ""}
                    onChange={handleChange}
                    className={`input ${
                      errors["address.country"]
                        ? "border-error-500 focus:ring-error-500"
                        : ""
                    }`}
                  />
                  {errors["address.country"] && (
                    <p className="mt-1 text-sm text-error-600">
                      {errors["address.country"]}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="coordinates.lat" className="label">
                    Latitude
                  </label>
                  <input
                    type="number"
                    name="coordinates.lat"
                    id="coordinates.lat"
                    step="any"
                    value={formData.address?.coordinates.lat || ""}
                    onChange={handleCoordinateChange}
                    className={`input ${
                      errors["coordinates.lat"]
                        ? "border-error-500 focus:ring-error-500"
                        : ""
                    }`}
                  />
                  {errors["coordinates.lat"] && (
                    <p className="mt-1 text-sm text-error-600">
                      {errors["coordinates.lat"]}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="coordinates.lng" className="label">
                    Longitude
                  </label>
                  <input
                    type="number"
                    name="coordinates.lng"
                    id="coordinates.lng"
                    step="any"
                    value={formData.address?.coordinates.lng || ""}
                    onChange={handleCoordinateChange}
                    className={`input ${
                      errors["coordinates.lng"]
                        ? "border-error-500 focus:ring-error-500"
                        : ""
                    }`}
                  />
                  {errors["coordinates.lng"] && (
                    <p className="mt-1 text-sm text-error-600">
                      {errors["coordinates.lng"]}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <h4 className="text-base font-medium text-gray-900 mb-3">
                Skills
              </h4>

              <div className="flex">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="input flex-1"
                  placeholder="Add a skill"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="ml-2 btn btn-primary py-2"
                >
                  <Plus size={16} />
                  <span className="sr-only">Add skill</span>
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {formData.skills?.map((skill, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-primary-50 text-primary-700"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1.5 text-primary-500 hover:text-primary-700 focus:outline-none"
                    >
                      <X size={14} />
                      <span className="sr-only">Remove skill</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button type="button" onClick={onCancel} className="btn btn-outline">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {profile ? "Update Profile" : "Create Profile"}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
