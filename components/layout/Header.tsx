"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, ChevronUp, User, LogOut, Settings } from "lucide-react"
import Image from "next/image"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import nookies from "nookies"
import { useRouter } from "next/navigation"

interface NavItem {
  name: string
  href?: string
  submenu?: { name: string; href: string }[]
}

const navItems: NavItem[] = [
  { name: 'eBooks', href: '/books' },
  { 
    name: 'Courses', 
    submenu: [
      { name: 'English Language', href: '/courses' },
      { name: 'C++', href: '/about/mission' },
      { name: 'Website Development', href: '/about/mission' },
      { name: 'UI/UX', href: '/about/mission' },
      { name: 'Agentic AI', href: '/about/mission' },
    ] 
  },
  { name: 'Youtube Videos', href: '/youtube' },
  { 
    name: 'More', 
    submenu: [
      { name: 'Team', href: '/team' },
      { name: 'About Us', href: '/aboutus' },
      { name: 'Contact Us', href: 'https://wa.me/923161941733?text=Assalamualaikum!' },
    ] 
  },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    
    // Auth state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      unsubscribe()
    }
  }, [])

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name)
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      nookies.destroy(null, "logged_in")
      setUserDropdownOpen(false)
      setIsOpen(false)
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const getInitials = (displayName: string) => {
    return displayName
      ?.split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || "U"
  }

  // Fix for external images - use regular img tag for external URLs
  const UserAvatar = ({ user, size = 32 }: { user: any; size?: number }) => {
    if (user?.photoURL) {
      return (
        <img
          src={user.photoURL}
          alt="Profile"
          width={size}
          height={size}
          className="rounded-full object-cover"
          referrerPolicy="no-referrer" // This helps with Google images
        />
      )
    }
    
    return (
      <div 
        className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold"
        style={{ width: size, height: size }}
      >
        {getInitials(user?.displayName || user?.email)}
      </div>
    )
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-md shadow-md py-2">
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/Images/logo.png"
            alt="Logo"
            width={80}
            height={40}
            className="block dark:hidden transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <Image
            src="/Images/logo.png"
            alt="Logo"
            width={80}
            height={40}
            className="hidden dark:block transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <span className="hidden sm:text-lg font-semibold tracking-wide text-green-600 dark:text-yellow-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            Watch to Lead
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">Home</Link>
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              <Link href={item.href ?? "#"} className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1">
                {item.name}
                {item.submenu && <ChevronDown size={16} />}
              </Link>
              {item.submenu && (
               <div className="absolute left-0 mt-1 rounded-xl shadow-lg min-w-[200px] bg-white dark:bg-gray-900 
             opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 
             pointer-events-none group-hover:pointer-events-auto transition-all duration-500">
                  {item.submenu.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.href}
                      className="block px-6 py-3 text-sm whitespace-nowrap hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {/* User Profile Dropdown */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <UserAvatar user={user} size={32} />
                <ChevronDown size={16} className="text-gray-600 dark:text-gray-300" />
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 py-2">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {user.displayName || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                  
                  <Link
                    href="/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <User size={16} className="mr-2" />
                    Profile
                  </Link>
                  
                  <Link
                    href="/auth/settings"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Settings size={16} className="mr-2" />
                    Settings
                  </Link>
                  
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/auth/login">Login</Link>
              </Button>
            </div>
          )}
          
          <ModeToggle />
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center space-x-3 md:hidden">
          {/* Mobile User Profile */}
          {user && (
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <UserAvatar user={user} size={32} />
            </button>
          )}
          
          <ModeToggle />
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="p-1">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile User Dropdown */}
      {userDropdownOpen && (
        <div className="fixed inset-0 top-20 z-40 md:hidden" onClick={() => setUserDropdownOpen(false)}>
          <div className="absolute right-4 top-2 w-48 rounded-xl shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 py-2">
            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {user.displayName || 'User'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user.email}
              </p>
            </div>
            
            <Link
              href="/profile"
              onClick={() => setUserDropdownOpen(false)}
              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <User size={16} className="mr-2" />
              Profile
            </Link>
            
            <Link
              href="/auth/settings"
              onClick={() => setUserDropdownOpen(false)}
              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Settings size={16} className="mr-2" />
              Settings
            </Link>
            
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 top-24 z-50 md:hidden">
          <div className="absolute inset-0 bg-white dark:bg-gray-900 shadow-lg"></div>

          <nav className="relative flex flex-col p-6 space-y-2 z-10 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
            <Link href="/" onClick={() => setIsOpen(false)} className="text-lg font-medium hover:text-primary">
              Home
            </Link>
            {navItems.map((item) => (
  <div key={item.name} className="flex flex-col">
    {item.submenu ? (
      <>
        <button
          onClick={() => toggleSubmenu(item.name)}
          className="flex justify-between items-center text-lg font-medium hover:text-primary w-full"
        >
          {item.name}
          {openSubmenu === item.name ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openSubmenu === item.name && (
          <div className="flex flex-col pl-4 mt-1 space-y-1">
            {item.submenu.map((sub) => (
              <Link
                key={sub.name}
                href={sub.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-normal hover:text-primary"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        )}
      </>
    ) : (
      <Link
        href={item.href ?? "#"}
        onClick={() => setIsOpen(false)}
        className="text-lg font-medium hover:text-primary w-full py-2"
      >
        {item.name}
      </Link>
    )}
  </div>
))}

            
            {/* Mobile Auth Buttons */}
            {!user ? (
              <div className="flex flex-col gap-2 pt-4">
                <Button asChild>
                  <Link href="/auth/login" onClick={() => setIsOpen(false)}>Login</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/auth/signup" onClick={() => setIsOpen(false)}>Sign Up</Link>
                </Button>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="px-2 py-3">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {user.displayName || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <User size={16} className="mr-2" />
                  Profile
                </Link>
                <Link
                  href="/auth/settings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <Settings size={16} className="mr-2" />
                  Settings
                </Link>
                <button
                  onClick={() => {
                    handleSignOut()
                    setIsOpen(false)
                  }}
                  className="flex items-center w-full px-2 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}