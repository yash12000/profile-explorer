"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfilesPage } from "@/components/profiles-page"
import { AdminPage } from "@/components/admin-page"
import { ProfileProvider } from "@/context/profile-context"

export default function Home() {
  const [activeTab, setActiveTab] = useState("profiles")

  return (
    <ProfileProvider>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Profile Explorer</h1>
          <p className="text-muted-foreground mt-2">View profiles and explore their locations on the map</p>
        </header>

        <Tabs defaultValue="profiles" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="profiles">Profiles</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>
          <TabsContent value="profiles">
            <ProfilesPage />
          </TabsContent>
          <TabsContent value="admin">
            <AdminPage />
          </TabsContent>
        </Tabs>
      </div>
    </ProfileProvider>
  )
}
