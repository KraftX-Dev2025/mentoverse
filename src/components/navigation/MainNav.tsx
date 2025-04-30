// src/components/navigation/MainNav.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { StaticImageData } from "next/image";
import { SERVICES } from "@/lib/constants";
import { LinkButton } from "../ui/Button";

// Navigation links
const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/mentors", label: "Mentors" },
    { href: "/services", label: "Services", hasDropdown: true },
    { href: "/resources", label: "Resources" },
    { href: "/contact-us", label: "Contact Us" },
];

interface MainNavProps {
    logo: StaticImageData;
    siteName: string;
}

export default function MainNav({ logo, siteName }: MainNavProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <Image
                            src={logo}
                            alt={siteName}
                            width={220}
                            height={60}
                            className="object-contain h-12 w-auto"
                            priority
                        />
                    </Link>

                    {/* Primary Navigation - Desktop */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {NAV_LINKS.map((link, index) => {
                            // For links with dropdowns (Services)
                            if (link.hasDropdown) {
                                return (
                                    <div key={index} className="relative group">
                                        <Link
                                            href={link.href}
                                            className="nav-link flex items-center"
                                        >
                                            {link.label}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 ml-1"
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
                                        <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white shadow-lg rounded-lg z-50">
                                            <div className="py-2">
                                                {SERVICES.map((service) => (
                                                    <Link
                                                        key={service.id}
                                                        href={`/services/${service.id}`}
                                                        className="block px-4 py-2 text-sm hover:bg-background hover:text-primary"
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

                            // Regular links
                            return (
                                <Link
                                    key={index}
                                    href={link.href}
                                    className="nav-link"
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* CTA Buttons & Mobile Menu Trigger */}
                    <div className="flex items-center">
                        <div className="hidden md:flex items-center space-x-4">
                            <LinkButton
                                href="/booking"
                                variant="primary"
                                size="md"
                            >
                                Book a Session
                            </LinkButton>
                            <LinkButton
                                href={typeof window !== 'undefined' ? window.location.pathname === '/dashboard' ? '/logout' : '/login' : '/login'}
                                variant="secondary"
                                size="md"
                            >
                                {typeof window !== 'undefined' && window.location.pathname === '/dashboard' ? 'Logout' : 'Login'}
                            </LinkButton>
                        </div>

                        {/* Mobile Menu Trigger */}
                        <button
                            className="md:hidden focus:outline-none ml-4"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {mobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4">
                    <nav className="flex flex-col space-y-4">
                        {NAV_LINKS.map((link, index) => {
                            if (link.hasDropdown) {
                                return (
                                    <div key={index} className="py-2">
                                        <div className="flex items-center justify-between">
                                            <Link
                                                href={link.href}
                                                className="font-medium"
                                            >
                                                {link.label}
                                            </Link>
                                        </div>
                                        <div className="mt-2 ml-4 space-y-2">
                                            {SERVICES.map((service) => (
                                                <Link
                                                    key={service.id}
                                                    href={`/services/${service.id}`}
                                                    className="block py-1 text-sm text-text-secondary"
                                                >
                                                    <span className="mr-2">
                                                        {service.icon}
                                                    </span>
                                                    {service.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    key={index}
                                    href={link.href}
                                    className="py-2 font-medium"
                                >
                                    {link.label}
                                </Link>
                            );
                        })}

                        <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
                            <LinkButton
                                href="/booking"
                                variant="primary"
                                size="md"
                                fullWidth
                            >
                                Book a Session
                            </LinkButton>
                            <LinkButton
                                href="/login"
                                variant="secondary"
                                size="md"
                                fullWidth
                            >
                                Login
                            </LinkButton>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
