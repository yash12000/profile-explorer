"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Profile } from "@/types/profile"
import { sampleProfiles } from "@/data/sample-profiles"

interface ProfileContextType {
  profiles: Profile[]
  addProfile: (profile: Profile) => void
  updateProfile: (profile: Profile) => void
  deleteProfile: (id: string) => void
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profiles, setProfiles] = useState<Profile[]>([])

  useEffect(() => {
    const savedProfiles = localStorage.getItem("profiles")
    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles))
    } else {
      setProfiles(sampleProfiles)
      localStorage.setItem("profiles", JSON.stringify(sampleProfiles))
    }
  }, [])

  useEffect(() => {
    if (profiles.length > 0) {
      localStorage.setItem("profiles", JSON.stringify(profiles))
    }
  }, [profiles])

  const addProfile = (profile: Profile) => {
    setProfiles((prev) => [...prev, profile])
  }

  const updateProfile = (profile: Profile) => {
    setProfiles((prev) => prev.map((p) => (p.id === profile.id ? profile : p)))
  }

  const deleteProfile = (id: string) => {
    setProfiles((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <ProfileContext.Provider value={{ profiles, addProfile, updateProfile, deleteProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfiles() {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error("useProfiles must be used within a ProfileProvider")
  }
  return context
}
