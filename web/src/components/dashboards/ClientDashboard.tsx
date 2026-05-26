"use client"

import { useState } from "react"
import { useAuthStore } from "@/store/authStore"

interface User {
  id: string
  name: string
  email: string
  role?: string
  [key: string]: any
}

interface ClientDashboardProps {
  user: User
}

const services = {
  dental: [
    { name: "Dental Cleaning", price: "₱1,500", duration: "45 min", icon: "🦷", tag: "Popular" },
    { name: "Teeth Whitening", price: "₱4,500", duration: "60 min", icon: "✦", tag: "Premium" },
    { name: "Braces Consultation", price: "₱500", duration: "30 min", icon: "📐", tag: null },
    { name: "Root Canal", price: "₱8,000", duration: "90 min", icon: "🔬", tag: null },
    { name: "Tooth Extraction", price: "₱1,200", duration: "30 min", icon: "⚕️", tag: null },
    { name: "Dental Implant", price: "₱35,000", duration: "120 min", icon: "💠", tag: "Premium" },
  ],
  aesthetic: [
    { name: "Botox Treatment", price: "₱12,000", duration: "30 min", icon: "✨", tag: "Popular" },
    { name: "Dermal Filler", price: "₱18,000", duration: "45 min", icon: "💉", tag: "Premium" },
    { name: "Chemical Peel", price: "₱3,500", duration: "60 min", icon: "🌿", tag: null },
    { name: "Laser Resurfacing", price: "₱9,500", duration: "75 min", icon: "⚡", tag: "Premium" },
    { name: "PRP Therapy", price: "₱6,500", duration: "60 min", icon: "🔴", tag: null },
    { name: "Hydrafacial", price: "₱4,500", duration: "60 min", icon: "💧", tag: "Popular" },
  ],
}

const upcomingAppointments = [
  {
    service: "Dental Cleaning",
    clinic: "dental",
    date: "June 3, 2026",
    time: "10:00 AM",
    doctor: "Dr. Maria Reyes",
    status: "Confirmed",
  },
  {
    service: "Teeth Whitening",
    clinic: "dental",
    date: "June 15, 2026",
    time: "02:00 PM",
    doctor: "Dr. Maria Reyes",
    status: "Pending",
  },
]

const pastAppointments = [
  { service: "Botox Treatment", clinic: "aesthetic", date: "May 10, 2026", doctor: "Dr. Sofia Cruz", rating: 5 },
  { service: "Dental Cleaning", clinic: "dental", date: "Apr 22, 2026", doctor: "Dr. Maria Reyes", rating: 5 },
  { service: "Chemical Peel", clinic: "aesthetic", date: "Mar 18, 2026", doctor: "Dr. Sofia Cruz", rating: 4 },
]

