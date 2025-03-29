import { Button } from "@/components/ui/button";
import { H1, Paragraph } from "@/components/ui/typography";
import { useLocation } from "wouter";

export default function HeroSection() {
  const [_, setLocation] = useLocation();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute top-0 right-0 w-3/5 h-full bg-[#ccff00] opacity-10 clip-path-polygon-[30%_0%,_100%_0%,_100%_100%,_0%_100%] z-0"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <H1 className="mb-4">
              Bring Your <span className="text-[#ccff00]">Side Project</span> To Life
            </H1>
            <Paragraph className="text-lg mb-8 max-w-lg">
              Join our community to share ideas, find collaborators, and turn your side projects into reality with support from like-minded entrepreneurs.
            </Paragraph>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                className="px-6 py-6 bg-[#ccff00] text-primary font-semibold hover:bg-[#a8cc00] shadow-md"
                onClick={() => setLocation("/submit")}
              >
                Start Your Side Project
              </Button>
              <Button
                variant="outline"
                className="px-6 py-6 border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white"
                onClick={() => setLocation("/explore")}
              >
                Browse Ideas
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 relative animate-bounce-slow">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Diverse entrepreneurs collaborating" 
              className="rounded-lg shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
