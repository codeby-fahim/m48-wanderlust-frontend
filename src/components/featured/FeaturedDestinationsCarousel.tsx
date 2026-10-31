"use client";

import { useEffect, useState } from "react";

import { DestinationsCard } from "@/components/destinations/DestinationsCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { IDestinations } from "@/lib/type/destinations";

export function FeaturedDestinationsCarousel({
  destinations,
}: {
  destinations: IDestinations[];
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(destinations.length);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
      setCount(api.scrollSnapList().length);
    };

    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "start", loop: true }}
      className="w-full"
    >
      <CarouselContent className="-ml-5">
        {destinations.map((destination) => (
          <CarouselItem
            key={destination._id}
            className="basis-full pl-5 sm:basis-1/2 lg:basis-1/3"
          >
            <DestinationsCard destination={destination} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-8 flex items-center gap-6">
        <p className="shrink-0 text-sm text-neutral-500 tabular-nums">
          {current}/{count}
        </p>
        <div className="h-px flex-1 bg-neutral-200" />
        <div className="flex shrink-0 items-center gap-2">
          <CarouselPrevious className="static size-10 border-neutral-200 text-neutral-400 hover:border-neutral-400 hover:text-neutral-600 disabled:opacity-40" />
          <CarouselNext className="static size-10 border-neutral-200 text-neutral-400 hover:border-neutral-400 hover:text-neutral-600 disabled:opacity-40" />
        </div>
      </div>
    </Carousel>
  );
}
