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
import PhysicsCanvas from "@/components/PhysicsCanvas";
import { useEffect, useState } from "react";
import {
  initialCapsules,
  canvasWidth,
  canvasHeight,
} from "../constants/constants";

export default function HomePage() {
  const [width, setWidth] = useState(canvasWidth);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = Math.min(window.innerWidth - 32, canvasWidth); // 32px for margins
      setWidth(newWidth);
    };

    handleResize(); // Initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-24">
        <PhysicsCanvas
          key={width}
          capsules={initialCapsules}
          width={width}
          height={canvasHeight}
        />
      </div>
      {/* <HeroSection /> */}
      {/* <StatsSection /> */}
      <MovingTextStrip
        text="DREAM INNOVATION  COLLABORATION SUCCESS"
        bgColor="#DDF695"
        textColor="#171817"
        fontSize="6xl"
        speed="verySlow"
      />
      <FeaturedIdeas />
      <DontBeShySection />
      <HowItWorks />
      <WhyChooseUsSection />

      <Testimonials />
      <CallToAction />
      <InvestorsSection />
    </>
  );
}
