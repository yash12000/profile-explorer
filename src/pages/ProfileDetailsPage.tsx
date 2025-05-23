import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProfiles } from "../contexts/ProfilesContext";
import MapView from "../components/map/MapView";
import {
  MapPin,
  Mail,
  Phone,
  Briefcase,
  ChevronLeft,
  ExternalLink,
  Globe,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react";
import { Profile } from "../types";

const ProfileDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getProfileById, loading } = useProfiles();
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const profileData = getProfileById(id);
      if (profileData) {
        setProfile(profileData);
      }
    }
  }, [id, getProfileById]);

  if (loading) {
    return (
      <div className="container-custom py-8 flex justify-center">
        <div className="animate-pulse space-y-8 w-full max-w-4xl">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-8 bg-gray-200 rounded col-span-2"></div>
              <div className="h-8 bg-gray-200 rounded col-span-1"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container-custom py-8">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Profile Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The profile you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/" className="btn btn-primary">
            Return to Profiles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-primary-600 hover:text-primary-700 mb-6 font-medium"
      >
        <ChevronLeft size={18} className="mr-1" />
        Back to Profiles
      </button>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="md:flex">
          <div className="p-8 md:w-1/2">
            <div className="flex items-start">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div className="ml-6">
                <h1 className="text-3xl font-bold text-gray-900">
                  {profile.name}
                </h1>
                <div className="flex items-center text-gray-600 mt-1">
                  <Briefcase size={16} className="mr-1.5" />
                  <span>
                    {profile.role} at {profile.company}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin size={16} className="mr-1.5" />
                  <span>
                    {profile.address.city}, {profile.address.state},{" "}
                    {profile.address.country}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                About
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {profile.description}
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Contact Information
              </h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Mail size={16} className="text-gray-500 mr-2" />
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-primary-600 hover:underline"
                  >
                    {profile.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone size={16} className="text-gray-500 mr-2" />
                  <a
                    href={`tel:${profile.phone}`}
                    className="text-primary-600 hover:underline"
                  >
                    {profile.phone}
                  </a>
                </div>
                <div className="flex items-start">
                  <MapPin size={16} className="text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-gray-700">{profile.address.street}</p>
                    <p className="text-gray-700">
                      {profile.address.city}, {profile.address.state}{" "}
                      {profile.address.zipCode}
                    </p>
                    <p className="text-gray-700">{profile.address.country}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {Object.keys(profile.socials).length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Social Links
                </h2>
                <div className="flex flex-wrap gap-3">
                  {profile.socials.linkedin && (
                    <a
                      href={`https://${profile.socials.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      <Linkedin size={18} className="mr-1" />
                      LinkedIn
                      <ExternalLink size={14} className="ml-1" />
                    </a>
                  )}
                  {profile.socials.twitter && (
                    <a
                      href={`https://${profile.socials.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      <Twitter size={18} className="mr-1" />
                      Twitter
                      <ExternalLink size={14} className="ml-1" />
                    </a>
                  )}
                  {profile.socials.github && (
                    <a
                      href={`https://${profile.socials.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      <Github size={18} className="mr-1" />
                      GitHub
                      <ExternalLink size={14} className="ml-1" />
                    </a>
                  )}
                  {(profile.socials.website || profile.socials.portfolio) && (
                    <a
                      href={`https://${
                        profile.socials.website || profile.socials.portfolio
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      <Globe size={18} className="mr-1" />
                      Website
                      <ExternalLink size={14} className="ml-1" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="md:w-1/2 h-[400px] md:h-auto relative">
            <MapView
              profiles={[profile]}
              initialCenter={profile.address.coordinates}
              zoom={14}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailPage;
