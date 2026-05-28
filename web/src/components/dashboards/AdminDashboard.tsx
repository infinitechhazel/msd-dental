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

interface AdminDashboardProps {
  user: User
}

const stats = {
  dental: [
    { label: "Today's Appointments", value: "24", delta: "+3", icon: "🦷" },
    { label: "Active Patients", value: "1,248", delta: "+12", icon: "👥" },
    { label: "Monthly Revenue", value: "₱482,000", delta: "+8.2%", icon: "💰" },
    { label: "Pending Follow-ups", value: "17", delta: "-5", icon: "📋" },
  ],
  aesthetic: [
    { label: "Today's Appointments", value: "18", delta: "+2", icon: "✨" },
    { label: "Active Patients", value: "876", delta: "+9", icon: "👥" },
    { label: "Monthly Revenue", value: "₱694,500", delta: "+14.7%", icon: "💰" },
    { label: "Pending Follow-ups", value: "8", delta: "-2", icon: "📋" },
  ],
}

const recentAppointments = {
  dental: [
    { patient: "Maria Santos", service: "Dental Cleaning", time: "09:00 AM", status: "Confirmed", avatar: "MS" },
    { patient: "Juan dela Cruz", service: "Root Canal", time: "10:30 AM", status: "In Progress", avatar: "JC" },
    { patient: "Ana Reyes", service: "Teeth Whitening", time: "12:00 PM", status: "Confirmed", avatar: "AR" },
    { patient: "Carlo Mendoza", service: "Braces Adjustment", time: "02:00 PM", status: "Pending", avatar: "CM" },
    { patient: "Liza Bautista", service: "Tooth Extraction", time: "03:30 PM", status: "Confirmed", avatar: "LB" },
  ],
  aesthetic: [
    { patient: "Sofia Villanueva", service: "Botox Treatment", time: "09:30 AM", status: "Confirmed", avatar: "SV" },
    { patient: "Marco Garcia", service: "Facial Filler", time: "11:00 AM", status: "In Progress", avatar: "MG" },
    { patient: "Nina Torres", service: "Laser Skin Resurfacing", time: "01:00 PM", status: "Confirmed", avatar: "NT" },
    { patient: "Diego Ramos", service: "PRP Therapy", time: "02:30 PM", status: "Pending", avatar: "DR" },
    { patient: "Camille Ocampo", service: "Chemical Peel", time: "04:00 PM", status: "Confirmed", avatar: "CO" },
  ],
}

const navItems = [
  { icon: "⊞", label: "Overview", id: "overview" },
  { icon: "📅", label: "Appointments", id: "appointments" },
  { icon: "👥", label: "Patients", id: "patients" },
  { icon: "📊", label: "Analytics", id: "analytics" },
  { icon: "💊", label: "Inventory", id: "inventory" },
  { icon: "⚙️", label: "Settings", id: "settings" },
]

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [activeClinic, setActiveClinic] = useState<"dental" | "aesthetic">("dental")
  const [activeNav, setActiveNav] = useState("overview")
  const { logout } = useAuthStore()

  const currentStats = stats[activeClinic]
  const currentAppointments = recentAppointments[activeClinic]

  const statusColor = (status: string) => {
    if (status === "Confirmed") return "bg-emerald-100 text-emerald-700"
    if (status === "In Progress") return "bg-blue-100 text-blue-700"
    return "bg-amber-100 text-amber-700"
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-10 shadow-sm">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md">
              <span className="text-white text-base font-bold">+</span>
            </div>
            <div>
              <p className="text-slate-900 font-semibold text-sm leading-tight">ClaraClinic</p>
              <p className="text-slate-400 text-xs">Admin Portal</p>
            </div>
          </div>
        </div>

        {/* Clinic Toggle */}
        <div className="px-4 pt-4 pb-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 px-2">Clinic</p>
          <div className="bg-slate-100 rounded-xl p-1 flex">
            <button
              onClick={() => setActiveClinic("dental")}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeClinic === "dental"
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              🦷 Dental
            </button>
            <button
              onClick={() => setActiveClinic("aesthetic")}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeClinic === "aesthetic"
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              ✨ Aesthetic
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-3 space-y-0.5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 px-2 pt-2">Navigation</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeNav === item.id
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
              {activeNav === item.id && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
              )}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">
                {user.name?.charAt(0)?.toUpperCase() || "A"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">{user.name || "Admin"}</p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="mt-2 w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all font-medium"
          >
            <span>→</span> Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {activeClinic === "dental" ? "Dental Clinic" : "Aesthetic Clinic"} — Dashboard
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">
              {new Date().toLocaleDateString("en-PH", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all border border-blue-100">
              + New Appointment
            </button>
            <button className="relative p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-all">
              <span className="text-slate-500">🔔</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {currentStats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{stat.icon}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  stat.delta.startsWith("+") ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                }`}>
                  {stat.delta}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Appointments Table */}
          <div className="col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
              <h2 className="text-sm font-semibold text-slate-900">Today's Appointments</h2>
              <button className="text-xs text-blue-600 font-semibold hover:underline">View all →</button>
            </div>
            <div className="divide-y divide-slate-50">
              {currentAppointments.map((apt, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-3.5 hover:bg-slate-50/50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">{apt.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800">{apt.patient}</p>
                    <p className="text-xs text-slate-400 truncate">{apt.service}</p>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{apt.time}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor(apt.status)}`}>
                    {apt.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions + Metrics */}
          <div className="flex flex-col gap-4">
            {/* Revenue Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-5 text-white">
              <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-1">Monthly Revenue</p>
              <p className="text-3xl font-bold tracking-tight">
                {activeClinic === "dental" ? "₱482K" : "₱694K"}
              </p>
              <p className="text-blue-200 text-xs mt-1">
                {activeClinic === "dental" ? "+8.2% vs last month" : "+14.7% vs last month"}
              </p>
              <div className="mt-4 flex gap-1">
                {[40, 65, 50, 80, 70, 90, 85].map((h, i) => (
                  <div key={i} className="flex-1 bg-blue-500/40 rounded-sm" style={{ height: `${h * 0.5}px`, alignSelf: "flex-end" }} />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { label: "Book Appointment", icon: "📅" },
                  { label: "Add Patient", icon: "👤" },
                  { label: "Generate Report", icon: "📊" },
                  { label: "Send Reminder", icon: "📨" },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 transition-all text-left"
                  >
                    <span>{action.icon}</span>
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}