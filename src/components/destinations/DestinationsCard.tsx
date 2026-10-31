import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";
import Link from "next/link";
import type { IDestinations } from "@/lib/type/destinations";

export function DestinationsCard({
  destination,
}: {
  destination: IDestinations;
}) {
  return (
    <article>
      <div className="relative aspect-3/2 overflow-hidden rounded-sm">
        {/* The API returns images from arbitrary hosts, so use a plain img here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={destination.imageUrl}
          alt={destination.name}
          loading="lazy"
          className="size-full object-cover"
        />
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-sm bg-white/90 px-2 py-1 text-sm font-medium">
          4.5
          <Star className="size-3.5 fill-current" />
        </div>
      </div>

      <div className="pt-3">
        <p className="flex items-center gap-1.5 text-xs text-neutral-600">
          <MapPin className="size-3.5" />
          {destination.country}
        </p>

        <div className="mt-1.5 flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-semibold">{destination.name}</h3>
          <p className="shrink-0 text-sm">
            <span className="font-semibold">${destination.price}</span>
            <span className="text-neutral-500">/Person</span>
          </p>
        </div>

        <p className="mt-1 flex items-center gap-1.5 text-xs text-neutral-600">
          <CalendarDays className="size-3.5" />
          {destination.duration}
        </p>

        <Link
          href={`/destinations/${destination._id}`}
          className="text-brand mt-3 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase"
        >
          Book Now
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </article>
  );
}
