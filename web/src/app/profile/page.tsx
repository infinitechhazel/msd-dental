"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  User, Mail, Phone, MapPin, Calendar, Clock,
  ShieldCheck, Lock, Edit, Trash2, Check, Info,
  CalendarPlus, Smile,
} from "lucide-react"
import { useAuthStore } from "@/store/authStore"

type Tab = "profile" | "appointments" | "settings"

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()
}

// ─── mock appointment data (replace with your API fetch) ─────────────────
const UPCOMING = {
  service: "General cleaning & check-up",
  doctor: "Dr. Santos",
  date: "June 10, 2026",
  time: "2:00 PM",
}

const HISTORY = [
  { service: "Dental filling", doctor: "Dr. Santos", date: "March 22, 2026", status: "completed" },
  { service: "Orthodontic consultation", doctor: "Dr. Lim", date: "Jan 15, 2026", status: "completed" },
  { service: "Teeth whitening", doctor: "Dr. Reyes", date: "Nov 3, 2025", status: "cancelled" },
  { service: "General cleaning", doctor: "Dr. Santos", date: "Oct 8, 2025", status: "completed" },
]

export default function ProfilePage() {
  const router = useRouter()
  const { user, isLoggedIn, logout, initializeAuth } = useAuthStore()

  const [mounted, setMounted] = useState(false)
  const [tab, setTab] = useState<Tab>("profile")
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", address: "",
  })
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" })

  useEffect(() => { initializeAuth(); setMounted(true) }, [])
  useEffect(() => { if (mounted && !isLoggedIn) router.replace("/login") }, [mounted, isLoggedIn])

  useEffect(() => {
    if (!user) return
    const [first = "", ...rest] = (user.name ?? "").split(" ")
    setForm({
      firstName: first,
      lastName: rest.join(" "),
      email: user.email ?? "",
      phone: user.phone ?? "",
      address: user.address ?? "",
    })
  }, [user])

  const handleSave = () => {
    // TODO: PATCH /api/profile, then update store
    setSaved(true)
    setTimeout(() => setSaved(false), 2800)
  }

  const handleLogout = () => { logout(); router.push("/") }

  if (!mounted || !user) return null

  const initials = getInitials(user.name ?? "?")

  return (
    <main className="min-h-screen bg-[#020617] pt-[88px] pb-12 px-4">
      <div className="max-w-[680px] mx-auto">

        {/* Page heading */}
        <div className="flex items-center gap-2.5 mb-6">
          <User size={20} className="text-cyan-400" />
          <h1 className="text-[1.15rem] font-medium text-slate-100">My profile</h1>
        </div>

        {/* Hero card */}
        <div className="bg-[#0f172a] border border-white/[0.08] rounded-[20px] p-6 mb-4 flex flex-wrap items-center gap-5">
          <div className="relative group w-[72px] h-[72px] rounded-full bg-[#1A4E8A] border-2 border-cyan-400/25 flex items-center justify-content-center text-blue-300 text-2xl font-medium flex-shrink-0 cursor-pointer overflow-hidden">
            <span className="m-auto">{initials}</span>
            <span className="absolute inset-0 bg-black/50 flex items-center justify-center text-[10px] text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity">
              Change
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[1.05rem] font-medium text-slate-100">{user.name}</p>
            <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              <Badge color="cyan">
                <ShieldCheck size={11} /> Verified
              </Badge>
              {user.role && (
                <Badge color="cyan" dim>
                  {user.role}
                </Badge>
              )}
            </div>
          </div>
          <Link href="/book" className="bg-cyan-400 hover:bg-cyan-300 text-[#020617] font-medium text-sm rounded-xl px-4 py-2.5 flex items-center gap-1.5 transition-colors whitespace-nowrap">
            <CalendarPlus size={15} /> Book appointment
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/[0.04] rounded-xl p-1.5 mb-4">
          {(["profile", "appointments", "settings"] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 text-[13px] rounded-lg capitalize transition-all ${
                tab === t
                  ? "bg-[#0f172a] text-slate-100 border border-white/[0.08]"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── Profile tab ── */}
        {tab === "profile" && (
          <>
            <Card title="Personal information" icon={<User size={13} />}>
              {[
                { icon: <User size={14} />, label: "Full name", val: user.name },
                { icon: <Mail size={14} />, label: "Email", val: user.email },
                { icon: <Phone size={14} />, label: "Phone", val: user.phone ?? "—" },
                { icon: <MapPin size={14} />, label: "Address", val: user.address ?? "—" },
              ].map(r => <InfoRow key={r.label} {...r} />)}
            </Card>

            <Card title="Account information" icon={<ShieldCheck size={13} />}>
              <div className="flex justify-between items-center py-2.5 border-b border-white/[0.05]">
                <span className="text-[13px] text-slate-500 flex items-center gap-2">
                  <Mail size={14} /> Email status
                </span>
                <Badge color="green"><Check size={11} /> Verified</Badge>
              </div>
              {[
                { icon: <Calendar size={14} />, label: "Member since", val: "January 12, 2024" },
                { icon: <Clock size={14} />, label: "Last login", val: "May 26, 2026" },
              ].map(r => <InfoRow key={r.label} {...r} />)}
            </Card>
          </>
        )}

        {/* ── Appointments tab ── */}
        {tab === "appointments" && (
          <>
            <p className={sectionLabel}>Next appointment</p>
            {UPCOMING ? (
              <div className="bg-[#0c1e30] border border-cyan-400/[0.18] rounded-[14px] p-4 mb-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 flex-shrink-0">
                  <Calendar size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-slate-200">{UPCOMING.service}</p>
                  <p className="text-[12px] text-slate-500 mt-0.5">
                    {UPCOMING.date} · {UPCOMING.time} · {UPCOMING.doctor}
                  </p>
                </div>
                <Badge color="cyan">Upcoming</Badge>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 text-sm mb-4">
                No upcoming appointments.{" "}
                <Link href="/book" className="text-cyan-400 hover:underline">Book one now</Link>
              </div>
            )}

            <p className={sectionLabel}>Appointment history</p>
            <Card>
              {HISTORY.map((a, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5 border-b border-white/[0.05] last:border-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[13px] flex-shrink-0 ${
                    a.status === "completed"
                      ? "bg-white/[0.05] text-slate-500"
                      : "bg-red-400/[0.08] text-red-400"
                  }`}>
                    {a.status === "completed" ? <Check size={13} /> : "✕"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-slate-200 font-medium truncate">{a.service}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{a.doctor} · {a.date}</p>
                  </div>
                  <span className={`text-[11px] px-2.5 py-1 rounded-full border ${
                    a.status === "completed"
                      ? "bg-white/[0.04] text-slate-500 border-white/[0.08]"
                      : "bg-red-400/[0.07] text-red-400 border-red-400/[0.15]"
                  }`}>
                    {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                  </span>
                </div>
              ))}
            </Card>
          </>
        )}

        {/* ── Settings tab ── */}
        {tab === "settings" && (
          <>
            {saved && (
              <div className="flex items-center gap-2 text-cyan-400 text-[13px] bg-[#0f172a] border border-cyan-400/30 rounded-xl px-4 py-2.5 mb-3">
                <Check size={14} /> Changes saved successfully
              </div>
            )}

            <Card title="Update profile" icon={<Edit size={13} />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="First name">
                  <Input value={form.firstName} onChange={v => setForm(f => ({ ...f, firstName: v }))} />
                </Field>
                <Field label="Last name">
                  <Input value={form.lastName} onChange={v => setForm(f => ({ ...f, lastName: v }))} />
                </Field>
                <Field label="Email">
                  <Input type="email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} />
                </Field>
                <Field label="Phone">
                  <Input type="tel" value={form.phone} onChange={v => setForm(f => ({ ...f, phone: v }))} />
                </Field>
                <Field label="Address" full>
                  <Input value={form.address} onChange={v => setForm(f => ({ ...f, address: v }))} />
                </Field>
              </div>
              <FormActions onSave={handleSave} />
            </Card>

            <Card title="Change password" icon={<Lock size={13} />}>
              <div className="space-y-3">
                <Field label="Current password">
                  <Input type="password" placeholder="Enter current password"
                    value={pw.current} onChange={v => setPw(p => ({ ...p, current: v }))} />
                </Field>
                <Field label="New password">
                  <Input type="password" placeholder="At least 8 characters"
                    value={pw.next} onChange={v => setPw(p => ({ ...p, next: v }))} />
                </Field>
                <Field label="Confirm new password">
                  <Input type="password" placeholder="Repeat new password"
                    value={pw.confirm} onChange={v => setPw(p => ({ ...p, confirm: v }))} />
                </Field>
                <p className="text-xs text-slate-500 bg-cyan-400/[0.04] border border-cyan-400/10 rounded-lg px-3 py-2.5 leading-relaxed flex gap-2">
                  <Info size={13} className="shrink-0 mt-0.5 text-cyan-400/60" />
                  You will be signed out of all devices after changing your password.
                </p>
              </div>
              <FormActions onSave={handleSave} label="Update password" />
            </Card>

            <div className="border border-red-400/[0.18] rounded-xl p-4 flex items-center justify-between gap-3 flex-wrap">
              <div>
                <p className="text-[13px] font-medium text-red-300">Delete account</p>
                <p className="text-xs text-slate-500 mt-0.5">This action is permanent and cannot be undone.</p>
              </div>
              <button className="flex items-center gap-1.5 text-[13px] text-red-400 bg-red-400/[0.08] hover:bg-red-400/[0.14] border border-red-400/[0.18] rounded-lg px-4 py-2 transition-colors">
                <Trash2 size={13} /> Delete account
              </button>
            </div>
          </>
        )}

      </div>
    </main>
  )
}

// ─── Shared style helpers ────────────────────────────────────────────────
const sectionLabel = "text-[11px] font-medium text-slate-500 uppercase tracking-widest mb-2.5"
const inputCls = "w-full bg-white/[0.04] border border-white/[0.08] focus:border-cyan-400/40 rounded-lg px-3 py-2.5 text-[13px] text-slate-200 outline-none transition-colors placeholder:text-slate-600 font-[inherit]"

function Card({ title, icon, children }: { title?: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-[#0f172a] border border-white/[0.08] rounded-2xl p-5 mb-3.5">
      {title && (
        <p className="text-[11px] font-medium text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          {icon} {title}
        </p>
      )}
      {children}
    </div>
  )
}

function InfoRow({ icon, label, val }: { icon: React.ReactNode; label: string; val?: string }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-white/[0.05] last:border-0">
      <span className="text-[13px] text-slate-500 flex items-center gap-2">{icon} {label}</span>
      <span className="text-[13px] text-slate-300 font-medium text-right max-w-[55%] truncate">{val ?? "—"}</span>
    </div>
  )
}

function Badge({ color, dim, children }: { color: "cyan" | "green"; dim?: boolean; children: React.ReactNode }) {
  const styles = {
    cyan: dim
      ? "bg-cyan-400/[0.06] text-cyan-400/70 border-cyan-400/10"
      : "bg-cyan-400/10 text-cyan-400 border-cyan-400/20",
    green: "bg-green-400/10 text-green-400 border-green-400/20",
  }
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full border ${styles[color]}`}>
      {children}
    </span>
  )
}

function Field({ label, full, children }: { label: string; full?: boolean; children: React.ReactNode }) {
  return (
    <div className={full ? "col-span-full" : ""}>
      <label className="block text-[11px] text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>
      {children}
    </div>
  )
}

function Input({ value, onChange, type = "text", placeholder }: {
  value?: string; onChange?: (v: string) => void
  type?: string; placeholder?: string
}) {
  return (
    <input
      className={inputCls}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={e => onChange?.(e.target.value)}
    />
  )
}

function FormActions({ onSave, label = "Save changes" }: { onSave: () => void; label?: string }) {
  return (
    <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-white/[0.06]">
      <button className="text-[13px] text-slate-400 bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 hover:bg-white/[0.09] transition-colors">
        Cancel
      </button>
      <button
        onClick={onSave}
        className="text-[13px] font-medium text-[#020617] bg-cyan-400 hover:bg-cyan-300 rounded-lg px-4 py-2 transition-colors"
      >
        {label}
      </button>
    </div>
  )
}