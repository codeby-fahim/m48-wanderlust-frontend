"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Testimonial = {
  quote: string;
  name: string;
  location: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person2.png",
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person1.png",
  },
  {
    quote:
      "Our Honeymoon In Santorini Was Flawless. The Sunset Cruise, The Private Villa And The Local Food Tour Made It A Trip We Will Never Forget.",
    name: "James Carter",
    location: "London, UK",
    image: "/images/person2.png",
  },
  {
    quote:
      "The Safari In Kenya Was A Once-In-A-Lifetime Experience. Every Game Drive Was Exciting And The Lodges Were Far Beyond What We Expected.",
    name: "Amara Okafor",
    location: "Cape Town, South Africa",
    image: "/images/person1.png",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white px-4 py-10 sm:px-8 sm:py-14">
      <Carousel
        opts={{ align: "start", loop: true }}
        className="mx-auto max-w-5xl border border-dashed border-cyan-400 p-3 sm:p-4"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-6 border-b border-neutral-200 px-1 pb-4">
          <div>
            <h2 className="text-4xl font-medium tracking-tight sm:text-5xl">
              What Travelers Say
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              Real experiences from our happy travelers
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 pt-1">
            <CarouselPrevious className="static size-11 border-neutral-300 text-neutral-400 hover:border-neutral-400 hover:text-neutral-600" />
            <CarouselNext className="static size-11 border-neutral-300 text-neutral-400 hover:border-neutral-400 hover:text-neutral-600" />
          </div>
        </div>

        {/* Slides */}
        <CarouselContent className="-ml-6 mt-3">
          {testimonials.map(({ quote, name, location, image }) => (
            <CarouselItem key={name} className="pl-6 md:basis-1/2">
              <article className="flex h-full gap-4 border border-neutral-200 p-3">
                <div className="flex min-w-0 flex-1 flex-col justify-between py-1 pl-1">
                  <p className="text-[15px] leading-relaxed text-neutral-800">
                    &quot;{quote}&quot;
                  </p>
                  <div className="mt-6">
                    <p className="text-sm text-neutral-700">
                      <span className="text-brand">—</span> {name}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">{location}</p>
                  </div>
                </div>
                <div className="relative h-44 w-36 shrink-0 overflow-hidden">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="144px"
                    className="object-cover"
                  />
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
