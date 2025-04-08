import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { SITE_NAME, SITE_DESCRIPTION, SERVICES } from "@/lib/constants";
import Footer from "@/components/footer";
import Header from "@/components/Header";
import "./globals.css";
import logo from "../../public/logo_nobg.png";
// import logonobg from "../../public/logo_noBG.jpg";
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
                <Header logo={logo} />
                <main className="flex-grow">{children}</main>
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