import { Headset, Map, ShieldCheck, type LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-cyan-50 px-4 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-5xl border border-dashed border-cyan-400 p-3 sm:p-4">
        <div className="px-4 pt-4 pb-8 text-center sm:pb-10">
          <h2 className="text-4xl font-medium tracking-tight sm:text-5xl">
            Why Choose Wanderlust
          </h2>
          <p className="mt-3 text-sm text-neutral-500 sm:text-base">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <article key={title} className="bg-white px-6 py-8 sm:px-8">
              <Icon className="text-brand size-9" strokeWidth={1.5} />
              <h3 className="mt-7 text-2xl font-normal tracking-tight">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
