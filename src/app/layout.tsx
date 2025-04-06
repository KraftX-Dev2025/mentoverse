import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { SITE_NAME, SITE_DESCRIPTION, SERVICES } from "@/lib/constants";
import "./globals.css";

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
                                    src="/logo.svg"
                                    alt={SITE_NAME}
                                    width={180}
                                    height={40}
                                    priority
                                />
                            </Link>

                            {/* Primary Navigation */}
                            <nav className="hidden md:flex items-center space-x-8">
                                <Link href="/" className="nav-link">
                                    Home
                                </Link>
                                <Link href="/about-us" className="nav-link">
                                    About Us
                                </Link>
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
                                <Link href="/mentors" className="nav-link">
                                    Mentors
                                </Link>
                                <Link href="/resources" className="nav-link">
                                    Resources
                                </Link>
                                <Link href="/contact-us" className="nav-link">
                                    Contact Us
                                </Link>
                            </nav>

                            {/* CTA Button & Mobile Menu Trigger */}
                            <div className="flex items-center">
                                <Link
                                    href="/booking"
                                    className="hidden md:inline-block btn-primary mr-4"
                                >
                                    Book a Session
                                </Link>
                                <Link
                                    href="/dashboard"
                                    className="hidden md:inline-block btn-secondary mr-4"
                                >
                                    Login
                                </Link>
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

                <footer className="bg-darkBackground text-white pt-12 pb-6">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {/* Column 1: Logo & Description */}
                            <div className="mb-6 md:mb-0">
                                <Link href="/" className="inline-block mb-4">
                                    <Image
                                        src="/logo-white.svg"
                                        alt={SITE_NAME}
                                        width={150}
                                        height={35}
                                    />
                                </Link>
                                <p className="text-sm opacity-80 mb-4">
                                    Shaping Your Tomorrow - Fast track your
                                    career with personalized mentorship and
                                    expert guidance.
                                </p>
                                <div className="flex space-x-4">
                                    <a
                                        href="#"
                                        className="text-white hover:text-secondary transition-colors"
                                        aria-label="LinkedIn"
                                    >
                                        <svg
                                            className="h-5 w-5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        className="text-white hover:text-secondary transition-colors"
                                        aria-label="Instagram"
                                    >
                                        <svg
                                            className="h-5 w-5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* Column 2: Quick Links */}
                            <div>
                                <h4 className="font-semibold text-lg mb-4">
                                    Quick Links
                                </h4>
                                <ul className="space-y-2">
                                    <li>
                                        <Link href="/" className="footer-link">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/about-us"
                                            className="footer-link"
                                        >
                                            About Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/mentors"
                                            className="footer-link"
                                        >
                                            Mentors
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/resources"
                                            className="footer-link"
                                        >
                                            Resources
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/contact-us"
                                            className="footer-link"
                                        >
                                            Contact Us
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Column 3: Services */}
                            <div>
                                <h4 className="font-semibold text-lg mb-4">
                                    Our Services
                                </h4>
                                <ul className="space-y-2">
                                    {SERVICES.slice(0, 5).map((service) => (
                                        <li key={service.id}>
                                            <Link
                                                href={`/services/${service.id}`}
                                                className="footer-link"
                                            >
                                                {service.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Column 4: Contact */}
                            <div>
                                <h4 className="font-semibold text-lg mb-4">
                                    Contact Us
                                </h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <svg
                                            className="h-5 w-5 mr-2 mt-0.5 text-secondary"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <a
                                            href="mailto:contact@mentoverse.com"
                                            className="hover:text-secondary transition-colors"
                                        >
                                            contact@mentoverse.com
                                        </a>
                                    </li>
                                    <li className="flex items-start">
                                        <svg
                                            className="h-5 w-5 mr-2 mt-0.5 text-secondary"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>
                                        <span>+91 9876543210</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-700">
                            <div className="flex flex-col md:flex-row justify-between items-center">
                                <p className="text-sm opacity-80 mb-4 md:mb-0">
                                    © {new Date().getFullYear()} {SITE_NAME}.
                                    All rights reserved.
                                </p>
                                <div className="flex space-x-6">
                                    <Link
                                        href="/terms"
                                        className="text-sm opacity-80 hover:opacity-100"
                                    >
                                        Terms of Use
                                    </Link>
                                    <Link
                                        href="/privacy"
                                        className="text-sm opacity-80 hover:opacity-100"
                                    >
                                        Privacy Policy
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    );
}
