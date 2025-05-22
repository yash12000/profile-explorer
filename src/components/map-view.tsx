"use client"

import { useEffect, useRef } from "react"
import type { Profile } from "@/types/profile"
import { useProfiles } from "@/context/profile-context"
import { Loader2 } from "lucide-react"

interface MapViewProps {
  selectedProfile: Profile | null
}

export function MapView({ selectedProfile }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<google.maps.Marker[]>([])
  const { profiles } = useProfiles()

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBZNbnywmu0lo-aN_hPAivqOIqb3QGnX_k&callback=initMap`
      script.async = true
      script.defer = true
      document.head.appendChild(script)

      window.initMap = () => {
        if (mapRef.current && !mapInstanceRef.current) {
          initializeMap()
        }
      }
    }

    if (!window.google?.maps) {
      loadGoogleMapsScript()
    } else if (mapRef.current && !mapInstanceRef.current) {
      initializeMap()
    }

    return () => {
      window.initMap = undefined
    }
  }, [])

  const initializeMap = () => {
    if (!mapRef.current) return

    mapInstanceRef.current = new google.maps.Map(mapRef.current, {
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 12,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
    })

    addProfileMarkers()
  }

  const addProfileMarkers = () => {
    if (!mapInstanceRef.current) return

    markersRef.current.forEach((marker) => marker.setMap(null))
    markersRef.current = []

    profiles.forEach((profile) => {
      const marker = new google.maps.Marker({
        position: profile.coordinates,
        map: mapInstanceRef.current,
        title: profile.name,
        animation: google.maps.Animation.DROP,
      })

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; max-width: 200px;">
            <h3 style="margin: 0 0 8px; font-weight: 500;">${profile.name}</h3>
            <p style="margin: 0; font-size: 14px;">${profile.address}</p>
          </div>
        `,
      })

      marker.addListener("click", () => {
        infoWindow.open(mapInstanceRef.current, marker)
      })

      markersRef.current.push(marker)
    })
  }

  useEffect(() => {
    if (!mapInstanceRef.current || !selectedProfile) return

    mapInstanceRef.current.setCenter(selectedProfile.coordinates)
    mapInstanceRef.current.setZoom(15)

    markersRef.current.forEach((marker) => {
      if (marker.getTitle() === selectedProfile.name) {
        marker.setAnimation(google.maps.Animation.BOUNCE)

        setTimeout(() => {
          marker.setAnimation(null)
        }, 1500)
      }
    })
  }, [selectedProfile])

  return (
    <div className="relative h-full w-full">
      {!window.google?.maps && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
      <div ref={mapRef} className="h-full w-full" />
    </div>
  )
}

declare global {
  interface Window {
    google?: typeof google
    initMap?: () => void
  }
}
