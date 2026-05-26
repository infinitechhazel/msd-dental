"use client"

import { useState } from "react"
import {
  Sparkles,
  CalendarDays,
  Clock3,
  ShieldCheck,
  ChevronRight,
  Star,
  LogOut,
} from "lucide-react"

import { useAuthStore } from "@/store/authStore"
import ProtectedNav from "../layout/ProtectedNavbar"

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
    { name: "Dental Cleaning", price: "₱1,500", duration: "45 min", tag: "Popular" },
    { name: "Teeth Whitening", price: "₱4,500", duration: "60 min", tag: "Premium" },
    { name: "Braces Consultation", price: "₱500", duration: "30 min", tag: null },
    { name: "Root Canal", price: "₱8,000", duration: "90 min", tag: null },
    { name: "Tooth Extraction", price: "₱1,200", duration: "30 min", tag: null },
    { name: "Dental Implant", price: "₱35,000", duration: "120 min", tag: "Premium" },
  ],
  aesthetic: [
    { name: "Botox Treatment", price: "₱12,000", duration: "30 min", tag: "Popular" },
    { name: "Dermal Filler", price: "₱18,000", duration: "45 min", tag: "Premium" },
    { name: "Chemical Peel", price: "₱3,500", duration: "60 min", tag: null },
    { name: "Laser Resurfacing", price: "₱9,500", duration: "75 min", tag: "Premium" },
    { name: "PRP Therapy", price: "₱6,500", duration: "60 min", tag: null },
    { name: "Hydrafacial", price: "₱4,500", duration: "60 min", tag: "Popular" },
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
  {
    service: "Botox Treatment",
    clinic: "aesthetic",
    date: "May 10, 2026",
    doctor: "Dr. Sofia Cruz",
    rating: 5,
  },
  {
    service: "Dental Cleaning",
    clinic: "dental",
    date: "Apr 22, 2026",
    doctor: "Dr. Maria Reyes",
    rating: 5,
  },
]

