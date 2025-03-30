import { Link } from "wouter";
import { Logo } from "@/components/ui/typography";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const platformLinks = [
    { name: "Explore Ideas", href: "/explore" },
    { name: "Submit Idea", href: "/submit" },
    { name: "Find Collaborators", href: "#" },
    { name: "Investor Connect", href: "#" },
    { name: "Success Stories", href: "#" },
  ];

  const resourceLinks = [
    { name: "Blog", href: "#" },
    { name: "Guides & Tutorials", href: "#" },
    { name: "Webinars", href: "#" },
    { name: "Startup Resources", href: "#" },
    { name: "Community Forum", href: "#" },
  ];

  const companyLinks = [
    { name: "About Us", href: "#" },
    { name: "Our Team", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "Press Kit", href: "#" },
  ];

  const socialLinks = [
    { Icon: FaTwitter, href: "#" },
    { Icon: FaFacebook, href: "#" },
    { Icon: FaInstagram, href: "#" },
    { Icon: FaLinkedin, href: "#" },
  ];

  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <Logo />
            </div>
            <p className="text-neutral-300 mb-4">
              The platform where side projects become successful startups.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="text-white hover:text-newlime transition-colors duration-200"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">
              Platform
            </h3>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <a className="text-neutral-300 hover:text-newlime transition-colors duration-200">
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <a className="text-neutral-300 hover:text-newlime transition-colors duration-200">
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <a className="text-neutral-300 hover:text-newlime transition-colors duration-200">
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-newlime pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} SideProject.com. All rights
              reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-neutral-400 hover:text-newlime text-sm transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-newlime text-sm transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-newlime text-sm transition-colors duration-200"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
