import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { Profile, Coordinates } from "../../types";
import { Briefcase, Mail, Phone } from "lucide-react";

interface MapViewProps {
  profiles: Profile[];
  initialCenter?: Coordinates;
  zoom?: number;
}

const MapView = ({ profiles, initialCenter, zoom = 13 }: MapViewProps) => {
  const [mapKey, setMapKey] = useState(Date.now());

  const customIcon = new Icon({
    iconUrl: "/map-marker.svg",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

  const center =
    initialCenter ||
    (profiles.length > 0
      ? profiles[0].address.coordinates
      : { lat: 37.7749, lng: -122.4194 });

  useEffect(() => {
    setMapKey(Date.now());
  }, [profiles, initialCenter]);

  return (
    <div className="map-container h-full">
      <MapContainer
        key={mapKey}
        center={[center.lat, center.lng]}
        zoom={zoom}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {profiles.map((profile) => (
          <Marker
            key={profile.id}
            position={[
              profile.address.coordinates.lat,
              profile.address.coordinates.lng,
            ]}
            icon={customIcon}
          >
            <Popup className="custom-popup">
              <div className="text-center mb-2">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-16 h-16 rounded-full mx-auto border-2 border-white shadow-sm"
                />
                <h3 className="text-lg font-semibold mt-2">{profile.name}</h3>
                <p className="text-sm text-gray-600 flex items-center justify-center">
                  <Briefcase size={14} className="mr-1" />
                  {profile.role} at {profile.company}
                </p>
              </div>

              <div className="text-sm">
                <p className="mb-1">
                  <strong>Address:</strong> {profile.address.street},{" "}
                  {profile.address.city}, {profile.address.state}{" "}
                  {profile.address.zipCode}
                </p>
                <div className="flex items-center mt-2">
                  <Mail size={14} className="mr-1 text-gray-600" />
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-primary-600 hover:underline"
                  >
                    {profile.email}
                  </a>
                </div>
                <div className="flex items-center mt-1">
                  <Phone size={14} className="mr-1 text-gray-600" />
                  <a
                    href={`tel:${profile.phone}`}
                    className="text-primary-600 hover:underline"
                  >
                    {profile.phone}
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
