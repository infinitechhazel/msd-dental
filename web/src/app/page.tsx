"use client"

import { useState, useEffect } from "react"

import HeroSection from "@/components/sections/Hero"

export default function Home() {
  const [loading, setLoading] = useState(true)  

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800) // adjust or remove if not needed

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div>Loading</div>
    )
  }

  return (
    <div className="min-h-screen">

      <HeroSection />
    </div>
  )
}
