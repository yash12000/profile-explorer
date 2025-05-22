"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MapPin, Mail, Phone, User, Briefcase, Calendar } from "lucide-react"
import type { Profile } from "@/types/profile"
import { MapView } from "@/components/map-view"

interface ProfileDetailsProps {
  profile: Profile
}

export function ProfileDetails({ profile }: ProfileDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <Avatar className="h-24 w-24">
          <AvatarImage src={profile.photo || "/placeholder.svg"} alt={profile.name} />
          <AvatarFallback className="text-2xl">
            <User className="h-12 w-12" />
          </AvatarFallback>
        </Avatar>

        <div className="space-y-2 flex-1">
          <h2 className="text-2xl font-bold">{profile.name}</h2>

          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{profile.address}</span>
          </div>

          {profile.email && (
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 mr-2" />
              <span>{profile.email}</span>
            </div>
          )}

          {profile.phone && (
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-2" />
              <span>{profile.phone}</span>
            </div>
          )}

          {profile.occupation && (
            <div className="flex items-center text-sm">
              <Briefcase className="h-4 w-4 mr-2" />
              <span>{profile.occupation}</span>
            </div>
          )}

          {profile.birthdate && (
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{profile.birthdate}</span>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">About</h3>
        <p className="text-muted-foreground">{profile.description}</p>
      </div>

      <div className="h-[300px] rounded-lg overflow-hidden border">
        <MapView selectedProfile={profile} />
      </div>

      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={() =>
            window.open(
              `https://www.google.com/maps/search/?api=1&query=${profile.coordinates.lat},${profile.coordinates.lng}`,
              "_blank",
            )
          }
        >
          Open in Google Maps
        </Button>
      </div>
    </div>
  )
}
