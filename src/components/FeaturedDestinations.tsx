import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { FeaturedDestinationsCarousel } from "@/components/featured/FeaturedDestinationsCarousel";
import type { IDestinations } from "@/lib/type/destinations";

async function getFeaturedDestinations(): Promise<IDestinations[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-destinations`
, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    return (await res.json()) as IDestinations[];
  } catch {
    return [];
  }
}

const FeaturedDestinations = async () => {
  const destinations = await getFeaturedDestinations();

  if (destinations.length === 0) return null;

  return (
    <section id="destinations" className="bg-white px-4 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <h2 className="text-4xl font-medium tracking-tight sm:text-5xl">
              Featured Destinations
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>

          <Link
            href="/destinations"
            className="text-brand hover:bg-brand inline-flex h-9 shrink-0 items-center gap-2 border border-brand/50 px-4 text-[11px] font-semibold tracking-wide uppercase transition-colors hover:border-transparent hover:text-white"
          >
            All Destinations
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="mt-10">
          <FeaturedDestinationsCarousel destinations={destinations} />
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
