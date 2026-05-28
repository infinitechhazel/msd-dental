"use client"

import { useState } from "react"
import ProtectedNav from "@/components/layout/ProtectedNavbar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, CheckCircle2, History } from "lucide-react"

type Tab = "ongoing" | "upcoming" | "history"

const ongoingAppointments = [
  {
    service: "Dental Cleaning",
    date: "June 3, 2026",
    time: "10:00 AM",
    status: "In Progress",
  },
]

const upcomingAppointments = [
  {
    service: "Teeth Whitening",
    date: "June 15, 2026",
    time: "2:00 PM",
    status: "Confirmed",
  },
  {
    service: "Skin Rejuvenation",
    date: "June 22, 2026",
    time: "1:00 PM",
    status: "Pending",
  },
]

const historyAppointments = [
  {
    service: "Botox Treatment",
    date: "May 10, 2026",
    time: "11:00 AM",
    status: "Completed",
  },
  {
    service: "Dental Filling",
    date: "April 22, 2026",
    time: "3:00 PM",
    status: "Completed",
  },
]

export default function AppointmentsPage() {
  const [tab, setTab] = useState<Tab>("ongoing")

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <ProtectedNav />

      <main className="lg:pl-64">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">
              Appointments
            </h1>
            <p className="text-slate-500 mt-1">
              Manage your ongoing, upcoming, and past visits
            </p>
          </div>

          {/* Tabs */}
          <div className="flex bg-white border border-slate-200 rounded-2xl p-1 mb-8 w-full sm:w-fit">
            {(["ongoing", "upcoming", "history"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2 text-sm rounded-xl transition-all capitalize ${
                  tab === t
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* CONTENT */}
          <div className="space-y-4">

            {/* Ongoing */}
            {tab === "ongoing" && (
              <Section title="Ongoing Appointment">
                {ongoingAppointments.length ? (
                  ongoingAppointments.map((a, i) => (
                    <AppointmentCard key={i} data={a} variant="active" />
                  ))
                ) : (
                  <EmptyState text="No ongoing appointments" />
                )}
              </Section>
            )}

            {/* Upcoming */}
            {tab === "upcoming" && (
              <Section title="Upcoming Appointments">
                {upcomingAppointments.length ? (
                  upcomingAppointments.map((a, i) => (
                    <AppointmentCard key={i} data={a} variant="upcoming" />
                  ))
                ) : (
                  <EmptyState text="No upcoming appointments" />
                )}
              </Section>
            )}

            {/* History */}
            {tab === "history" && (
              <Section title="Appointment History">
                {historyAppointments.length ? (
                  historyAppointments.map((a, i) => (
                    <AppointmentCard key={i} data={a} variant="history" />
                  ))
                ) : (
                  <EmptyState text="No past appointments" />
                )}
              </Section>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

/* ---------------- UI COMPONENTS ---------------- */

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function AppointmentCard({
  data,
  variant,
}: {
  data: any
  variant: "active" | "upcoming" | "history"
}) {
  const statusColor =
    variant === "active"
      ? "text-blue-600 bg-blue-50 border-blue-100"
      : variant === "upcoming"
      ? "text-amber-600 bg-amber-50 border-amber-100"
      : "text-emerald-600 bg-emerald-50 border-emerald-100"

  return (
    <Card className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        {/* LEFT */}
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
            <Calendar className="h-5 w-5 text-slate-600" />
          </div>

          <div>
            <p className="font-semibold text-slate-900">
              {data.service}
            </p>

            <div className="flex flex-wrap gap-3 text-sm text-slate-500 mt-1">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {data.date}
              </span>

              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {data.time}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          <Badge className={`border ${statusColor}`}>
            {data.status}
          </Badge>

          {variant !== "history" && (
            <Button
              variant="outline"
              className="rounded-xl border-slate-200"
            >
              Details
            </Button>
          )}

          {variant === "history" && (
            <Button
              variant="outline"
              className="rounded-xl border-slate-200"
            >
              Rebook
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="text-center py-16 border border-dashed border-slate-200 rounded-2xl bg-white">
      <p className="text-slate-500 text-sm">{text}</p>
    </div>
  )
}