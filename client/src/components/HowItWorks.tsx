import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HowItWorks() {
  const [_, setLocation] = useLocation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftSideRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [sectionBounds, setSectionBounds] = useState({ top: 0, bottom: 0, height: 0 });

  // For the progress line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const updateSectionBounds = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY;
      const top = rect.top + scrollTop;
      const height = rect.height;
      const bottom = top + height;
      
      setSectionBounds({ top, bottom, height });
    };

    updateSectionBounds();
    window.addEventListener('resize', updateSectionBounds);
    
    return () => {
      window.removeEventListener('resize', updateSectionBounds);
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !leftSideRef.current) return;

    const handleScroll = () => {
      if (!sectionRef.current || !leftSideRef.current) return;
      
      const scrollY = window.scrollY;
      const { top, bottom, height } = sectionBounds;
      const windowHeight = window.innerHeight;
      const leftSideHeight = leftSideRef.current.offsetHeight;
      const headerOffset = 80; // Approximate header height
      
      // Calculate the section's progress as user scrolls
      const sectionProgress = Math.max(0, Math.min(1, (scrollY + windowHeight/2 - top) / (height - windowHeight/2)));
      
      // Determine which step is active based on the progress
      if (sectionProgress < 0.25) {
        setActiveStep(0);
      } else if (sectionProgress < 0.5) {
        setActiveStep(1);
      } else if (sectionProgress < 0.75) {
        setActiveStep(2);
      } else {
        setActiveStep(3);
      }
      
      // Calculate when the left side should become fixed and when it should stop
      const leftSide = leftSideRef.current;
      
      if (scrollY < top - headerOffset) {
        // Before the section: position static
        leftSide.style.position = 'relative';
        leftSide.style.top = '0px';
      } else if (scrollY >= top - headerOffset && scrollY <= bottom - leftSideHeight - headerOffset) {
        // During the section: position fixed
        leftSide.style.position = 'fixed';
        leftSide.style.top = `${headerOffset}px`;
        leftSide.style.width = ''; // Let the parent control the width
      } else {
        // After the section: position absolute at the bottom
        leftSide.style.position = 'absolute';
        leftSide.style.top = `${height - leftSideHeight}px`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize positions
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionBounds]);

  const steps = [
    {
      week: "Week 1",
      title: "Idea Submission",
      description: "Share your side project concept with our community through our simple submission form. Provide details about your vision, target audience, and goals."
    },
    {
      week: "Week 2",
      title: "Community Feedback",
      description: "Receive valuable insights from fellow entrepreneurs and industry experts. Our community helps refine your concept with honest and constructive feedback."
    },
    {
      week: "Week 3",
      title: "Collaboration Matching",
      description: "Connect with potential co-founders, developers, designers, and specialists who can help bring your vision to life with complementary skills."
    },
    {
      week: "Week 4",
      title: "Launch & Growth",
      description: "Take your project from concept to reality with our resources. Access mentorship, funding opportunities, and growth strategies to help your side project thrive."
    }
  ];
  
  return (
    <section 
      ref={sectionRef} 
      className="py-24 min-h-[100vh] bg-[#171817] relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-16">
          {/* Left side (fixed once it reaches the top) */}
          <div className="md:w-1/2 relative">
            <div ref={leftSideRef} className="w-full md:w-[calc(50%-32px)]">
              <div className="mb-8">
                <h4 className="text-[#DDF695] font-medium mb-3">Our Process</h4>
                <h2 className="text-white text-5xl md:text-6xl font-bold leading-tight">
                  From Idea<br />to Launch
                </h2>
              </div>
              
              <p className="text-gray-400 mb-8 text-lg max-w-md">
                We've streamlined the journey from concept to reality with our proven four-week process designed to help entrepreneurs bring their ideas to life.
              </p>
              
              <div className="flex gap-4 mt-12">
                <Button
                  variant="glowing"
                  size="pill"
                  className="border-[#DDF695]/50 text-[#DDF695] shadow-[0_0_30px_rgba(221,246,149,0.4)] hover:text-white hover:border-white/70"
                  onClick={() => setLocation("/submit-idea")}
                >
                  Start Your Journey
                </Button>
                
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => setLocation("/explore")}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
          
          {/* Right side (fixed position with steps) */}
          <div className="md:w-1/2 relative">
            {/* Vertical progress line */}
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-700"></div>
            
            {/* Animated progress overlay */}
            <motion.div 
              className="absolute left-[11px] top-2 w-0.5 bg-[#DDF695]"
              style={{ 
                height: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
                originY: 0
              }}
            ></motion.div>
            
            {/* Steps */}
            <div className="space-y-28 relative">
              {steps.map((step, index) => (
                <div key={index} className="relative pl-12">
                  {/* Step indicator dot */}
                  <div 
                    className={`absolute left-0 top-1.5 w-6 h-6 rounded-full z-10 flex items-center justify-center transition-all duration-500 ${
                      activeStep >= index 
                        ? 'bg-[#DDF695]' 
                        : 'bg-gray-600'
                    }`}
                  >
                    {activeStep > index && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#171817]">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  
                  {/* Step content */}
                  <div className={`transition-opacity duration-500 ${activeStep === index ? 'opacity-100' : 'opacity-50'}`}>
                    <div className="text-gray-400 mb-1">{step.week}</div>
                    <h3 className={`text-2xl font-bold mb-3 transition-colors duration-500 ${
                      activeStep === index ? 'text-[#DDF695]' : 'text-white'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
