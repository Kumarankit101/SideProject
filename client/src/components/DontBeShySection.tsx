import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function DontBeShySection() {
  const [_, setLocation] = useLocation();
  const [animate, setAnimate] = useState(false);
  
  // Trigger animation on component mount with a small delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      className="relative bg-white min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        marginTop: '-20vh', // Pull up to overlap with the featured section
        clipPath: `polygon(0 0, 100% 8rem, 100% 100%, 0 100%)`,
        paddingTop: '12rem',
        zIndex: 30,
      }}
    >
      {/* Main content */}
      <div 
        className={`container mx-auto px-4 sm:px-6 lg:px-8 text-center py-40 transition-all duration-1000 ease-in-out ${
          animate ? 'opacity-100 transform-none' : 'opacity-0 translate-y-20'
        }`}
      >
        <h2 className="text-[#171817] text-7xl md:text-9xl font-bold mb-12 tracking-tight animate-fade-in">
          DON'T BE SHY
        </h2>
        
        <div className="max-w-2xl mx-auto">
          <p className="text-[#171817] text-xl md:text-2xl mb-12 opacity-75 animate-fade-in-delay">
            Great ideas deserve to be shared. It's your time to shine!
          </p>
          
          <Button 
            className={`bg-[#171817] text-white hover:bg-[#2a2a2a] px-12 py-8 text-xl md:text-2xl h-auto transition-all duration-300 rounded-lg shadow-2xl transform hover:scale-105 ${
              animate ? 'animate-bounce-in' : 'opacity-0'
            }`}
            onClick={() => setLocation("/submit")}
          >
            Submit Your Idea
          </Button>
        </div>
      </div>
      
      {/* Decorative elements that slide in */}
      <div 
        className={`absolute -left-36 -bottom-36 w-96 h-96 rounded-full bg-[#DDF695]/30 blur-3xl transition-all duration-1000 ${
          animate ? 'opacity-100 transform-none' : 'opacity-0 translate-x-20'
        }`}
      ></div>
      <div 
        className={`absolute right-0 top-1/4 w-80 h-80 rounded-full bg-[#DDF695]/20 blur-3xl transition-all duration-1000 delay-300 ${
          animate ? 'opacity-100 transform-none' : 'opacity-0 -translate-x-20'
        }`}
      ></div>
      <div 
        className={`absolute top-36 left-1/4 w-64 h-64 rounded-full bg-[#DDF695]/25 blur-3xl transition-all duration-1000 delay-500 ${
          animate ? 'opacity-100 transform-none' : 'opacity-0 translate-y-20'
        }`}
      ></div>
      
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-10 h-full">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-gray-500"></div>
          ))}
        </div>
      </div>
    </section>
  );
}