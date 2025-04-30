import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Mail,
  Phone
} from "lucide-react";
import { LEGAL_LINKS, SOCIAL_LINKS, CONTACT_INFO } from "@/lib/constants";
import { FooterProps } from "@/lib/types";

// Map icon names to lucide components
const iconComponents = {
  Facebook: <Facebook className="h-6 w-6" />,
  Twitter: <Twitter className="h-6 w-6" />,
  Linkedin: <Linkedin className="h-6 w-6" />,
  Youtube: <Youtube className="h-6 w-6" />,
  Instagram: <Instagram className="h-6 w-6" />,
  Mail: <Mail className="h-6 w-6 mr-2 text-white mt-0.5 hover:text-secondary" />,
  Phone: <Phone className="h-6 w-6 mr-2 mt-0.5 text-white hover:text-secondary" />
};

export default function Footer({ logo, siteName, services, navLinks }: FooterProps) {
  return (
    <footer className="bg-darkBackground pt-12 pb-6 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo & Description */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="inline-block mb-4">
              <Image
                src={logo}
                alt={siteName}
                width={220}
                height={60}
                className="object-contain h-16 w-auto"
              />
            </Link>
            <p className="text-md font-bold mb-4">
              Shaping Your Tomorrow - Fast track your career with personalized mentorship and
              expert guidance.
            </p>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="hover:text-secondary transition-all duration-300 transform hover:scale-125"
                  aria-label={social.name}
                >
                  {iconComponents[social.iconName as keyof typeof iconComponents]}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">Our Services</h4>
            <ul className="space-y-2">
              {services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link href={`/services#${service.id}-section`} className="footer-link text-white">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              {CONTACT_INFO.map((item) => (
                <li key={item.id} className="flex items-start">
                  {iconComponents[item.iconName as keyof typeof iconComponents]}
                  {item.href ? (
                    <a href={item.href} className="hover:text-secondary transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <span>{item.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm opacity-80 mb-4 md:mb-0">
              © {new Date().getFullYear()} {siteName}. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm opacity-80 hover:opacity-100"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}