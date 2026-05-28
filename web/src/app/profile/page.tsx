"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock3,
  ShieldCheck,
  Lock,
  Edit3,
  Trash2,
  Check,
  Info,
  CalendarPlus,
  X,
} from "lucide-react"

import { useAuthStore } from "@/store/authStore"
import ProtectedNav from "@/components/layout/ProtectedNavbar"

type Tab = "profile" | "settings"

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

const UPCOMING = {
  service: "General Cleaning & Check-Up",
  doctor: "Dr. Santos",
  date: "June 10, 2026",
  time: "2:00 PM",
}

const HISTORY = [
  {
    service: "Dental Filling",
    doctor: "Dr. Santos",
    date: "March 22, 2026",
    status: "completed",
  },
  {
    service: "Orthodontic Consultation",
    doctor: "Dr. Lim",
    date: "January 15, 2026",
    status: "completed",
  },
  {
    service: "Teeth Whitening",
    doctor: "Dr. Reyes",
    date: "November 3, 2025",
    status: "cancelled",
  },
]

export default function ProfilePage() {
  const router = useRouter()

  const {
    user,
    isLoggedIn,
    logout,
    initializeAuth,
  } = useAuthStore()

  const [mounted, setMounted] = useState(false)
  const [tab, setTab] = useState<Tab>("profile")
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })

  const [pw, setPw] = useState({
    current: "",
    next: "",
    confirm: "",
  })

  useEffect(() => {
    initializeAuth()
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isLoggedIn) {
      router.replace("/login")
    }
  }, [mounted, isLoggedIn])

  useEffect(() => {
    if (!user) return

    const [first = "", ...rest] = (user.name ?? "").split(" ")

    setForm({
      firstName: first,
      lastName: rest.join(" "),
      email: user.email ?? "",
      phone: user.phone ?? "",
    })
  }, [user])

  const handleSave = () => {
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2500)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!mounted || !user) return null

  const initials = getInitials(user.name ?? "?")

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <ProtectedNav userRole={user.role} />

      <main className="lg:pl-64">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 pb-28 lg:pb-10">

          {/* HEADER */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Account Center
              </p>

              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mt-1">
                My Profile
              </h1>
            </div>

            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-all"
            >
              <CalendarPlus className="h-4 w-4" />
              Book Appointment
            </Link>
          </div>

          {/* PROFILE HERO */}
          <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm mb-6">

            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-50" />

            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">

                <div className="h-24 w-24 rounded-[28px] bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {initials}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3">

                    <h2 className="text-2xl font-bold text-slate-900">
                      {user.name}
                    </h2>

                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Verified
                    </span>
                  </div>

                  <p className="text-slate-500 mt-2">
                    {user.email}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                        Member Since
                      </p>

                      <p className="text-sm font-semibold text-slate-800 mt-1">
                        January 2024
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                        Role
                      </p>

                      <p className="text-sm font-semibold capitalize text-slate-800 mt-1">
                        {user.role || "Patient"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TABS */}
          <div className="mb-6 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
            {(["profile", "settings"] as Tab[]).map(
              (t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 min-w-[120px] rounded-xl px-4 py-3 text-sm font-semibold capitalize transition-all ${
                    tab === t
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {t}
                </button>
              )
            )}
          </div>

          {/* PROFILE TAB */}
          {tab === "profile" && (
            <div className="grid gap-6 lg:grid-cols-2">

              <Card
                title="Personal Information"
                icon={<User className="h-4 w-4" />}
              >
                <InfoRow
                  icon={<User className="h-4 w-4" />}
                  label="Full Name"
                  value={user.name}
                />

                <InfoRow
                  icon={<Mail className="h-4 w-4" />}
                  label="Email Address"
                  value={user.email}
                />

                <InfoRow
                  icon={<Phone className="h-4 w-4" />}
                  label="Phone Number"
                  value={user.phone || "Not provided"}
                />
              </Card>

              <Card
                title="Account Information"
                icon={<ShieldCheck className="h-4 w-4" />}
              >
                <InfoRow
                  icon={<Calendar className="h-4 w-4" />}
                  label="Member Since"
                  value="January 12, 2024"
                />

                <InfoRow
                  icon={<Clock3 className="h-4 w-4" />}
                  label="Last Login"
                  value="May 26, 2026"
                />

                <InfoRow
                  icon={<ShieldCheck className="h-4 w-4" />}
                  label="Verification Status"
                  value="Verified"
                />
              </Card>
            </div>
          )}

          {/* SETTINGS */}
          {tab === "settings" && (
            <div className="space-y-6">

              {saved && (
                <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700">
                  <Check className="h-4 w-4" />
                  Changes saved successfully.
                </div>
              )}

              <Card
                title="Update Profile"
                icon={<Edit3 className="h-4 w-4" />}
              >
                <div className="grid gap-5 sm:grid-cols-2">

                  <Field label="First Name">
                    <Input
                      value={form.firstName}
                      onChange={(v) =>
                        setForm((f) => ({
                          ...f,
                          firstName: v,
                        }))
                      }
                    />
                  </Field>

                  <Field label="Last Name">
                    <Input
                      value={form.lastName}
                      onChange={(v) =>
                        setForm((f) => ({
                          ...f,
                          lastName: v,
                        }))
                      }
                    />
                  </Field>

                  <Field label="Email Address">
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(v) =>
                        setForm((f) => ({
                          ...f,
                          email: v,
                        }))
                      }
                    />
                  </Field>

                  <Field label="Phone Number">
                    <Input
                      value={form.phone}
                      onChange={(v) =>
                        setForm((f) => ({
                          ...f,
                          phone: v,
                        }))
                      }
                    />
                  </Field>
                </div>

                <FormActions onSave={handleSave} />
              </Card>

              <Card
                title="Change Password"
                icon={<Lock className="h-4 w-4" />}
              >
                <div className="space-y-5">

                  <Field label="Current Password">
                    <Input
                      type="password"
                      placeholder="Enter current password"
                      value={pw.current}
                      onChange={(v) =>
                        setPw((p) => ({
                          ...p,
                          current: v,
                        }))
                      }
                    />
                  </Field>

                  <Field label="New Password">
                    <Input
                      type="password"
                      placeholder="At least 8 characters"
                      value={pw.next}
                      onChange={(v) =>
                        setPw((p) => ({
                          ...p,
                          next: v,
                        }))
                      }
                    />
                  </Field>

                  <Field label="Confirm Password">
                    <Input
                      type="password"
                      placeholder="Repeat new password"
                      value={pw.confirm}
                      onChange={(v) =>
                        setPw((p) => ({
                          ...p,
                          confirm: v,
                        }))
                      }
                    />
                  </Field>

                  <div className="flex gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />

                    <p className="text-sm leading-relaxed text-slate-600">
                      Changing your password will sign you out
                      from all active devices for security.
                    </p>
                  </div>
                </div>

                <FormActions
                  onSave={handleSave}
                  label="Update Password"
                />
              </Card>

              <div className="rounded-3xl border border-red-200 bg-white p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                  <div>
                    <h3 className="font-bold text-red-600">
                      Delete Account
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      This action is permanent and cannot be undone.
                    </p>
                  </div>

                  <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors">
                    <Trash2 className="h-4 w-4" />
                    Delete Account
                  </button>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full rounded-2xl border border-slate-200 bg-white py-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

/* COMPONENTS */

function Card({
  title,
  icon,
  children,
}: {
  title?: string
  icon?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      {title && (
        <div className="flex items-center gap-2 mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            {icon}
          </div>

          <h3 className="text-lg font-bold text-slate-900">
            {title}
          </h3>
        </div>
      )}

      {children}
    </div>
  )
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value?: string
}) {
  return (
    <div className="flex items-center justify-between gap-5 border-b border-slate-100 py-4 last:border-0">
      <div className="flex items-center gap-3 text-slate-500">
        {icon}

        <span className="text-sm font-medium">
          {label}
        </span>
      </div>

      <p className="max-w-[55%] truncate text-right text-sm font-semibold text-slate-800">
        {value || "—"}
      </p>
    </div>
  )
}

function Field({
  label,
  children,
  full,
}: {
  label: string
  children: React.ReactNode
  full?: boolean
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      {children}
    </div>
  )
}

function Input({
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  value?: string
  onChange?: (v: string) => void
  type?: string
  placeholder?: string
}) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
    />
  )
}

function FormActions({
  onSave,
  label = "Save Changes",
}: {
  onSave: () => void
  label?: string
}) {
  return (
    <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3 border-t border-slate-100 pt-6">

      <button className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
        Cancel
      </button>

      <button
        onClick={onSave}
        className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
      >
        {label}
      </button>
    </div>
  )
}