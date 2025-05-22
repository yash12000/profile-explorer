"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ProfileList } from "@/components/profile-list"
import { MapView } from "@/components/map-view"
import { useProfiles } from "@/context/profile-context"
import type { Profile } from "@/types/profile"
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

export default function ProfilesPage() {
  const { profiles } = useProfiles()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)
  const [activeTab, setActiveTab] = useState('list')

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.address.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
              <ProfileList profiles={filteredProfiles} onSelectProfile={setSelectedProfile} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="map">
          <div className="lg:col-span-2 h-[600px] rounded-lg overflow-hidden border">
            <MapView selectedProfile={selectedProfile} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
