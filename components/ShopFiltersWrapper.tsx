"use client"

import dynamic from "next/dynamic"

const ShopFilters = dynamic(() => import("@/components/ShopFilters"), { ssr: false })

export default function ShopFiltersWrapper() {
  return <ShopFilters />
}
