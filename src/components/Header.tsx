"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { SITE_NAME, SERVICES } from "@/lib/constants";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

// const CTA_BUTTONS = [
//     {
//         href: "/booking",
//         label: "Book a Session",
//         className:
//             "hidden md:inline-block btn-primary mr-4 p-4 rounded-2xl shadow-lg shadow-white",
//     },
//     {
//         href: "/dashboard",
//         label: "Login",
//         className:
//             "hidden md:inline-block btn-secondary mr-4 p-3 px-4 ml-2 rounded-2xl shadow-md shadow-black",
//     },
// ];

// Navigation links object
const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About" },
    { href: "/mentors", label: "Mentors" },
    { href: "/resources", label: "Resources" },
    { href: "/contact-us", label: "Contact" },
];

interface HeaderProps {
    logo: StaticImageData;
}

export default function Header({ logo }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isServiceOpen, setIsServiceOpen] = useState(false);
    
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleServices = () => setIsServiceOpen(!isServiceOpen);

    return (
        <header className="bg-white text-black shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-1 py-3">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <Image
                            src={logo}
                            alt={SITE_NAME}
                            width={220}
                            height={60}
                            className="object-contain h-12 w-auto"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex font-bold items-center space-x-8">
                        {NAV_LINKS.map((link, index) => (
                            <Link key={index} href={link.href} className="nav-link">
                                {link.label}
                            </Link>
                        ))}

                        {/* Services dropdown */}
                        <div className="relative group">
                            <Link href="/services" className="nav-link flex items-center">
                                Services
                                <FiChevronDown className="h-4 w-4 ml-1" />
                            </Link>
                            <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white shadow-lg rounded-lg z-50">
                                <div className="py-2">
                                    {SERVICES.map((service) => (
                                        <Link
                                            key={service.id}
                                            href={`/services#${service.id}-section`}
                                            className="block px-4 py-2 text-sm hover:bg-background text-primary hover:text-secondary"
                                        >
                                            <span className="mr-2">{service.icon}</span>
                                            {service.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </nav>

                    {/* Login & Mobile Menu Button */}
                    <div className="flex items-center">
                        <Link
                            href="/dashboard"
                            className="hidden md:inline-block btn-secondary mr-4 p-3 px-4 ml-2 rounded-2xl shadow-md shadow-black"
                        >
                            Login
                        </Link>
                        <button 
                            className="md:hidden focus:outline-none" 
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? 
                                <FaTimes className="h-6 w-6 text-primary" /> : 
                                <FaBars className="h-6 w-6 text-primary" />
                            }
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 py-4 px-2 bg-white rounded-lg shadow-lg">
                        <nav className="flex flex-col space-y-4">
                            {NAV_LINKS.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.href}
                                    className="block py-2 px-4 text-black hover:bg-background hover:text-primary rounded-md"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            
                            {/* Mobile Services Dropdown */}
                            <div className="py-2 px-4">
                                <button 
                                    className="flex items-center justify-between w-full text-left text-black font-medium"
                                    onClick={toggleServices}
                                >
                                    <span>Services</span>
                                    {isServiceOpen ? 
                                        <FiChevronUp className="h-4 w-4 text-primary" /> : 
                                        <FiChevronDown className="h-4 w-4 text-primary" />
                                    }
                                </button>
                                
                                {isServiceOpen && (
                                    <div className="mt-2 space-y-2 pl-4">
                                        {SERVICES.map((service) => (
                                            <Link
                                                key={service.id}
                                                href={`/services#${service.id}-section`}
                                                className="block py-2 text-sm text-primary hover:text-secondary"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <span className="mr-2">{service.icon}</span>
                                                {service.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            {/* Mobile Login Button */}
                            <Link
                                href="/dashboard"
                                className="block py-2 px-4 bg-primary text-white rounded-lg text-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Login
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}