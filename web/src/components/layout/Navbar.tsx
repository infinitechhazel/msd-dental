"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Menu, X, ChevronDown, User, Calendar,
  FileText, Settings, LogOut,
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/results', label: 'Results' },
  { href: '/contact', label: 'Contact' },
]

function getInitials(name: string) {
  return name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  const { isLoggedIn, user, logout, initializeAuth } = useAuthStore()

  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Hydration guard — prevents SSR mismatch with persisted Zustand state
  useEffect(() => {
    initializeAuth()
    setMounted(true)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setDropdownOpen(false)
  }, [pathname])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const initials = user?.name ? getInitials(user.name) : '?'
  const firstName = user?.name?.split(' ')[0] ?? ''

  const profileLinks = [
    { href: '/profile', icon: User, label: 'My profile' },
    { href: '/appointments', icon: Calendar, label: 'My appointments' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#020617]/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="font-serif text-xl text-white tracking-wide shrink-0">
          MDS <span className="text-cyan-400">Clinic</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm tracking-wide transition-colors ${
                pathname === l.href
                  ? 'text-cyan-400'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-3">
          {/* Only render auth-dependent UI after hydration to avoid SSR flicker */}
          {mounted && isLoggedIn && user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(v => !v)}
                className="flex items-center gap-2 bg-white/[0.07] hover:bg-white/10 border border-white/[0.12] rounded-full pl-1 pr-3 py-1 transition-colors"
              >
                <div className="w-[30px] h-[30px] rounded-full bg-[#1A4E8A] flex items-center justify-center text-[11px] font-medium text-blue-300 shrink-0">
                  {initials}
                </div>
                <span className="text-sm text-slate-200 max-w-[90px] truncate">
                  {firstName}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-slate-400 transition-transform duration-200 ${
                    dropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] w-52 bg-[#0f172a] border border-white/10 rounded-xl overflow-hidden z-50">
                  <div className="px-3.5 py-3 border-b border-white/[0.07]">
                    <p className="text-[13px] font-medium text-slate-100">{user.name}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{user.email}</p>
                    {user.role && (
                      <span className="inline-block mt-1.5 text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 capitalize">
                        {user.role}
                      </span>
                    )}
                  </div>

                  {profileLinks.map(({ href, icon: Icon, label }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] text-slate-400 hover:bg-white/5 hover:text-slate-100 transition-colors"
                    >
                      <Icon size={14} />
                      {label}
                    </Link>
                  ))}

                  <div className="h-px bg-white/[0.07] my-1" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] text-red-400 hover:bg-red-400/[0.08] hover:text-red-300 transition-colors"
                  >
                    <LogOut size={14} />
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : mounted ? (
            /* Login + Book Appointment side by side */
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-slate-300 hover:text-white hover:bg-white/[0.07] border border-white/[0.12] font-medium text-sm px-5"
                >
                  Log in
                </Button>
              </Link>
              <Link href="/book">
                <Button className="bg-cyan-400 text-slate-950 hover:bg-cyan-300 font-medium text-sm px-6 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all">
                  Book Appointment
                </Button>
              </Link>
            </div>
          ) : null}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#020617]/95 backdrop-blur-xl border-t border-white/5 px-5 pb-6 pt-2">

          {/* Profile section */}
          {mounted && isLoggedIn && user && (
            <div className="mb-2">
              <div className="flex items-center gap-3 py-4 border-b border-white/[0.07]">
                <div className="w-9 h-9 rounded-full bg-[#1A4E8A] flex items-center justify-center text-[12px] font-medium text-blue-300 shrink-0">
                  {initials}
                </div>
                <div>
                  <p className="text-[13px] font-medium text-slate-100">{user.name}</p>
                  <p className="text-[11px] text-slate-500">{user.email}</p>
                  {user.role && (
                    <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 capitalize">
                      {user.role}
                    </span>
                  )}
                </div>
              </div>

              {profileLinks.map(({ href, icon: Icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2.5 py-2.5 text-[13px] text-slate-400 border-b border-white/[0.04]"
                >
                  <Icon size={14} />
                  {label}
                </Link>
              ))}

              <button
                onClick={handleLogout}
                className="flex items-center gap-2.5 py-2.5 text-[13px] text-red-400 w-full"
              >
                <LogOut size={14} />
                Log out
              </button>

              <div className="h-px bg-white/[0.07] mt-1 mb-2" />
            </div>
          )}

          {/* Nav links */}
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`block py-3 text-sm border-b border-white/[0.04] ${
                pathname === l.href ? 'text-cyan-400' : 'text-slate-300'
              }`}
            >
              {l.label}
            </Link>
          ))}

          {/* Login + Book buttons — only when logged out */}
          {mounted && !isLoggedIn && (
            <div className="flex flex-col gap-2 mt-4">
              <Link href="/book">
                <Button className="w-full bg-cyan-400 text-slate-950 hover:bg-cyan-300">
                  Book Appointment
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="w-full text-slate-300 hover:text-white hover:bg-white/[0.07] border border-white/[0.12] font-medium"
                >
                  Log in
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}