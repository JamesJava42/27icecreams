"use client"

import dynamic from "next/dynamic"
import type { IceCreamItem } from "@/lib/types"

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false })

interface Props {
  shops: IceCreamItem[]
  selected?: string | null
}

export default function MapViewClient({ shops, selected }: Props) {
  return <MapView shops={shops} selected={selected} />
}
