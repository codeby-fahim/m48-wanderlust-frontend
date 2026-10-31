import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "#destinations" },
  { label: "My Bookings", href: "#bookings" },
  { label: "My Profile", href: "#profile" },
];

const supportLinks = [
  { label: "Help Center", href: "#help" },
  { label: "Terms of Service", href: "#terms" },
  { label: "Privacy Policy", href: "#privacy" },
];

const contactDetails = [
  { label: "786 901 1622", href: "tel:7869011622" },
  { label: "info@wanderland.com", href: "mailto:info@wanderland.com" },
];

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="size-5"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        {/* Brand */}
        <div className="max-w-xl">
          <p className="text-5xl font-bold tracking-tight sm:text-6xl">
            Wanderlast
          </p>
          <p className="mt-3 text-sm text-neutral-400">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        {/* Link columns */}
        <div className="mt-12 grid gap-10 sm:grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
              Newsletter
            </h3>
            <p className="mt-2 text-xs text-neutral-400">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form className="mt-4">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  aria-label="Email address"
                  className="h-10 w-full bg-neutral-800 px-3 pr-10 text-sm text-white outline-none placeholder:text-neutral-500 focus-visible:ring-1 focus-visible:ring-white/30"
                />
                <button
                  type="button"
                  aria-label="Subscribe"
                  className="absolute top-1/2 right-2 -translate-y-1/2 text-neutral-300 transition-colors hover:text-white"
                >
                  <ArrowUpRight className="size-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-neutral-200 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-neutral-200 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {contactDetails.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-neutral-200 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-neutral-400">
            © 2026 Wanderlast. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-white">
            <Link href="#x" aria-label="X" className="hover:text-neutral-300">
              <XIcon />
            </Link>
            <Link
              href="#linkedin"
              aria-label="LinkedIn"
              className="hover:text-neutral-300"
            >
              <LinkedInIcon />
            </Link>
            <Link
              href="#instagram"
              aria-label="Instagram"
              className="hover:text-neutral-300"
            >
              <InstagramIcon />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
