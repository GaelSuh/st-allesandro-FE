import type { Metadata } from "next";
import { Hero } from "@/components/public/Hero";
import { StatsStrip } from "@/components/public/StatsStrip";
import { FeaturedPrograms } from "@/components/public/FeaturedPrograms";
import { WhyChooseUs } from "@/components/public/WhyChooseUs";
import { Testimonials } from "@/components/public/Testimonials";
import { CampusLife } from "@/components/public/CampusLife";
import { ImageGallery } from "@/components/public/ImageGallery";
import { NewsTeaser } from "@/components/public/NewsTeaser";
import { CTASection } from "@/components/public/CTASection";

export const metadata: Metadata = {
  title: "St Alessandro University Institute — Empowering minds, Inspiring excellence",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <FeaturedPrograms />
      <WhyChooseUs />
      <CampusLife />
      <ImageGallery />
      <Testimonials />
      <NewsTeaser />
      <CTASection />
    </>
  );
}
