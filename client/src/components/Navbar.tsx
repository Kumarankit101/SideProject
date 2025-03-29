import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/typography";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [_, setLocation] = useLocation();
  
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
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
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
                <a className="relative text-neutral-700 hover:text-primary font-medium transition-colors duration-200 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-[#ccff00] after:transition-all after:duration-300 hover:after:w-full">
                  {link.name}
                </a>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-white"
              onClick={() => setLocation("/login")}
            >
              Log In
            </Button>
            <Button 
              className="bg-[#ccff00] text-primary font-semibold hover:bg-[#a8cc00]"
              onClick={() => setLocation("/register")}
            >
              Sign Up
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              className="text-gray-500 hover:text-primary focus:outline-none"
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
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link href={link.href} key={link.name}>
                <a 
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:bg-neutral-100 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex flex-col px-5 space-y-2">
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-white w-full"
                onClick={() => {
                  setLocation("/login");
                  setMobileMenuOpen(false);
                }}
              >
                Log In
              </Button>
              <Button 
                className="bg-[#ccff00] text-primary font-semibold hover:bg-[#a8cc00] w-full"
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
