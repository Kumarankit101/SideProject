import React, { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function DontBeShySection() {
  const [_, setLocation] = useLocation();
  const [animate, setAnimate] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Trigger animation on component mount with a small delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 500);
    
    // Handle scroll for parallax effect
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate transform based on scroll position
  const calculateTransform = () => {
    if (!sectionRef.current) return {};
    
    // Get section position
    const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
    const offset = window.scrollY - sectionTop + window.innerHeight;
    
    // Only start transforming when the section is about to come into view
    if (offset < 0) return {};
    
    // Calculate transform values - moves section up faster than normal scroll
    const moveUpValue = Math.min(offset * 0.5, 300); // Limit maximum movement
    
    return {
      transform: `translateY(-${moveUpValue}px)`,
    };
  };

  return (
    <section 
      ref={sectionRef}
      id="dont-be-shy-section"
      className="relative bg-white min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        marginTop: '-20vh', // Pull up to overlap with the featured section
        clipPath: `polygon(0 0, 100% 8rem, 100% 100%, 0 100%)`,
        paddingTop: '12rem',
        zIndex: 30,
        transition: 'transform 1.5s ease-out', // Much slower transition
        ...calculateTransform(),
      }}
    >
      {/* Main content */}
      <div 
        className={`container mx-auto px-4 sm:px-6 lg:px-8 text-center py-40 transition-all duration-2000 ease-in-out ${
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
            variant="glowing"
            size="pill"
            className={`border-[#DDF695]/50 text-[#DDF695] shadow-[0_0_30px_rgba(221,246,149,0.4)] hover:text-white hover:border-white/70 px-12 py-8 text-xl md:text-2xl h-auto transition-all duration-500 transform hover:scale-105 ${
              animate ? 'animate-bounce-in' : 'opacity-0'
            }`}
            onClick={() => setLocation("/submit")}
          >
            Submit Your Idea
          </Button>
        </div>
      </div>
      
      {/* Decorative elements that slide in and have parallax effect */}
      <div 
        className={`absolute -left-36 -bottom-36 w-96 h-96 rounded-full bg-[#DDF695]/30 blur-3xl transition-all duration-3000 ${
          animate ? 'opacity-100 transform-none' : 'opacity-0 translate-x-20'
        }`}
        style={{
          transform: `translateY(${scrollY * 0.015}px)`, // Even slower parallax for depth
          transition: 'transform 2s ease-out, opacity 3s ease-in-out' 
        }}
      ></div>
      <div 
        className={`absolute right-0 top-1/4 w-80 h-80 rounded-full bg-[#DDF695]/20 blur-3xl transition-all duration-3000 delay-700 ${
          animate ? 'opacity-100 transform-none' : 'opacity-0 -translate-x-20'
        }`}
        style={{
          transform: `translateY(${scrollY * 0.02}px)`, // Slowed down parallax for smoother effect
          transition: 'transform 2s ease-out, opacity 3s ease-in-out'
        }}
      ></div>
      <div 
        className={`absolute top-36 left-1/4 w-64 h-64 rounded-full bg-[#DDF695]/25 blur-3xl transition-all duration-3000 delay-1000 ${
          animate ? 'opacity-100 transform-none' : 'opacity-0 translate-y-20'
        }`}
        style={{
          transform: `translateY(${scrollY * 0.01}px)`, // Very subtle parallax for depth
          transition: 'transform 2s ease-out, opacity 3s ease-in-out'
        }}
      ></div>
      
      {/* Background patterns with subtle parallax */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          transform: `translateY(${scrollY * 0.02}px)`,
        }}
      >
        <div className="grid grid-cols-10 h-full">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-gray-500"></div>
          ))}
        </div>
      </div>
    </section>
  );
}