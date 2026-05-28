"use client"
import { useState } from "react"
import {
  Calendar,
  Clock3,
  User,
  Mail,
  Phone,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react"

import { motion } from "framer-motion"

import ProtectedNav from "@/components/layout/ProtectedNavbar"
import { useAuthStore } from "@/store/authStore"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const fade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

const services = [
  {
    value: "implants",
    label: "Dental Implants",
    duration: "2–3 hours",
    price: "₱2,500+",
  },
  {
    value: "whitening",
    label: "Teeth Whitening",
    duration: "45 minutes",
    price: "₱350",
  },
  {
    value: "orthodontics",
    label: "Orthodontics",
    duration: "Consultation",
    price: "₱150",
  },
  {
    value: "skin",
    label: "Skin Rejuvenation",
    duration: "60 minutes",
    price: "₱450",
  },
  {
    value: "contouring",
    label: "Facial Contouring",
    duration: "45–90 minutes",
    price: "₱800+",
  },
  {
    value: "antiaging",
    label: "Anti-Aging Treatment",
    duration: "60–90 minutes",
    price: "₱600+",
  },
]

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
]

function generateDays() {
  const days = []
  const now = new Date()

  for (let i = 1; i <= 28; i++) {
    const d = new Date(now)

    d.setDate(now.getDate() + i)

    if (d.getDay() !== 0) {
      days.push(d)
    }
  }

  return days
}

