"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Send
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

const footerSections = [
  {
    title: "Explore",
    links: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/about" },
      { name: "Services", href: "/services" },
      { name: "Our Team", href: "/team" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Vocabulary Builder", href: "/vocabulary" },
      { name: "Educational Games", href: "/games" },
      { name: "Blog", href: "/blog" },
      { name: "FAQs", href: "/faqs" },
      { name: "Support Center", href: "/support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 mt-20">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">

          {/* Brand & Contact Column (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="inline-block">
              <div className="relative h-12 w-48">
                <Image
                  src="/Images/logo.png"
                  alt="Watch to Lead Logo"
                  fill
                  className="object-contain object-left dark:hidden"
                  priority
                />
                <Image
                  src="/Images/logo.png"
                  alt="Watch to Lead Logo"
                  fill
                  className="object-contain object-left hidden dark:block"
                  priority
                />
              </div>
            </Link>

            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Empowering students and professionals with cutting-edge educational tools and resources. Join us on a journey of continuous learning.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail size={18} />
                <a href="mailto:info@watchtolead.com">info@watchtolead.com</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone size={18} />
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin size={18} />
                <span>123 Education Lane, Learning City, ED 45678</span>
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all duration-300"
                >
                  <social.icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-bold text-lg mb-6 text-foreground">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all inline-block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Column (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="font-bold text-lg text-foreground">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest updates, educational tips, and exclusive resources.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-background border-slate-200 dark:border-slate-800 focus-visible:ring-primary pr-12"
                />
                <Button
                  size="icon"
                  className="absolute right-1 top-1 h-8 w-8 rounded-md"
                  type="submit"
                >
                  <Send size={14} />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} <span className="font-semibold text-foreground">Watch to Lead</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              Built with <span className="text-red-500 animate-pulse">❤️</span> by <span className="font-medium text-foreground">Hasan Rafay</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
