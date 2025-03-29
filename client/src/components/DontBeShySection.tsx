import React from 'react';
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function DontBeShySection() {
  const [_, setLocation] = useLocation();
  
  return (
    <section className="bg-white py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-[#171817] text-6xl md:text-8xl font-bold mb-12 tracking-tight">
          DON'T BE SHY
        </h2>
        
        <div className="max-w-2xl mx-auto">
          <p className="text-[#171817] text-xl mb-10 opacity-75">
            Great ideas deserve to be shared. It's your time to shine!
          </p>
          
          <Button 
            className="bg-[#171817] text-white hover:bg-[#2a2a2a] px-10 py-7 text-xl h-auto transition-all duration-300 rounded-lg shadow-lg transform hover:scale-105"
            onClick={() => setLocation("/submit")}
          >
            Submit Your Idea
          </Button>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-[#DDF695]/30 blur-3xl"></div>
        <div className="absolute right-0 top-1/4 w-48 h-48 rounded-full bg-[#DDF695]/20 blur-3xl"></div>
      </div>
    </section>
  );
}