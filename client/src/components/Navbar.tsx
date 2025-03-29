import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/typography";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [_, setLocation] = useLocation();
  
  // Handle scroll event to add background when scrolling
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-[#171817]/80 backdrop-blur-md shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <Logo />
              </a>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link href={link.href} key={link.name}>
                <a className="relative text-white hover:text-[#ccff00] font-medium transition-colors duration-300 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-[#ccff00] after:transition-all after:duration-300 hover:after:w-full">
                  {link.name}
                </a>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="border-[#ccff00] text-white hover:bg-[#ccff00] hover:text-[#171817] transition-all duration-300"
              onClick={() => setLocation("/login")}
            >
              Log In
            </Button>
            <Button 
              className="bg-[#ccff00] text-[#171817] font-semibold hover:bg-[#a8cc00] transition-all duration-300"
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
                <a 
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#2a2a2a] hover:text-[#ccff00] transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex flex-col px-5 space-y-2">
              <Button 
                variant="outline" 
                className="border-[#ccff00] text-white hover:bg-[#ccff00] hover:text-[#171817] w-full transition-all duration-300"
                onClick={() => {
                  setLocation("/login");
                  setMobileMenuOpen(false);
                }}
              >
                Log In
              </Button>
              <Button 
                className="bg-[#ccff00] text-[#171817] font-semibold hover:bg-[#a8cc00] w-full transition-all duration-300"
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
