import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/typography";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [_, setLocation] = useLocation();
  
  // Store previous scroll position
  const prevScrollY = useRef(0);
  
  // Handle scroll event to add background when scrolling and hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrolled = currentScrollY > 10;
      
      // Update background style
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      // Hide/show based on scroll direction
      if (currentScrollY < 50) {
        // Always show navbar at the top of the page
        setVisible(true);
      } else if (prevScrollY.current < currentScrollY && visible) {
        // Scrolling down - hide navbar
        setVisible(false);
      } else if (prevScrollY.current > currentScrollY && !visible) {
        // Scrolling up - show navbar
        setVisible(true);
      }
      
      // Update previous scroll position
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled, visible]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const navLinks = [
    { name: "Explore Ideas", href: "/explore" },
    { name: "Submit Idea", href: "/submit" },
    { name: "Collaborate", href: "#" },
    { name: "Learn", href: "#" },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-[#171817]/80 backdrop-blur-md shadow-lg" 
          : "bg-transparent"
      } ${
        visible 
          ? "top-0" 
          : "-top-24"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <Logo />
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link href={link.href} key={link.name}>
                <div className="relative text-white hover:text-[#ccff00] font-medium transition-colors duration-300 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-[#ccff00] after:transition-all after:duration-300 hover:after:w-full cursor-pointer">
                  {link.name}
                </div>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            <Button 
              variant="glowing" 
              size="pill"
              className="text-white border-white/30 hover:text-[#DDF695]"
              onClick={() => setLocation("/login")}
            >
              Log In
            </Button>
            <Button 
              variant="glowing" 
              size="pill"
              className="border-[#DDF695]/50 text-[#DDF695] shadow-[0_0_20px_rgba(221,246,149,0.3)] hover:text-white hover:border-white/70"
              onClick={() => setLocation("/register")}
            >
              Sign Up
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              className="text-white hover:text-[#ccff00] focus:outline-none transition-colors duration-300"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#171817]/95 backdrop-blur-md shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link href={link.href} key={link.name}>
                <div 
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#2a2a2a] hover:text-[#ccff00] transition-colors duration-300 cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </div>
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-6 border-t border-gray-700">
            <div className="flex flex-col px-5 space-y-3">
              <Button 
                variant="glowing" 
                size="pill"
                className="text-white border-white/30 hover:text-[#DDF695] w-full"
                onClick={() => {
                  setLocation("/login");
                  setMobileMenuOpen(false);
                }}
              >
                Log In
              </Button>
              <Button 
                variant="glowing" 
                size="pill"
                className="border-[#DDF695]/50 text-[#DDF695] shadow-[0_0_20px_rgba(221,246,149,0.3)] hover:text-white hover:border-white/70 w-full"
                onClick={() => {
                  setLocation("/register");
                  setMobileMenuOpen(false);
                }}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
