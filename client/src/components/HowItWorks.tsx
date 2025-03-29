import { H2, Paragraph } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function HowItWorks() {
  const [_, setLocation] = useLocation();

  const steps = [
    {
      number: 1,
      title: "Submit Your Idea",
      description: "Share your side project concept with our community using our simple submission form."
    },
    {
      number: 2,
      title: "Get Feedback",
      description: "Receive valuable feedback and suggestions from fellow entrepreneurs and industry experts."
    },
    {
      number: 3,
      title: "Find Collaborators",
      description: "Connect with potential co-founders, developers, designers, and other specialists."
    },
    {
      number: 4,
      title: "Launch & Grow",
      description: "Take your project from concept to reality and access resources to help it thrive."
    }
  ];

  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-[#172541] opacity-30"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <H2 className="text-white">How It Works</H2>
          <Paragraph className="max-w-2xl mx-auto opacity-90 text-white">
            Our platform makes it easy to go from idea to implementation in four simple steps.
          </Paragraph>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-16 h-16 bg-[#ccff00] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-xl font-bold">{step.number}</span>
              </div>
              <h3 className="font-montserrat font-semibold text-xl mb-2">{step.title}</h3>
              <p className="opacity-80 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Button 
            className="px-6 py-3 bg-[#ccff00] text-primary font-semibold hover:bg-[#a8cc00] shadow-md"
            onClick={() => setLocation("/submit")}
          >
            Start Your Journey
          </Button>
        </div>
      </div>
    </section>
  );
}