export default function ClientDashboard({ user }: ClientDashboardProps) {
  const [activeClinic, setActiveClinic] = useState<"dental" | "aesthetic">("dental")
  const [activeTab, setActiveTab] = useState<"home" | "book" | "history" | "profile">("home")
  const { logout } = useAuthStore()

  const firstName = user.name?.split(" ")[0] || "there"
  const currentServices = services[activeClinic]

  return (
    <div className="min-h-screen bg-slate-50 font-sans" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* Top Nav */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow">
              <span className="text-white text-sm font-bold">+</span>
            </div>
            <span className="text-slate-900 font-semibold text-sm">ClaraClinic</span>
          </div>

          {/* Clinic Toggle */}
          <div className="bg-slate-100 rounded-xl p-1 flex">
            <button
              onClick={() => setActiveClinic("dental")}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeClinic === "dental"
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              🦷 Dental
            </button>
            <button
              onClick={() => setActiveClinic("aesthetic")}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeClinic === "aesthetic"
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              ✨ Aesthetic
            </button>
          </div>

          {/* User */}
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-slate-50 transition-all">
              <span className="text-slate-400 text-lg">🔔</span>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-600 rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
              <span className="text-sm font-medium text-slate-700 hidden md:block">{user.name}</span>
            </div>
            <button
              onClick={logout}
              className="text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>

        {/* Sub Nav */}
        <div className="max-w-5xl mx-auto px-6 flex gap-1 pb-0">
          {[
            { id: "home", label: "Home" },
            { id: "book", label: "Book Appointment" },
            { id: "history", label: "My History" },
            { id: "profile", label: "Profile" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-700"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* HOME TAB */}
        {activeTab === "home" && (
          <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute right-0 top-0 w-48 h-full opacity-10">
                <div className="w-48 h-48 rounded-full bg-white absolute -right-8 -top-8" />
                <div className="w-32 h-32 rounded-full bg-white absolute right-12 bottom-2" />
              </div>
              <p className="text-blue-200 text-sm font-medium">Welcome back 👋</p>
              <h1 className="text-2xl font-bold mt-0.5">{firstName}</h1>
              <p className="text-blue-100 text-sm mt-2 max-w-sm">
                You have <strong>{upcomingAppointments.length} upcoming appointments</strong>. Your next visit is on June 3.
              </p>
              <button
                onClick={() => setActiveTab("book")}
                className="mt-4 bg-white text-blue-700 text-sm font-semibold px-5 py-2 rounded-xl hover:bg-blue-50 transition-colors"
              >
                Book New Appointment →
              </button>
            </div>

            {/* Upcoming Appointments */}
            <div>
              <h2 className="text-sm font-semibold text-slate-900 mb-3">Upcoming Appointments</h2>
              <div className="space-y-3">
                {upcomingAppointments.map((apt, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 ${
                      apt.clinic === "dental" ? "bg-blue-50" : "bg-purple-50"
                    }`}>
                      {apt.clinic === "dental" ? "🦷" : "✨"}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800">{apt.service}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{apt.doctor} · {apt.date} at {apt.time}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        apt.status === "Confirmed" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {apt.status}
                      </span>
                      <button className="text-xs text-blue-600 font-semibold hover:underline">Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Services */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-slate-900">
                  {activeClinic === "dental" ? "Dental" : "Aesthetic"} Services
                </h2>
                <button onClick={() => setActiveTab("book")} className="text-xs text-blue-600 font-semibold hover:underline">
                  View all →
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {currentServices.slice(0, 3).map((svc, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-2xl">{svc.icon}</span>
                      {svc.tag && (
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          svc.tag === "Premium" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"
                        }`}>
                          {svc.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">{svc.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{svc.duration}</p>
                    <p className="text-sm font-bold text-blue-700 mt-2">{svc.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* BOOK TAB */}
        {activeTab === "book" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Book {activeClinic === "dental" ? "Dental" : "Aesthetic"} Service
              </h1>
              <p className="text-slate-500 text-sm mt-0.5">Choose a service to get started</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {currentServices.map((svc, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                      {svc.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-semibold text-slate-800">{svc.name}</p>
                        {svc.tag && (
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ml-2 flex-shrink-0 ${
                            svc.tag === "Premium" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"
                          }`}>
                            {svc.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{svc.duration}</p>
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-sm font-bold text-blue-700">{svc.price}</p>
                        <button className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors">
                          Book →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HISTORY TAB */}
        {activeTab === "history" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-xl font-bold text-slate-900">My Appointment History</h1>
              <p className="text-slate-500 text-sm mt-0.5">Your past visits and treatments</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-50">
                {pastAppointments.map((apt, i) => (
                  <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/50 transition-colors">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
                      apt.clinic === "dental" ? "bg-blue-50" : "bg-purple-50"
                    }`}>
                      {apt.clinic === "dental" ? "🦷" : "✨"}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800">{apt.service}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{apt.doctor} · {apt.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, star) => (
                        <span key={star} className={`text-sm ${star < apt.rating ? "text-amber-400" : "text-slate-200"}`}>★</span>
                      ))}
                    </div>
                    <button className="text-xs font-semibold text-blue-600 hover:underline">Rebook</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <div className="max-w-xl space-y-6">
            <div>
              <h1 className="text-xl font-bold text-slate-900">My Profile</h1>
              <p className="text-slate-500 text-sm mt-0.5">Manage your account information</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-2xl font-bold">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{user.name}</p>
                  <p className="text-sm text-slate-400">{user.email}</p>
                  <span className="mt-1 inline-block text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full capitalize">
                    {user.role || "Patient"}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Full Name", value: user.name || "—" },
                  { label: "Email Address", value: user.email || "—" },
                  { label: "Patient ID", value: user.id || "—" },
                ].map((field) => (
                  <div key={field.label} className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{field.label}</label>
                    <div className="bg-slate-50 rounded-xl px-4 py-3 text-sm text-slate-700 font-medium">
                      {field.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full py-3 rounded-xl text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors border border-red-100"
            >
              Sign Out
            </button>
          </div>
        )}
      </main>
    </div>
  )
}