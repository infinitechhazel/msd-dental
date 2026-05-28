"use client"

import type React from "react"
import { useEffect } from "react"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Header from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { usePathname } from "next/navigation"
import FloatingSocialMedia from "@/components/FloatingSocialMedia"
import CustomerServiceChatbot from "@/components/CustomerServiceChatbot"
import { useAuthStore } from "@/store/authStore"
import { useSettingsStore } from "@/store/settingsStore"

const queryClient = new QueryClient()

const AUTH_ROUTES = ["/login", "/register", "/verify-email"]

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { isLoggedIn, initializeAuth } = useAuthStore()
  const { fetchSettings } = useSettingsStore()

  useEffect(() => {
    fetchSettings()
  }, [])

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  )
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/")

  // Never show navbar/footer on auth pages or admin routes
  // Also never show when user is logged in (they get dashboard layout)
  const showChrome = !isAuthRoute && !isAdminRoute && !isLoggedIn

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          {showChrome && <Header />}
          <main className="flex-1">{children}</main>
          {showChrome && <Footer />}
        </div>
        {showChrome && <FloatingSocialMedia />}
        {showChrome && <CustomerServiceChatbot />}
        <Toaster />
        <SonnerToaster />
      </TooltipProvider>
    </QueryClientProvider>
  )
}