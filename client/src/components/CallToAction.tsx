import { H2, Paragraph } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function CallToAction() {
  const [_, setLocation] = useLocation();

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#fcccc9] opacity-10 rounded-full -mr-40"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <H2 className="text-3xl md:text-4xl mb-6">Ready to Turn Your Idea Into Reality?</H2>
          <Paragraph className="text-lg mb-8">
            Join our community today and take the first step towards bringing your side project to life.
          </Paragraph>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              className="px-8 py-6 bg-[#ccff00] text-primary font-semibold hover:bg-[#a8cc00] shadow-md"
              onClick={() => setLocation("/submit")}
            >
              Submit Your Idea
            </Button>
            <Button
              variant="outline"
              className="px-8 py-6 border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white"
              onClick={() => setLocation("/explore")}
            >
              Browse Projects
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