export default function ClientDashboard({
  user,
}: ClientDashboardProps) {
  const [activeClinic, setActiveClinic] = useState<
    "dental" | "aesthetic"
  >("dental")

  const [activeTab, setActiveTab] = useState<
    "home" | "book" | "history" | "profile"
  >("home")

  const { logout } = useAuthStore()

  const firstName = user.name?.split(" ")[0] || "Guest"
  const currentServices = services[activeClinic]

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <ProtectedNav userRole={user.role as "admin" | "user"} />

      <main className="w-full lg:pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 pb-28 lg:pb-10">

          {/* TOP BAR */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <p className="text-sm text-slate-500 font-medium">
                Welcome back
              </p>

              <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900">
                {firstName}
              </h1>
            </div>

            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl p-1 shadow-sm w-full md:w-auto">
              <button
                onClick={() => setActiveClinic("dental")}
                className={`flex-1 md:flex-none px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeClinic === "dental"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Dental
              </button>

              <button
                onClick={() => setActiveClinic("aesthetic")}
                className={`flex-1 md:flex-none px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeClinic === "aesthetic"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Aesthetic
              </button>
            </div>
          </div>

          {/* HOME */}
          {activeTab === "home" && (
            <div className="space-y-8">

              {/* HERO */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-slate-900 p-6 md:p-10 text-white shadow-2xl">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute -top-20 -right-10 h-72 w-72 rounded-full border border-white" />
                  <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full border border-white" />
                </div>

                <div className="relative z-10 max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-sm font-medium border border-white/10">
                    <ShieldCheck className="h-4 w-4" />
                    Premium Patient Portal
                  </div>

                  <h2 className="mt-5 text-3xl md:text-5xl font-bold leading-tight">
                    Your care experience,
                    simplified.
                  </h2>

                  <p className="mt-4 text-blue-100 text-sm md:text-base leading-relaxed">
                    Manage appointments, explore treatments, and
                    access your records in one seamless platform.
                  </p>

                  <button
                    onClick={() => setActiveTab("book")}
                    className="mt-6 inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-3 rounded-2xl text-sm font-semibold hover:bg-slate-100 transition-all"
                  >
                    Book Appointment
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* APPOINTMENTS */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">
                    Upcoming Appointments
                  </h3>

                  <button className="text-sm font-semibold text-blue-600">
                    View all
                  </button>
                </div>

                <div className="grid gap-4">
                  {upcomingAppointments.map((apt, i) => (
                    <div
                      key={i}
                      className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:shadow-lg transition-all"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between">

                        <div className="flex items-start gap-4">
                          <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                            <CalendarDays className="h-6 w-6 text-blue-600" />
                          </div>

                          <div>
                            <h4 className="font-semibold text-slate-900 text-base">
                              {apt.service}
                            </h4>

                            <p className="text-sm text-slate-500 mt-1">
                              {apt.doctor}
                            </p>

                            <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-slate-600">
                              <div className="flex items-center gap-1">
                                <CalendarDays className="h-4 w-4" />
                                {apt.date}
                              </div>

                              <div className="flex items-center gap-1">
                                <Clock3 className="h-4 w-4" />
                                {apt.time}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`px-4 py-2 rounded-full text-xs font-semibold ${
                              apt.status === "Confirmed"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                : "bg-amber-50 text-amber-700 border border-amber-100"
                            }`}
                          >
                            {apt.status}
                          </span>

                          <button className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium hover:bg-slate-50 transition-colors">
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* SERVICES */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">
                    Featured Services
                  </h3>

                  <button
                    onClick={() => setActiveTab("book")}
                    className="text-sm font-semibold text-blue-600"
                  >
                    Browse all
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {currentServices.map((svc, i) => (
                    <div
                      key={i}
                      className="group bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                          <Sparkles className="h-6 w-6 text-blue-600" />
                        </div>

                        {svc.tag && (
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              svc.tag === "Premium"
                                ? "bg-slate-900 text-white"
                                : "bg-blue-50 text-blue-700"
                            }`}
                          >
                            {svc.tag}
                          </span>
                        )}
                      </div>

                      <div className="mt-6">
                        <h4 className="font-semibold text-lg text-slate-900">
                          {svc.name}
                        </h4>

                        <p className="text-sm text-slate-500 mt-1">
                          {svc.duration}
                        </p>

                        <div className="mt-5 flex items-center justify-between">
                          <p className="text-2xl font-bold text-blue-700">
                            {svc.price}
                          </p>

                          <button className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-blue-600 transition-colors">
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* PROFILE */}
          {activeTab === "profile" && (
            <div className="max-w-3xl">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

                <div className="bg-gradient-to-r from-blue-700 to-slate-900 p-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div className="h-24 w-24 rounded-3xl bg-white/10 border border-white/10 backdrop-blur flex items-center justify-center text-white text-3xl font-bold">
                      {user.name?.charAt(0)?.toUpperCase()}
                    </div>

                    <div className="text-white">
                      <h2 className="text-2xl font-bold">
                        {user.name}
                      </h2>

                      <p className="text-blue-100 mt-1">
                        {user.email}
                      </p>

                      <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium">
                        <ShieldCheck className="h-4 w-4" />
                        {user.role || "Patient"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-5">
                  {[
                    {
                      label: "Full Name",
                      value: user.name || "—",
                    },
                    {
                      label: "Email Address",
                      value: user.email || "—",
                    },
                    {
                      label: "Patient ID",
                      value: user.id || "—",
                    },
                  ].map((field) => (
                    <div key={field.label}>
                      <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                        {field.label}
                      </p>

                      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-800 font-medium">
                        {field.value}
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={logout}
                    className="w-full mt-6 flex items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 py-4 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* HISTORY */}
          {activeTab === "history" && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Appointment History
              </h2>

              <div className="space-y-4">
                {pastAppointments.map((apt, i) => (
                  <div
                    key={i}
                    className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                      <div>
                        <h4 className="font-semibold text-slate-900">
                          {apt.service}
                        </h4>

                        <p className="text-sm text-slate-500 mt-1">
                          {apt.doctor} • {apt.date}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          {Array.from({ length: apt.rating }).map(
                            (_, idx) => (
                              <Star
                                key={idx}
                                className="h-4 w-4 fill-amber-400 text-amber-400"
                              />
                            )
                          )}
                        </div>

                        <button className="text-sm font-semibold text-blue-600">
                          Rebook
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}