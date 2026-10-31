import { Banner } from "@/components/home/Banner";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { CallToAction } from "@/components/home/CallToAction";
import FeaturedDestinations from "@/components/FeaturedDestinations";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <Banner />
      <FeaturedDestinations />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
    </main>
  );
}
