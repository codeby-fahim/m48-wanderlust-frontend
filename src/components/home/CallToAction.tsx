import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CallToAction() {
  return (
    <section className="relative isolate flex min-h-64 items-center justify-center overflow-hidden px-4 py-20 text-center text-white sm:py-24">
      <Image
        src="/images/CTA.png"
        alt="Aerial view of a tropical island with a plane flying overhead"
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-black/35" />

      <div className="flex flex-col items-center">
        <h2 className="text-4xl font-normal tracking-tight sm:text-6xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-sm sm:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Link
          href="#book"
          className="mt-8 inline-flex h-12 items-center gap-3 rounded-sm bg-white px-8 text-xs font-semibold tracking-widest text-neutral-900 uppercase transition-colors hover:bg-neutral-100"
        >
          Book Your Trip Today
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
