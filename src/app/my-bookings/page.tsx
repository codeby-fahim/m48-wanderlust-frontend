import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { TreePalm } from "lucide-react";

import { MyBookingCard } from "@/components/bookings/MyBookingCard";
import { auth } from "@/lib/auth";
import type { IBooking } from "@/lib/type/bookings";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

async function getBookings(email: string): Promise<IBooking[]> {
  try {
    const token = await getTokenFromServer();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${encodeURIComponent(email)}`,
      {
        cache: "no-store",
        headers: token ? { authorization: `Bearer ${token}` } : undefined,
      },
    );

    if (!res.ok) return [];

    return (await res.json()) as IBooking[];
  } catch {
    return [];
  }
}

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user?.email) {
    redirect("/signIn");
  }

  const bookings = await getBookings(user.email);

  return (
    <main className="flex-1 px-5 pt-24 pb-16 sm:px-10">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="text-4xl font-normal tracking-tight sm:text-5xl">
          My Bookings
        </h1>
        <p className="mt-3 text-sm text-neutral-500">
          Manage and view your upcoming travel plans
        </p>

        {bookings.length > 0 ? (
          <div className="mt-8 flex flex-col gap-4">
            {bookings.map((booking) => (
              <MyBookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center justify-center border border-dashed border-neutral-200 px-6 py-16 text-center">
            <TreePalm className="size-10 text-neutral-300" />
            <h2 className="mt-4 text-lg font-medium">No bookings yet</h2>
            <p className="mt-1 max-w-sm text-sm text-neutral-500">
              Your upcoming trips will appear here once you book a destination.
            </p>
            <Link
              href="/destinations"
              className="bg-brand hover:bg-brand/90 mt-6 inline-flex h-9 items-center rounded-sm px-4 text-sm font-medium text-white transition-colors"
            >
              Explore Destinations
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default MyBookingsPage;
