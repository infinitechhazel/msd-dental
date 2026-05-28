"use client"

import { useMemo, useState } from "react"
import {
  Plus,
  Search,
  Filter,
  Pencil,
  Trash2,
  Eye,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Stethoscope,
} from "lucide-react"

import ProtectedNav from "@/components/layout/ProtectedNavbar"

const servicesData = [
  {
    id: 1,
    name: "Dental Cleaning",
    category: "Dental",
    duration: "45 mins",
    price: 1500,
    status: "Active",
  },
  {
    id: 2,
    name: "Teeth Whitening",
    category: "Dental",
    duration: "1 hour",
    price: 6500,
    status: "Active",
  },
  {
    id: 3,
    name: "Root Canal",
    category: "Dental",
    duration: "2 hours",
    price: 12000,
    status: "Inactive",
  },
  {
    id: 4,
    name: "Botox Treatment",
    category: "Aesthetic",
    duration: "30 mins",
    price: 8000,
    status: "Active",
  },
  {
    id: 5,
    name: "Facial Rejuvenation",
    category: "Aesthetic",
    duration: "1 hour",
    price: 5500,
    status: "Active",
  },
  {
    id: 6,
    name: "Chemical Peel",
    category: "Aesthetic",
    duration: "40 mins",
    price: 4500,
    status: "Draft",
  },
  {
    id: 7,
    name: "Braces Installation",
    category: "Dental",
    duration: "3 hours",
    price: 35000,
    status: "Active",
  },
  {
    id: 8,
    name: "Laser Treatment",
    category: "Aesthetic",
    duration: "1 hour",
    price: 9500,
    status: "Active",
  },
]

const categories = ["All", "Dental", "Aesthetic"]

export default function ServicesPage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      const matchesSearch = service.name
        .toLowerCase()
        .includes(search.toLowerCase())

      const matchesCategory =
        selectedCategory === "All" || service.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [search, selectedCategory])

  const statusStyles = (status: string) => {
    if (status === "Active") {
      return "bg-emerald-50 text-emerald-700 border border-emerald-100"
    }

    if (status === "Draft") {
      return "bg-amber-50 text-amber-700 border border-amber-100"
    }

    return "bg-red-50 text-red-700 border border-red-100"
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      <ProtectedNav userRole="admin" />

      <main className="lg:ml-72 px-4 sm:px-6 lg:px-8 pt-20 lg:pt-8 pb-28 lg:pb-10">
        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Services Management
            </h1>

            <p className="text-slate-500 mt-2 text-sm sm:text-base max-w-2xl">
              Manage dental and aesthetic clinic services, pricing,
              availability, and categories.
            </p>
          </div>

          <button className="h-11 px-5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold shadow-lg shadow-blue-100 hover:opacity-90 transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
            <Plus size={18} />
            Add Service
          </button>
        </div>

        {/* Analytics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {[
            {
              label: "Total Services",
              value: "24",
            },
            {
              label: "Dental Services",
              value: "12",
              icon: Stethoscope,
            },
            {
              label: "Aesthetic Services",
              value: "12",
              icon: Sparkles,
            },
            {
              label: "Monthly Revenue",
              value: "₱327,500",
            },
          ].map((card, index) => {
            const Icon = card.icon

            return (
              <div
                key={index}
                className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-blue-50 blur-3xl" />

                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-500 mb-3">{card.label}</p>

                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                      {card.value}
                    </h2>
                  </div>

                  {Icon && (
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Filters */}
        <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-sm mb-6">
          <div className="flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-between">
            <div className="flex flex-col sm:flex-row gap-3 w-full xl:max-w-3xl">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />

                <input
                  type="text"
                  placeholder="Search services..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`h-12 px-5 rounded-2xl text-sm font-medium whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <button className="h-12 px-4 rounded-2xl border border-slate-200 bg-white text-slate-700 text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
              <Filter size={16} />
              Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                    Service
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                    Duration
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                    Price
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredServices.map((service) => (
                  <tr
                    key={service.id}
                    className="border-b border-slate-100 hover:bg-blue-50/30 transition-all"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-100">
                          {service.name
                            .split(" ")
                            .map((word) => word[0])
                            .slice(0, 2)
                            .join("")}
                        </div>

                        <div>
                          <h3 className="text-sm font-semibold text-slate-900">
                            {service.name}
                          </h3>

                          <p className="text-xs text-slate-500 mt-1">
                            Service ID: #{service.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                          service.category === "Dental"
                            ? "bg-blue-50 text-blue-700 border border-blue-100"
                            : "bg-cyan-50 text-cyan-700 border border-cyan-100"
                        }`}
                      >
                        {service.category}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-600">
                      {service.duration}
                    </td>

                    <td className="px-6 py-5 text-sm font-semibold text-slate-900">
                      ₱{service.price.toLocaleString()}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles(
                          service.status,
                        )}`}
                      >
                        {service.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <button className="w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50 transition-all">
                          <Eye size={16} />
                        </button>

                        <button className="w-10 h-10 rounded-xl border border-blue-100 bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-all">
                          <Pencil size={16} />
                        </button>

                        <button className="w-10 h-10 rounded-xl border border-red-100 bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-all">
                          <Trash2 size={16} />
                        </button>

                        <button className="w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50 transition-all">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5 border-t border-slate-200 bg-slate-50/50">
            <p className="text-sm text-slate-500 text-center sm:text-left">
              Showing 1 to 8 of 24 services
            </p>

            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50 transition-all">
                <ChevronLeft size={16} />
              </button>

              <button className="w-10 h-10 rounded-xl bg-blue-600 text-white font-semibold text-sm shadow-lg shadow-blue-100">
                1
              </button>

              <button className="w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-600 font-medium text-sm hover:bg-slate-50 transition-all">
                2
              </button>

              <button className="w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-600 font-medium text-sm hover:bg-slate-50 transition-all">
                3
              </button>

              <button className="w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50 transition-all">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
