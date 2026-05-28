"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CalendarPlus,
  ClipboardList,
  User,
  LayoutDashboard,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface ProtectedNavProps {
  userRole?: "admin" | "user";
}

export default function ProtectedNav({
  userRole = "user",
}: ProtectedNavProps) {
  const pathname = usePathname();

  const USER_NAV_ITEMS = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/book", icon: CalendarPlus, label: "Book" },
    { path: "/appointments", icon: ClipboardList, label: "Appointments" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  const ADMIN_NAV_ITEMS = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/users", icon: Users, label: "Users" },
    { path: "/services", icon: ClipboardList, label: "Services" },
    { path: "/results", icon: ClipboardList, label: "Results" },
    { path: "/testimonials", icon: ClipboardList, label: "Testimonials" },
    { path: "/faq", icon: ClipboardList, label: "faq" },
    { path: "/inventory", icon: ClipboardList, label: "Inventory" },
    { path: "/appointments", icon: ClipboardList, label: "Appointments" },
    { path: "/inquiry", icon: ClipboardList, label: "Inquiry" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  const NAV_ITEMS =
    userRole === "admin" ? ADMIN_NAV_ITEMS : USER_NAV_ITEMS;

  return (
    <>
      {/* MOBILE / TABLET BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 safe-area-bottom lg:hidden">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
          {NAV_ITEMS.map(({ path, icon: Icon, label }) => {
            const active = pathname === path;

            return (
              <Link
                key={path}
                href={path}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[60px]",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon
                  className={cn("h-5 w-5", active && "stroke-[2.5px]")}
                />

                <span
                  className={cn(
                    "text-[10px] font-medium",
                    active && "font-semibold"
                  )}
                >
                  {label}
                </span>

                {active && (
                  <div className="w-1 h-1 rounded-full bg-primary mt-0.5" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-border z-50 flex-col p-4">
        <div className="mb-8 px-2">
          <h2 className="text-xl font-bold">
            {userRole === "admin" ? "Admin Panel" : "Client Portal"}
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          {NAV_ITEMS.map(({ path, icon: Icon, label }) => {
            const active = pathname === path;

            return (
              <Link
                key={path}
                href={path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />

                <span className="font-medium">{label}</span>
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
}