export default function BookPage() {
  const router = useRouter()

  const { user, isLoggedIn } = useAuthStore()

  const [service, setService] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState("")
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [phone, setPhone] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const days = generateDays()

  const selectedService = services.find((s) => s.value === service)

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login?redirect=/book")
    }
  }, [isLoggedIn, router])

  // prevent flashing page while redirecting
  if (!isLoggedIn) {
    return null
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f8fafc]">
        <ProtectedNav userRole={user?.role} />

        <div className="flex min-h-screen items-center justify-center px-6 lg:pl-64">
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-lg text-center"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 border border-emerald-100">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900">
              Appointment Confirmed
            </h1>

            <p className="mt-4 text-slate-600 leading-relaxed">
              Your appointment for{" "}
              <span className="font-semibold text-slate-900">
                {selectedService?.label}
              </span>{" "}
              has been scheduled on{" "}
              <span className="font-semibold text-slate-900">
                {selectedDate?.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </span>{" "}
              at{" "}
              <span className="font-semibold text-slate-900">
                {selectedTime}
              </span>
              .
            </p>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">
                A confirmation email has been sent to
              </p>

              <p className="mt-1 font-semibold text-slate-900">{email}</p>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <ProtectedNav userRole={user?.role} />

      <main className="lg:pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 pb-28 lg:pb-10">
          {/* HEADER */}
          <motion.div {...fade} className="mb-10">
            <h1 className="mt-5 text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              Schedule Your Visit
            </h1>

            <p className="mt-4 max-w-2xl text-slate-600 leading-relaxed">
              Book your dental or aesthetic appointment through our modern
              patient experience platform.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">
              {/* SERVICE */}
              <motion.div {...fade}>
                <Card className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
                  <SectionTitle step="01" title="Select Service" />

                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger className="h-14 rounded-2xl border-slate-200 bg-slate-50 text-slate-900 focus:ring-4 focus:ring-blue-100">
                      <SelectValue placeholder="Choose a treatment or service" />
                    </SelectTrigger>

                    <SelectContent>
                      {services.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Card>
              </motion.div>

              {/* DATE */}
              <motion.div {...fade}>
                <Card className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
                  <SectionTitle step="02" title="Choose Date" />

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
                    {days.slice(0, 21).map((d, i) => {
                      const active =
                        selectedDate?.toDateString() === d.toDateString()

                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedDate(d)}
                          className={`rounded-2xl border p-4 transition-all ${
                            active
                              ? "border-blue-600 bg-blue-600 text-white shadow-lg"
                              : "border-slate-200 bg-slate-50 hover:border-blue-200 hover:bg-white"
                          }`}
                        >
                          <p
                            className={`text-xs font-medium ${
                              active ? "text-blue-100" : "text-slate-500"
                            }`}
                          >
                            {d.toLocaleDateString("en-US", {
                              weekday: "short",
                            })}
                          </p>

                          <p className="mt-1 text-lg font-bold">
                            {d.getDate()}
                          </p>
                        </button>
                      )
                    })}
                  </div>
                </Card>
              </motion.div>

              {/* TIME */}
              <motion.div {...fade}>
                <Card className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
                  <SectionTitle step="03" title="Select Time" />

                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                    {timeSlots.map((t) => {
                      const active = selectedTime === t

                      return (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition-all ${
                            active
                              ? "border-blue-600 bg-blue-600 text-white shadow-md"
                              : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-200 hover:bg-white"
                          }`}
                        >
                          {t}
                        </button>
                      )
                    })}
                  </div>
                </Card>
              </motion.div>

              {/* INFO */}
              <motion.div {...fade}>
                <Card className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
                  <SectionTitle step="04" title="Your Information" />

                  <div className="grid gap-5 md:grid-cols-2">
                    <Field
                      icon={<User className="h-4 w-4" />}
                      label="Full Name"
                    >
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Juan Dela Cruz"
                        className="h-14 rounded-2xl border-slate-200 bg-slate-50"
                      />
                    </Field>

                    <Field
                      icon={<Mail className="h-4 w-4" />}
                      label="Email Address"
                    >
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="you@example.com"
                        className="h-14 rounded-2xl border-slate-200 bg-slate-50"
                      />
                    </Field>

                    <Field
                      icon={<Phone className="h-4 w-4" />}
                      label="Phone Number"
                      full
                    >
                      <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+63 912 345 6789"
                        className="h-14 rounded-2xl border-slate-200 bg-slate-50"
                      />
                    </Field>
                  </div>

                  {isLoggedIn && (
                    <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                      <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />

                      <p className="text-sm text-emerald-700">
                        Your account information has been automatically filled
                        for faster booking.
                      </p>
                    </div>
                  )}
                </Card>
              </motion.div>
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <motion.div {...fade}>
                  <Card className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900">
                      Appointment Summary
                    </h3>

                    <div className="mt-6 space-y-5">
                      <SummaryRow
                        label="Service"
                        value={selectedService?.label || "—"}
                      />

                      <SummaryRow
                        label="Date"
                        value={
                          selectedDate
                            ? selectedDate.toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                              })
                            : "—"
                        }
                      />

                      <SummaryRow label="Time" value={selectedTime || "—"} />

                      <SummaryRow
                        label="Duration"
                        value={selectedService?.duration || "—"}
                      />

                      <div className="rounded-2xl bg-blue-50 border border-blue-100 p-5">
                        <p className="text-sm text-slate-500">Starting Price</p>

                        <p className="mt-2 text-3xl font-bold text-blue-700">
                          {selectedService?.price || "—"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 border-t border-slate-100 pt-6 space-y-3">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Calendar className="h-4 w-4" />
                        MDS Dental & Aesthetic Clinic
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock3 className="h-4 w-4" />
                        Monday – Saturday • 9AM – 7PM
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        if (
                          service &&
                          selectedDate &&
                          selectedTime &&
                          name &&
                          email
                        ) {
                          setSubmitted(true)
                        }
                      }}
                      disabled={
                        !service ||
                        !selectedDate ||
                        !selectedTime ||
                        !name ||
                        !email
                      }
                      className="mt-8 h-14 w-full rounded-2xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40"
                    >
                      Confirm Booking
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function SectionTitle({ step, title }: { step: string; title: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-sm font-bold text-white">
        {step}
      </div>

      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
    </div>
  )
}

function Field({
  label,
  icon,
  children,
  full,
}: {
  label: string
  icon: React.ReactNode
  children: React.ReactNode
  full?: boolean
}) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <Label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
        {icon}
        {label}
      </Label>

      {children}
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm text-slate-500">{label}</p>

      <p className="text-sm font-semibold text-slate-900 text-right">{value}</p>
    </div>
  )
}
