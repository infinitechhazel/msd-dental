"use client"

import { useState, useEffect } from "react"
import { useAuthStore } from "@/store/authStore"
import HeroSection from "@/components/sections/Hero"
import AdminDashboard from "@/components/dashboards/AdminDashboard"
import ClientDashboard from "@/components/dashboards/ClientDashboard"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const { isLoggedIn, user, initializeAuth } = useAuthStore()

  useEffect(() => {
    initializeAuth()
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [initializeAuth])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
          <span className="text-slate-500 text-sm font-medium tracking-wide">Loading...</span>
        </div>
      </div>
    )
  }

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen">
        <HeroSection />
      </div>
    )
  }

  const role = user.role?.toLowerCase()

  if (role === "admin") {
    return <AdminDashboard user={user} />
  }

  // Default: customer / client
  return <ClientDashboard user={user} />
}