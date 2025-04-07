"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { StaticImageData } from "next/image";
import { SITE_NAME, SERVICES } from "@/lib/constants";
import Button from "@/components/ui/Button";

interface NavbarProps {
    logo: StaticImageData;
}

const Navbar = ({ logo }: NavbarProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Navigation links
    const NAV_LINKS = [
        { href: "/", label: "Home" },
        { href: "/about-us", label: "About Us" },
        { href: "/services", label: "Services" },
        { href: "/mentors", label: "Mentors" },
        { href: "/resources", label: "Resources" },
        { href: "/contact-us", label: "Contact Us" },
    ];

    // Handle scroll event to change navbar appearance
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);

        // Clean up event listener
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? "bg-white/95 backdrop-blur-sm shadow-md py-2"
                    : "bg-transparent py-4"
            }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center z-10">
                        <Image
                            src={logo}
                            alt={SITE_NAME}
                            width={180}
                            height={50}
                            className="object-contain h-10 md:h-12 w-auto"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {NAV_LINKS.map((link, index) => {
                            // Special case for Services with dropdown
                            if (link.label === "Services") {
                                return (
                                    <div key={index} className="relative group">
                                        <Link
                                            href={link.href}
                                            className="nav-link flex items-center text-text-primary font-medium hover:text-primary transition-colors duration-300"
                                        >
                                            {link.label}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:rotate-180"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </Link>
                                        <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left group-hover:translate-y-0 translate-y-2 bg-white shadow-lg rounded-lg z-50">
                                            <div className="py-2">
                                                {SERVICES.map((service) => (
                                                    <Link
                                                        key={service.id}
                                                        href={`/services/${service.id}`}
                                                        className="block px-4 py-2 text-sm hover:bg-background hover:text-primary transition-colors duration-200"
                                                    >
                                                        <span className="mr-2">
                                                            {service.icon}
                                                        </span>
                                                        {service.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            // Regular nav links
                            return (
                                <Link
                                    key={index}
                                    href={link.href}
                                    className="text-text-primary font-medium hover:text-primary transition-colors duration-300"
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* CTA Buttons & Mobile Menu Trigger */}
                    <div className="flex items-center space-x-4">
                        <div className="hidden md:block">
                            <Link href="/booking">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className="shadow-lg shadow-primary/20"
                                >
                                    Book a Session
                                </Button>
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <Link href="/dashboard">
                                <Button variant="outline" size="sm">
                                    Login
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="md:hidden focus:outline-none"
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            aria-label="Toggle menu"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={
                                        isMobileMenuOpen
                                            ? "M6 18L18 6M6 6l12 12"
                                            : "M4 6h16M4 12h16M4 18h16"
                                    }
                                />
                            </svg>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-white border-t mt-2 shadow-lg z-30"
                    >
                        <div className="container mx-auto px-4 py-4 space-y-4">
                            {NAV_LINKS.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.href}
                                    className="block py-2 text-text-primary hover:text-primary"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {/* Services Section in Mobile Menu */}
                            <div className="py-2 border-t border-gray-100">
                                <h4 className="font-medium mb-2">Services</h4>
                                <div className="pl-4 space-y-2">
                                    {SERVICES.map((service) => (
                                        <Link
                                            key={service.id}
                                            href={`/services/${service.id}`}
                                            className="block py-1 text-sm text-text-secondary hover:text-primary"
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                        >
                                            <span className="mr-2">
                                                {service.icon}
                                            </span>
                                            {service.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile CTA Buttons */}
                            <div className="pt-2 space-y-3">
                                <Link href="/booking" className="block">
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        fullWidth
                                    >
                                        Book a Session
                                    </Button>
                                </Link>
                                <Link href="/dashboard" className="block">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        fullWidth
                                    >
                                        Login
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
