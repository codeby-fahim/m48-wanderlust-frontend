"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User } from "lucide-react";
import { useState } from "react";
import { cn } from "cn";

import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Add Destinations", href: "/add-destination" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/my-bookings" },
];

const isActivePath = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

export function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
    setMenuOpen(false);
  };

  return (
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
      <header className="absolute inset-x-3 top-3 z-50 sm:inset-x-4">
        <nav className="relative mx-auto flex h-14 items-center justify-between gap-3 bg-white px-4 shadow-sm sm:px-6">
          <div className="flex min-w-0 items-center">
            <SheetTrigger
              aria-label="Open navigation menu"
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-neutral-700 transition-colors hover:bg-neutral-100 lg:hidden"
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <ul className="hidden items-center gap-6 text-sm font-medium lg:flex xl:gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "transition-colors hover:text-brand",
                      isActivePath(pathname, link.href) &&
                        "text-brand underline decoration-2 underline-offset-8",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/"
            className="text-brand absolute left-1/2 -translate-x-1/2 text-xl font-bold tracking-tight sm:text-2xl"
          >
            Wanderlast
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="#profile"
              className="hidden items-center gap-1.5 text-sm font-medium transition-colors hover:text-brand lg:flex"
            >
              <User className="size-4" />
              Profile
            </Link>

            {user ? (
              <Popover>
                <PopoverTrigger
                  nativeButton={false}
                  render={
                    <Avatar className="size-8 cursor-pointer border border-neutral-200">
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user.image ?? undefined}
                        alt={user.name}
                      />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  }
                />
                <PopoverContent align="end" className="w-64">
                  <PopoverHeader>
                    <PopoverTitle>{user.name}</PopoverTitle>
                    <PopoverDescription>{user.email}</PopoverDescription>
                  </PopoverHeader>
                  <Button
                    type="button"
                    onClick={handleSignOut}
                    variant="destructive"
                    className="w-full"
                  >
                    Sign Out
                  </Button>
                </PopoverContent>
              </Popover>
            ) : (
              <div className="hidden items-center gap-4 text-sm font-medium lg:flex">
                <Link
                  href="/signIn"
                  className="transition-colors hover:text-brand"
                >
                  Login
                </Link>
                <Link
                  href="/signUp"
                  className="bg-brand hover:bg-brand/90 inline-flex h-8 items-center rounded-md px-3 text-xs font-semibold text-white transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>

      <SheetContent className="flex flex-col">
        <SheetHeader className="border-b border-neutral-100 px-5 py-4">
          <SheetTitle className="text-brand text-2xl font-bold tracking-tight">
            Wanderlast
          </SheetTitle>
          <SheetDescription className="sr-only">
            Main navigation
          </SheetDescription>
        </SheetHeader>

        <nav className="flex flex-col gap-1 px-3 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-100",
                isActivePath(pathname, link.href) &&
                  "bg-brand/10 text-brand hover:bg-brand/10",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto border-t border-neutral-100 p-4">
          {user ? (
            <div className="flex flex-col gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <Avatar className="size-9">
                  <AvatarImage
                    referrerPolicy="no-referrer"
                    src={user.image ?? undefined}
                    alt={user.name}
                  />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{user.name}</p>
                  <p className="truncate text-xs text-neutral-500">
                    {user.email}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                onClick={handleSignOut}
                variant="destructive"
                className="w-full"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/signIn"
                onClick={() => setMenuOpen(false)}
                className={buttonVariants({ variant: "outline" })}
              >
                Login
              </Link>
              <Link
                href="/signUp"
                onClick={() => setMenuOpen(false)}
                className={buttonVariants()}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
