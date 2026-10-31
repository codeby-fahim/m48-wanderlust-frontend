import { Suspense } from "react";
import Link from "next/link";
import {
  ArrowLeft,

  CalendarDays,
  Check,
  MapPin,
  Star,
} from "lucide-react";

import type { IDestinations } from "@/lib/type/destinations";
import EditDestinationDialog from "@/components/destinations/EditDestinationDialog";
import DeleteDestination from "@/components/destinations/DeleteDestination";
import BookingCard from "@/components/destinations/BookingCard";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

// The API has no rating/highlights/perks fields yet, so those stay static.
const FALLBACK_DESTINATION: IDestinations = {
  _id: "bali-paradise",
  name: "Bali Paradise",
  country: "Indonesia",
  category: "Beach",
  price: "1299",
  duration: "7 Days / 6 Nights",
  departureDate: "2026-05-15",
  imageUrl: "/images/Banner.png",
  description:
    "Discover the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets.",
};

const HIGHLIGHTS_INTRO =
  "Discover the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets.";

const highlights = [
  "Luxury beachfront accommodation",
  "Visit Uluwatu Temple at sunset",
  "Traditional Balinese spa treatment",
  "Private beach dinner experience",
  "Sunrise trek to Mount Batur",
];



const formatDuration = (value: string) => {
  const match = value.match(/^(\d+)\s*days?$/i);
  if (!match) return value;

  const days = Number(match[1]);
  return `${days} Days / ${days - 1} Nights`;
};

// Keeps the display deterministic on both server and client.

async function getDestination(id: string): Promise<IDestinations> {
  try {
    const token = await getTokenFromServer();
    // Always read the latest record so edits show up after router.refresh().
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations/${id}`, {
      cache: "no-store",
      headers: token ? { authorization: `Bearer ${token}` } : undefined,
    });

    if (!res.ok) return FALLBACK_DESTINATION;

    const data: Partial<IDestinations> = await res.json();
    if (!data?._id) return FALLBACK_DESTINATION;

    return {
      ...FALLBACK_DESTINATION,
      ...data,
      imageUrl: data.imageUrl || FALLBACK_DESTINATION.imageUrl,
      description: data.description || FALLBACK_DESTINATION.description,
    };
  } catch {
    return FALLBACK_DESTINATION;
  }
}

function DetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-4 w-40 rounded bg-neutral-100" />
        <div className="flex gap-3">
          <div className="h-9 w-20 rounded-sm bg-neutral-100" />
          <div className="h-9 w-24 rounded-sm bg-neutral-100" />
        </div>
      </div>

      <div className="mt-5 aspect-8/3 w-full bg-neutral-100" />

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <div className="h-3 w-24 rounded bg-neutral-100" />
          <div className="h-10 w-72 rounded bg-neutral-100" />
          <div className="h-4 w-52 rounded bg-neutral-100" />
          <div className="h-4 w-full rounded bg-neutral-100" />
          <div className="h-4 w-5/6 rounded bg-neutral-100" />
        </div>
        <div className="h-72 w-full bg-neutral-100" />
      </div>
    </div>
  );
}

async function DestinationDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const destination = await getDestination(id);

  return (
    <>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/destinations"
          className="flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Destinations
        </Link>

        <div className="flex items-center gap-3">
          
          <EditDestinationDialog destination={destination} />
          <DeleteDestination destination={destination} />
          
        </div>
      </div>

      {/* Hero image */}
      <div className="mt-5 aspect-8/3 w-full overflow-hidden">
        {/* The API returns images from arbitrary hosts, so use a plain img here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="size-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
        <div>
          <p className="flex items-center gap-1.5 text-xs text-neutral-500">
            <MapPin className="size-3.5" />
            {destination.country}
          </p>

          <h1 className="mt-2 text-4xl font-normal tracking-tight sm:text-5xl">
            {destination.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-neutral-600">
            <span className="flex items-center gap-1.5">
              <Star className="size-3.5 fill-green-600 text-green-600" />
              <span className="font-semibold text-neutral-800">4.9</span>
              <span className="text-neutral-500">(234 reviews)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5" />
              {formatDuration(destination.duration)}
            </span>
          </div>

          <section className="mt-9">
            <h2 className="text-xl font-medium">Overview</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              {destination.description}
            </p>
          </section>

          <section className="mt-9">
            <h2 className="text-xl font-medium">Highlights</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              {HIGHLIGHTS_INTRO}
            </p>

            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-center gap-2 text-xs text-neutral-600"
                >
                  <Check className="size-3.5 shrink-0 text-green-600" />
                  {highlight}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Booking card */}
        <BookingCard destination={destination}/>
      </div>
    </>
  );
}

const DestinationDetailPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  return (
    <main className="flex-1 px-5 pt-24 pb-16 sm:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <Suspense fallback={<DetailSkeleton />}>
          <DestinationDetail params={params} />
        </Suspense>
      </div>
    </main>
  );
};

export default DestinationDetailPage;
