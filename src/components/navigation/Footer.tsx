import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone
} from "lucide-react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaInstagram
} from "react-icons/fa";
import { LEGAL_LINKS, SOCIAL_LINKS, CONTACT_INFO } from "@/lib/constants";
import { FooterProps } from "@/lib/types";
const iconComponents = {
  Facebook: <FaFacebook className="h-6 w-6" />,
  Twitter: <FaTwitter className="h-6 w-6" />,
  Linkedin: <FaLinkedin className="h-6 w-6" />,
  Youtube: <FaYoutube className="h-6 w-6" />,
  Instagram: <FaInstagram className="h-6 w-6" />,
  Mail: <Mail className="h-5 w-5 mr-2 text-current flex-shrink-0" />,
  Phone: <Phone className="h-5 w-5 mr-2 text-current flex-shrink-0" />
}


// Helper function to format phone number for WhatsApp
const formatWhatsAppLink = (phoneNumber: string) => {
  const digits = phoneNumber.replace(/\D/g, '');
  // Ensure the number starts with +91 (India country code)
  // const formatted = digits.startsWith("+91") ? digits : `+91${digits}`;
  return `https://wa.me/${digits}`;
};

export default function Footer({ logo, siteName, navLinks }: FooterProps) {
  return (
    <footer className="pt-12 pb-4 bg-white text-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-20">
          {/* Column 1: Logo & Description */}
          <div className="mb-2 md:mb-12 col-span-3 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src={logo}
                alt={siteName}
                width={220}
                height={60}
                className="object-contain h-16 w-auto"
              />
            </Link>
            <p className="text-md sm:text-lg mb-8 text-blue-900/70 font-semibold">
              Shaping Your Tomorrow - Fast track your career with personalized mentorship and
              expert guidance.
            </p>
          </div>

          {/* Column 3: Quick Links */}
          <div className="mb-8 md:mb-12">
            {/* <h4 className="font-semibold text-lg mb-4 underline underline-offset-3 text-blue-900">Quick Links</h4> */}
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href} className="">
                  <Link
                    href={link.href}
                    className="footer-link text-blue-900/70 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="max-w-full">
            <ul className="space-y-3">
              {CONTACT_INFO.map((item) => {
                const isPhone = item.iconName === "Phone";
                const linkHref = isPhone
                  ? formatWhatsAppLink(item.value)
                  : item.href || "";

                return (
                  <li key={item.id} className="contact-item">
                    {isPhone || item.href ? (
                      <Link
                        href={linkHref}
                        className="group flex items-start text-blue-900 hover:text-secondary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded"
                        aria-label={isPhone ? `Contact via WhatsApp: ${item.value}` : `Contact via ${item.value}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="text-current transition-colors duration-300">
                          {iconComponents[item.iconName as keyof typeof iconComponents]}
                        </span>
                        <span className="transition-colors duration-300 break-words overflow-hidden">{item.value}</span>
                      </Link>
                    ) : (
                      <div className="group flex items-start text-blue-900 hover:text-secondary transition-colors duration-300">
                        <span className="text-current transition-colors duration-300">
                          {iconComponents[item.iconName as keyof typeof iconComponents]}
                        </span>
                        <span className="transition-colors duration-300 break-words overflow-hidden">{item.value}</span>
                      </div>
                    )}
                  </li>
                );
              })}

              {/* Social Links */}
              <div className="flex flex-wrap space-y-2 space-x-6 mt-4">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-blue-900 hover:text-secondary transition-colors duration-300 transform hover:scale-110"
                    aria-label={`Follow us on ${social.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {iconComponents[social.iconName as keyof typeof iconComponents]}
                  </a>
                ))}
              </div>
            </ul>
          </div>
        </div>

        <div className="mt-2 pt-4 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm opacity-80 mb-4 md:mb-0 text-gray-400">
              © {new Date().getFullYear()} {siteName}. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center space-x-2">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm opacity-80 hover:opacity-100 text-gray-400 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded"
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