import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { mockProfiles } from "../data/mockData";
import { Profile } from "../types";

type ProfilesContextType = {
  profiles: Profile[];
  loading: boolean;
  error: string | null;
  addProfile: (profile: Omit<Profile, "id">) => void;
  updateProfile: (id: string, profile: Partial<Profile>) => void;
  deleteProfile: (id: string) => void;
  getProfileById: (id: string) => Profile | undefined;
};

const ProfilesContext = createContext<ProfilesContextType | undefined>(
  undefined
);

export const ProfilesProvider = ({ children }: { children: ReactNode }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = () => {
      setLoading(true);
      try {
        setTimeout(() => {
          setProfiles(mockProfiles);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError("Failed to fetch profiles");
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const addProfile = (profile: Omit<Profile, "id">) => {
    const newProfile = {
      ...profile,
      id: `profile-${Date.now()}`,
    };
    setProfiles([...profiles, newProfile]);
  };

  const updateProfile = (id: string, updatedProfile: Partial<Profile>) => {
    setProfiles(
      profiles.map((profile) =>
        profile.id === id ? { ...profile, ...updatedProfile } : profile
      )
    );
  };

  const deleteProfile = (id: string) => {
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  const getProfileById = (id: string) => {
    return profiles.find((profile) => profile.id === id);
  };

  return (
    <ProfilesContext.Provider
      value={{
        profiles,
        loading,
        error,
        addProfile,
        updateProfile,
        deleteProfile,
        getProfileById,
      }}
    >
      {children}
    </ProfilesContext.Provider>
  );
};

export const useProfiles = () => {
  const context = useContext(ProfilesContext);
  if (context === undefined) {
    throw new Error("useProfiles must be used within a ProfilesProvider");
  }
  return context;
};
