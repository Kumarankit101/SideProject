import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import FeaturedIdeas from "@/components/FeaturedIdeas";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import InvestorsSection from "@/components/InvestorsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedIdeas />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
      <InvestorsSection />
    </>
  );
}
