"use client"

import { useEffect, useState } from "react"
import type { IceCreamItem } from "@/lib/types"

interface Props {
  shops: IceCreamItem[]
  selected?: string | null
}

const regionColors: Record<string, string> = {
  NorCal: "#22c55e",
  SoCal: "#f97316",
  Central: "#f59e0b",
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LeafletModules = { MapContainer: any; TileLayer: any; Marker: any; Popup: any; L: any }

export default function MapView({ shops, selected }: Props) {
  const [MapComponents, setMapComponents] = useState<LeafletModules | null>(null)

  useEffect(() => {
    // Dynamically import leaflet only on client
    Promise.all([import("react-leaflet"), import("leaflet")]).then(([rl, L]) => {
      // Fix default icon paths for Next.js
      delete (L.default.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
      L.default.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      })
      setMapComponents({
        MapContainer: rl.MapContainer,
        TileLayer: rl.TileLayer,
        Marker: rl.Marker,
        Popup: rl.Popup,
        L: L.default,
      })
    })
  }, [])

  if (!MapComponents) {
    return (
      <div className="h-[500px] bg-[#F2E8DC] rounded-2xl flex items-center justify-center">
        <p className="text-[#8B5E3C] text-sm">Loading map...</p>
      </div>
    )
  }

  const { MapContainer, TileLayer, Marker, Popup, L } = MapComponents

  function createIcon(color: string, isSelected: boolean) {
    return L.divIcon({
      className: "",
      html: `<div style="
        width: ${isSelected ? 28 : 20}px;
        height: ${isSelected ? 28 : 20}px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
      ">🍦</div>`,
      iconSize: [isSelected ? 28 : 20, isSelected ? 28 : 20],
      iconAnchor: [isSelected ? 14 : 10, isSelected ? 14 : 10],
    })
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <MapContainer
        center={[36.7783, -119.4179]}
        zoom={6}
        className="h-[500px] rounded-2xl z-0"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {shops.map((shop) => (
          <Marker
            key={shop.slug}
            position={[shop.lat, shop.lng]}
            icon={createIcon(regionColors[shop.region] || "#E85D75", selected === shop.slug)}
          >
            <Popup>
              <div className="text-[#2C1A0E]">
                <p className="font-bold text-sm">{shop.shop}</p>
                <p className="text-xs text-[#8B5E3C]">{shop.name}</p>
                <p className="text-xs text-[#8B5E3C]">{shop.city}, CA</p>
                <a
                  href={`/shops/${shop.slug}`}
                  className="text-xs text-[#E85D75] underline mt-1 block"
                >
                  View details →
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  )
}
