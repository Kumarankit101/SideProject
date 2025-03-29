import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import FeaturedIdeas from "@/components/FeaturedIdeas";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import InvestorsSection from "@/components/InvestorsSection";
import MovingTextStrip from "@/components/MovingTextStrip";
import DontBeShySection from "@/components/DontBeShySection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <MovingTextStrip 
        text="LET'S TALK ★ INNOVATION ★ SIDE PROJECTS ★ COLLABORATION ★ SUCCESS ★" 
        bgColor="#DDF695"
        textColor="#171817"
        fontSize="2xl"
        speed="medium"
      />
      <FeaturedIdeas />
      <DontBeShySection />
      <WhyChooseUsSection />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
      <InvestorsSection />
    </>
  );
}
