"use client"

import Link from "next/link"
import Image from "next/image"
import { Twitter, Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

const footerLinks = [
  {
    title: "Company",
    links: [
      { name: "Contact Us", href: "/contact" },
      { name: "Careers", href: "#" },
      { name: "Our Team", href: "/team" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-muted/50 rounded-2xl pt-12 pb-6 mt-16">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-10">
          
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image
                src="/Images/logo.png"
                alt="Logo"
                width={140}
                height={45}
                className="block dark:hidden"
                priority
              />
              <Image
                src="/Images/logo.png"
                alt="Logo Dark"
                width={140}
                height={45}
                className="hidden dark:block"
                priority
              />
            </Link>

            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              We help brands grow through creative strategy and digital innovation. 
              Your success is our mission.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50 hover:bg-primary/10 transition-colors"
                >
                  <social.icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-base mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-base mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary" /> info@grovancedigital.com
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary" /> +92 300 1234567
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" /> Karachi, Pakistan
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} Grovance Digital. All rights reserved.
          </p>
          <div className="text-sm text-muted-foreground">
            Built with ❤️ by <span className="text-foreground font-medium">Hasan Rafay</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
