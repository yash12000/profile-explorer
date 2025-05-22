"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, User } from "lucide-react"
import type { Profile } from "@/types/profile"
import { ProfileDetails } from "@/components/profile-details"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface ProfileListProps {
  profiles: Profile[]
  onSelectProfile: (profile: Profile) => void
}

export function ProfileList({ profiles, onSelectProfile }: ProfileListProps) {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)

  const handleShowSummary = (profile: Profile) => {
    onSelectProfile(profile)
  }

  const handleViewDetails = (profile: Profile) => {
    setSelectedProfile(profile)
  }

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
      {profiles.length === 0 ? (
        <div className="text-center p-8 text-muted-foreground">No profiles found</div>
      ) : (
        profiles.map((profile) => (
          <Card key={profile.id} className="overflow-hidden">
            <CardHeader className="p-4 pb-0">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={profile.photo || "/placeholder.svg"} alt={profile.name} />
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{profile.name}</h3>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="truncate max-w-[200px]">{profile.address}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground line-clamp-2">{profile.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <Button variant="outline" size="sm" onClick={() => handleViewDetails(profile)}>
                View Details
              </Button>
              <Button variant="default" size="sm" onClick={() => handleShowSummary(profile)}>
                Show on Map
              </Button>
            </CardFooter>
          </Card>
        ))
      )}

      <Dialog open={!!selectedProfile} onOpenChange={(open) => !open && setSelectedProfile(null)}>
        {selectedProfile && (
          <DialogContent className="max-w-2xl">
            <ProfileDetails profile={selectedProfile} />
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
