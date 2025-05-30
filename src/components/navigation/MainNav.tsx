"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { StaticImageData } from "next/image";
import {
    Home,
    Info,
    Users,
    Briefcase,
    BookOpen,
    MessageSquare,
    ChevronDown,
    Menu,
    X
} from "lucide-react";
import { SERVICES, NAV_LINKS } from "@/lib/constants";
import { LinkButton } from "../ui/Button";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface MainNavProps {
    logo: StaticImageData;
    siteName: string;
}

// Map icon names to lucide components
const iconComponents = {
    Home: <Home className="h-5 w-5 mr-2" />,
    Info: <Info className="h-5 w-5 mr-2" />,
    Users: <Users className="h-5 w-5 mr-2" />,
    Briefcase: <Briefcase className="h-5 w-5 mr-2" />,
    BookOpen: <BookOpen className="h-5 w-5 mr-2" />,
    MessageSquare: <MessageSquare className="h-5 w-5 mr-2" />
};

export default function MainNav({ logo, siteName }: MainNavProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                console.log('User is logged in.');
                setUser(currentUser);
            } else {
                console.log('User is not logged in.');
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    // Handler to close mobile menu on navigation
    const handleNavLinkClick = () => {
        setMobileMenuOpen(false);
    };

    // Handler to close both mobile menu and services dropdown
    const handleServiceItemClick = () => {
        setMobileMenuOpen(false);
        setServicesDropdownOpen(false);
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-2 ">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center mb-2 sm:mb-4">
                        <Image
                            src={logo}
                            alt={siteName}
                            width={220}
                            height={60}
                            className="object-cover w-auto h-[2.5rem]"
                            priority
                        />
                    </Link>

                    {/* Primary Navigation - Desktop */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {NAV_LINKS
                            .map((link, index) => {

                                if (link.hasDropdown) {
                                    return (
                                        <div key={index} className="relative group">
                                            <Link
                                                href={link.href}
                                                className="nav-link flex items-center text-primary hover:text-secondary"
                                            >
                                                {iconComponents[link.icon as keyof typeof iconComponents]}
                                                {link.label}
                                                <ChevronDown className="h-4 w-4 ml-1" />
                                            </Link>
                                            <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white shadow-lg rounded-lg z-50">
                                                <div className="py-2">
                                                    {SERVICES.map((service) => (
                                                        <Link
                                                            key={service.id}
                                                            href={`/services#${service.id}-section`}
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
                                        className="nav-link flex items-center text-primary hover:text-secondary"
                                    >
                                        {iconComponents[link.icon as keyof typeof iconComponents]}
                                        {link.label}
                                    </Link>
                                );
                            })}
                    </nav>

                    {/* CTA Buttons & Mobile Menu Trigger */}
                    <div className="flex items-center">
                        <div className="hidden md:flex items-center space-x-4">
                            <Link href="/mentors" className="btn-secondary px-3 py-2 rounded-lg ">
                                Book a Session
                            </Link>
                        </div>

                        {/* Mobile Menu Trigger */}
                        <button
                            className="md:hidden focus:outline-none ml-4"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6 text-primary" />
                            ) : (
                                <Menu className="h-6 w-6 text-primary" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu - Floating Dropdown Panel */}
                <div
                    className={`md:hidden absolute top-full right-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-50 overflow-hidden transition-all duration-300 origin-top-left ${mobileMenuOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                        }`}
                >
                    <nav className="flex flex-col p-4">
                        {NAV_LINKS.map((link, index) => {
                            if (link.hasDropdown) {
                                return (
                                    <div key={index} className="py-2">
                                        <button
                                            type="button"
                                            onClick={() => setServicesDropdownOpen(prev => !prev)}
                                            className="w-full font-medium flex items-center justify-between text-left"
                                        >
                                            <span className="flex items-center text-primary">
                                                {iconComponents[link.icon as keyof typeof iconComponents]}
                                                {link.label}
                                            </span>
                                            <ChevronDown
                                                className={`h-4 w-4 ml-2 transform transition-transform ${servicesDropdownOpen ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </button>

                                        <div
                                            className={`mt-2 ml-4 space-y-2 overflow-hidden transition-all duration-200 ${servicesDropdownOpen
                                                ? "max-h-64 opacity-100"
                                                : "max-h-0 opacity-0"
                                                }`}
                                        >
                                            {SERVICES.map((service) => (
                                                <Link
                                                    key={service.id}
                                                    href={`/services#${service.id}-section`}
                                                    onClick={handleServiceItemClick}
                                                    className="block py-1 text-sm text-primary"
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
                                    className="py-2 font-medium flex items-center text-primary"
                                    onClick={handleNavLinkClick}
                                >
                                    {iconComponents[link.icon as keyof typeof iconComponents]}
                                    {link.label}
                                </Link>
                            );
                        })}

                        <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100 mt-2">
                            <div onClick={handleNavLinkClick}>
                                <Link href="/mentors" className="btn-secondary px-3 py-2 rounded-lg inline-block">
                                    Book a Session
                                </Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}