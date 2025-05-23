import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Briefcase, ChevronRight, MapIcon } from "lucide-react";
import { Profile } from "../../types";

interface ProfileCardProps {
  profile: Profile;
  onSummaryClick: (profile: Profile) => void;
}

const ProfileCard = ({ profile, onSummaryClick }: ProfileCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`card group transition-all duration-300 ${
        isHovered ? "scale-[1.02]" : "scale-100"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
              {profile.name}
            </h3>
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Briefcase size={16} className="mr-1 flex-shrink-0" />
              <span>
                {profile.role} at {profile.company}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin size={16} className="mr-1 flex-shrink-0" />
              <span>
                {profile.address.city}, {profile.address.state}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-3 text-sm text-gray-600 line-clamp-2">
          {profile.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {profile.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700"
            >
              {skill}
            </span>
          ))}
          {profile.skills.length > 3 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              +{profile.skills.length - 3}
            </span>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <button
            onClick={() => onSummaryClick(profile)}
            className="btn btn-outline py-1 px-3 flex items-center text-sm"
          >
            <MapIcon size={16} className="mr-1" />
            Show on Map
          </button>

          <Link
            to={`/profile/${profile.id}`}
            className="flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            View Profile
            <ChevronRight
              size={16}
              className="ml-1 transform group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
