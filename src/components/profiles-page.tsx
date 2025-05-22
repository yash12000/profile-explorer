"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import MapView from "@/components/map-view"
import { api } from "@/services/api"
import type { Profile } from "@/types/profile"
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import LoadingSpinner from "./LoadingSpinner"

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState('list')

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await api.getProfiles()
        setProfiles(data)
      } catch (err) {
        console.error('Failed to load profiles:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfiles()
  }, [])

  const filteredProfiles = profiles.filter(
    (profile: Profile) =>
      profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${profile.address.city}, ${profile.address.country}`.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="list" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="mb-4">
                <Input
                  placeholder="Search profiles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="grid grid-cols-1 gap-4">
                {filteredProfiles.map((profile) => (
                  <div key={profile.id} className="p-4 border rounded-lg">
                    <h3 className="font-semibold">{profile.name}</h3>
                    <p className="text-sm text-gray-600">{profile.description}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {profile.address.city}, {profile.address.country}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="map">
          <div className="lg:col-span-2 h-[600px] rounded-lg overflow-hidden border">
            <MapView />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
