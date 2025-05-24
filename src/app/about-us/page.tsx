import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
    Zap,
    Users,
    Lightbulb,
    SlidersHorizontal,
    Eye,
    Linkedin,
    CalendarClock,
    CreditCard
} from "lucide-react";
import { ABOUT_METADATA, VALUES, TEAM_MEMBERS, PARTNER_BRANDS, ABOUT_US_PAGE_CONTENT } from "@/lib/constants";
import abhijeet from "../../../public/abhijeet_mutha.webp";
import aniruddh from "../../../public/aniruddh.webp";
import aayush from "../../../public/ansh_agarwal.webp";

export const metadata: Metadata = ABOUT_METADATA;

// Map icon names to lucide components
const iconComponents = {
    Zap: <Zap className="w-8 h-8" />,
    Users: <Users className="w-8 h-8" />,
    Lightbulb: <Lightbulb className="w-8 h-8" />,
    SlidersHorizontal: <SlidersHorizontal className="w-8 h-8" />,
    Eye: <Eye className="w-8 h-8" />,
    Linkedin: <Linkedin className="w-5 h-5" />,
    CalendarClock: <CalendarClock className="w-5 h-5" />,
    CreditCard: <CreditCard className="w-5 h-5" />
};

// Map image paths to imported images
const teamMemberImages = {
    "/abhijeet_mutha.webp": abhijeet,
    "/aniruddh.webp": aniruddh,
    "/aayush.webp": aayush
};

export default function AboutUs() {
    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-primary text-white py-16 md:py-20">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl text-white md:text-5xl font-bold mb-6">{ABOUT_US_PAGE_CONTENT.hero.title}</h1>
                        <p className="text-xl opacity-90">
                            {ABOUT_US_PAGE_CONTENT.hero.subtitle}
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">{ABOUT_US_PAGE_CONTENT.story.title}</h2>
                            {ABOUT_US_PAGE_CONTENT.story.paragraphs.map((paragraph, index) => (
                                <p key={index} className="mb-4">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                        <div className="order-first md:order-last">
                            <Image
                                src="/our-story.jpeg"
                                alt="Our Story"
                                width={600}
                                height={450}
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-16 md:py-20 bg-background">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Mission */}
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                                <Zap className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">{ABOUT_US_PAGE_CONTENT.mission.title}</h2>
                            {ABOUT_US_PAGE_CONTENT.mission.paragraphs.map((paragraph, index) => (
                                <p key={index} className="mb-4">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Vision */}
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <div className="w-16 h-16 bg-secondary bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                                <Eye className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">{ABOUT_US_PAGE_CONTENT.vision.title}</h2>
                            {ABOUT_US_PAGE_CONTENT.vision.paragraphs.map((paragraph, index) => (
                                <p key={index} className="mb-4">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{ABOUT_US_PAGE_CONTENT.values.title}</h2>
                        <p className="text-lg max-w-3xl mx-auto">
                            {ABOUT_US_PAGE_CONTENT.values.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {VALUES.map((value, index) => (
                            <div key={index} className="bg-background p-6 rounded-lg">
                                <div className="text-primary mb-4">
                                    {iconComponents[value.iconName as keyof typeof iconComponents]}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                                <p>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-16">
                <div className="container">

                    <div className="text-center mb-16">
                        <h2 className="section-title font-bold">{ABOUT_US_PAGE_CONTENT.vision.title}</h2>
                        <p className="section-subtitle">
                            {ABOUT_US_PAGE_CONTENT.vision.subtitle}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                        <div>
                            <Image
                                src="/our-vision.png"
                                alt="Our Vision"
                                width={500}
                                height={400}
                                className="rounded-lg"
                            />
                        </div>
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-6">
                                {ABOUT_US_PAGE_CONTENT.bridgingGap.title}
                            </h3>
                            {ABOUT_US_PAGE_CONTENT.bridgingGap.paragraphs.map((paragraph, index) => (
                                <p key={index} className="mb-4">
                                    {paragraph}
                                </p>
                            ))}
                            <Link href="/about-us" className="btn-primary p-4 rounded-2xl">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            {/* Team Section */}
            <section className="py-16 md:py-20 bg-background">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text- 3xl md:text-4xl font-bold mb-4">{ABOUT_US_PAGE_CONTENT.team.title}</h2>
                        <p className="text-lg max-w-3xl mx-auto">{ABOUT_US_PAGE_CONTENT.team.subtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {TEAM_MEMBERS.map((member, index) => (
                            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                                <div className="h-48 w-48 relative mx-auto mt-4 rounded-full overflow-hidden border-2 border-primary">
                                    <Image
                                        src={teamMemberImages[member.imageSrc as keyof typeof teamMemberImages]}
                                        alt={member.name}
                                        fill
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                                    <p className="text-primary font-medium mb-3">{member.role}</p>
                                    <p className="text-text-secondary mb-4">{member.bio}</p>
                                    {/* Social links */}
                                    <div className="flex space-x-4 mt-3">
                                        {member.socialLinks.map((social, socialIndex) => (
                                            <a
                                                key={socialIndex}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary transition-all duration-300 text-lg hover:scale-125"
                                                aria-label={social.name}
                                            >
                                                {iconComponents[social.iconName as keyof typeof iconComponents]}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-white">
                <div className="container">
                    <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{ABOUT_US_PAGE_CONTENT.cta.title}</h2>
                        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white opacity-90">
                            {ABOUT_US_PAGE_CONTENT.cta.content}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/mentors" className="btn-secondary p-4 rounded-2xl">
                                Book a Session
                            </Link>
                            <Link
                                href="/contact-us"
                                className="btn-outline border-white text-white hover:bg-white hover:text-primary p-4 rounded-2xl"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}