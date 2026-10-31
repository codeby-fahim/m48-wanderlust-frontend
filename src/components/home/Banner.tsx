import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const searchFields = [
  { label: "Location", placeholder: "Address, City Or Zip" },
  { label: "Date/Duration", placeholder: "Anytime/3 Days" },
  { label: "Budget", placeholder: "$0-$3000" },
  { label: "People", placeholder: "5-10" },
];

export function Banner() {
  return (
    <section className="relative flex min-h-screen flex-1 flex-col">
      {/* Full-bleed background image (sits behind the floating navbar too) */}
      <Image
        src="/images/Banner.png"
        alt="Coastal village surrounded by green hills"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-black/15" />

      {/* Hero content — offset top padding clears the floating navbar */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 pt-24 pb-16 text-center text-white">
        <h1 className="max-w-3xl text-5xl leading-[1.05] font-semibold tracking-tight md:text-7xl">
          Discover Your Next Adventure
        </h1>
        <p className="mt-6 max-w-xl text-sm md:text-base">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button className="bg-brand hover:bg-brand/90 h-11 rounded-none px-6 text-xs font-semibold tracking-widest text-white uppercase">
            Explore Now
            <ArrowRight className="size-4" />
          </Button>
          <Button className="h-11 rounded-none bg-white/30 px-6 text-xs font-semibold tracking-widest text-white uppercase hover:bg-white/40">
            View Destination
          </Button>
        </div>
      </div>

      {/* Inset search bar pinned to the bottom of the hero */}
      <form className="relative mx-4 mb-4 grid overflow-hidden md:grid-cols-[1fr_1fr_1fr_1fr_auto]">
        {searchFields.map((field) => (
          <label
            key={field.label}
            className="flex flex-col justify-center border-white/25 bg-black/35 px-6 py-3 backdrop-blur-sm md:border-r"
          >
            <span className="text-lg font-semibold text-white">
              {field.label}
            </span>
            <input
              name={field.label.toLowerCase()}
              placeholder={field.placeholder}
              className="w-full bg-transparent text-sm text-white/80 outline-none placeholder:text-white/70"
            />
          </label>
        ))}
        <Button
          type="submit"
          className="bg-brand hover:bg-brand/90 h-full min-h-16 rounded-none px-12 text-lg font-semibold text-white"
        >
          Search
        </Button>
      </form>
    </section>
  );
}
