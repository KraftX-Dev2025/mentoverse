import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { SITE_NAME, SITE_DESCRIPTION, SERVICES } from "@/lib/constants";
import Footer from "@/components/footer";
import "./globals.css";
import logo from "../../public/logo_noBG.webp";
// import logo2 from "../../public/only_logo.svg";

// Font configuration
const poppins = Poppins({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-poppins",
});

const inter = Inter({
    weight: ["400", "500", "600"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

// Navigation links object
const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About" },
    { href: "/mentors", label: "Mentors" },
    { href: "/resources", label: "Resources" },
    { href: "/contact-us", label: "Contact" },
];

// CTA buttons object
const CTA_BUTTONS = [
    { 
        href: "/booking", 
        label: "Book a Session", 
        className: "hidden md:inline-block btn-primary mr-4 p-4 rounded-2xl shadow-lg shadow-white" 
    },
    { 
        href: "/dashboard", 
        label: "Login", 
        className: "hidden md:inline-block btn-secondary mr-4 p-4 rounded-2xl shadow-lg shadow-white" 
    },
];

// Metadata for SEO
export const metadata: Metadata = {
    title: `${SITE_NAME} - Shaping Your Tomorrow`,
    description: SITE_DESCRIPTION,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
            <body className="flex flex-col min-h-screen">
                <header className="bg-white shadow-md sticky top-0 z-50">
                    <div className="container mx-auto px-4 py-3">
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

                            {/* Primary Navigation */}
                            <nav className="hidden md:flex items-center space-x-8">
                                {NAV_LINKS.map((link, index) => {
                                    // Special case for Services with dropdown
                                    if (link.label === "Services") {
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
                                    
                                    // Regular nav links
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
                                
                                {/* Services dropdown handled separately */}
                                <div className="relative group">
                                    <Link
                                        href="/services"
                                        className="nav-link flex items-center"
                                    >
                                        Services
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
                            </nav>

                            {/* CTA Button & Mobile Menu Trigger */}
                            <div className="flex items-center">
                                {CTA_BUTTONS.map((button, index) => (
                                    <Link
                                        key={index}
                                        href={button.href}
                                        className={button.className}
                                    >
                                        {button.label}
                                    </Link>
                                ))}
                                <button className="md:hidden focus:outline-none">
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
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-grow bg-background">{children}</main>

                <Footer 
                  logo={logo} 
                  siteName={SITE_NAME} 
                  services={SERVICES} 
                  navLinks={NAV_LINKS} 
                />
            </body>
        </html>
    );
}