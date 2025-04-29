import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import abhijeet from "../../../public/abhijeet_mutha.webp";
import aniruddh from "../../../public/aniruddh.webp";
import aayush from "../../../public/ansh_agarwal.webp";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { BsLightningCharge, BsEyeFill, BsPeopleFill, BsLightbulbFill, BsSliders } from "react-icons/bs";
import { SiRazorpay } from "react-icons/si";

export const metadata: Metadata = {
    title: `About Us | ${SITE_NAME} - Shaping Your Tomorrow`,
    description: "Learn about Mentoverse's mission, vision, and the team behind our mentorship platform.",
};

const VALUES = [
    {
        icon: <BsLightningCharge className="w-8 h-8" />,
        title: "Trust & Integrity",
        description: "We build relationships based on trust and maintain the highest standards of integrity in all our interactions.",
    },
    {
        icon: <BsPeopleFill className="w-8 h-8" />,
        title: "Community",
        description: "We foster a supportive community where mentors and mentees can connect, learn, and grow together.",
    },
    {
        icon: <BsLightbulbFill className="w-8 h-8" />,
        title: "Innovation",
        description: "We continuously seek innovative ways to improve our platform and provide better mentorship experiences.",
    },
    {
        icon: <BsSliders className="w-8 h-8" />,
        title: "Personalization",
        description: "We believe in tailored guidance that addresses the unique needs and goals of each individual.",
    },
];

// Team members data
const TEAM_MEMBERS = [
    {
        name: "Abhijeet Mutha",
        role: "Co-Founder",
        image: abhijeet,
        bio: "Investment Banker | Co - Founder | CA (AIR 21, AIR 14) | Ex- J.P. Morgan | KPMG | National Athlete | All views are personal",
        socialLinks: [
            {
                name: "LinkedIn",
                href: "https://www.linkedin.com/in/abhijeet-mutha",
                icon: <FaLinkedin />,
            },
            {
                name: "Calendly",
                href: "https://calendly.com/anirudhramesh/30min",
                icon: <FaCalendarAlt />,
            },
            {
                name: "Razorpay",
                href: "https://pages.razorpay.com/pl_IvDppElicuMMnF/view",
                icon: <SiRazorpay />,
            },
        ],
    },
    {
        name: "Anirudh Ramesh",
        role: "Co-Founder",
        image: aniruddh,
        bio: "Bain & Company | Jobtech Alliance | Co-founder: Mentoverse, Mudiyum Foundation",
        socialLinks: [
            {
                name: "LinkedIn",
                href: "https://www.linkedin.com/in/anirudhramesh17/",
                icon: <FaLinkedin />,
            },
            {
                name: "Calendly",
                href: "https://calendly.com/anirudhramesh/30min",
                icon: <FaCalendarAlt />,
            },
            {
                name: "Razorpay",
                href: "https://pages.razorpay.com/pl_IvDppElicuMMnF/view",
                icon: <SiRazorpay />,
            },
        ],
    },
    {
        name: "Aayush Agarwal",
        role: "Co-Founder",
        image: aayush,
        bio: "Senior Associate (Investments) at Temasek | CA (AIR 8, 2) | CFA (All levels) | B.Com Gold Medalist - St. Xavier's College",
        socialLinks: [
            {
                name: "LinkedIn",
                href: "https://www.linkedin.com/in/aayush-agarwal-ca/",
                icon: <FaLinkedin />,
            },
            {
                name: "Calendly",
                href: "https://calendly.com/anirudhramesh/30min",
                icon: <FaCalendarAlt />,
            },
        ],
    },
];

export default function AboutUs() {
    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-primary text-white py-16 md:py-20">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
                        <p className="text-xl opacity-90">
                            Learn about Mentoverse&apos;s mission, vision, and the team behind our mentorship platform.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
                            <p className="mb-4">
                                {`Mentoverse was born out of a simple observation: there's a significant gap between academic
                                education and real-world industry requirements. This gap often leaves students and early-career
                                professionals struggling to navigate their career paths effectively.`}
                            </p>
                            <p className="mb-4">
                                {`Founded by Abhijeet, Aniruddh, and Ansh, Mentoverse started with a focus on providing
                                mentorship in finance and CA domains, areas where personalized guidance can make a
                                substantial difference.`}
                            </p>
                            <p>
                                {`Today, we've expanded our vision to include various industries while maintaining our core
                                expertise in finance, CA, and startup advisory. Our goal is to be with you throughout your
                                educational and professional journey, providing the guidance you need when you need it most.`}
                            </p>
                        </div>
                        <div className="order-first md:order-last">
                            <Image
                                src="/images/about/our-story.jpg"
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
                                <BsLightningCharge className="w-8 h-8 text-primary" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
                            <p className="mb-4">
                                {`To democratize access to quality mentorship and career guidance, enabling students and
                                professionals to make informed decisions about their careers and achieve their full potential.`}
                            </p>
                            <p>
                                {`We strive to bridge the gap between education and industry by connecting mentees with
                                experienced professionals who can provide real-world insights and guidance.`}
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <div className="w-16 h-16 bg-secondary bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                                <BsEyeFill className="w-8 h-8 text-secondary" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Vision</h2>
                            <p className="mb-4">
                                {`To create a world where every individual has access to the mentorship they need to navigate
                                their career journey successfully. We envision Mentoverse as the go-to platform for career
                                guidance across various industries.`}
                            </p>
                            <p>
                                {`Our focus on niche areas like CA, finance, and startup advisory sets us apart, providing
                                specialized guidance where it's most needed.`}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
                        <p className="text-lg max-w-3xl mx-auto">
                            The principles that guide our approach to mentorship and career guidance
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {VALUES.map((value, index) => (
                            <div key={index} className="bg-background p-6 rounded-lg">
                                <div className="text-primary mb-4">{value.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                                <p>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Our Vision Section */}
            <section className="py-16 bg-white">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="section-title">Our Vision</h2>
                        <p className="section-subtitle">
                            With you, throughout your educational and
                            professional life
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-16">
                        {/* Partner Logos */}
                        {[
                            "Mahindra",
                            "KPMG",
                            "Aditya Birla Group",
                            "Kotak",
                            "JP Morgan",
                        ].map((partner) => (
                            <div
                                key={partner}
                                className="grayscale hover:grayscale-0 transition-all duration-300"
                            >
                                <Image
                                    src={`/images/partners/${partner
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}.svg`}
                                    alt={`${partner} logo`}
                                    width={120}
                                    height={60}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <Image
                                src="/images/vision-illustration.svg"
                                alt="Our Vision"
                                width={500}
                                height={400}
                                className="rounded-lg"
                            />
                        </div>
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-6">
                                Bridging the Gap Between Education and Industry
                            </h3>
                            <p className="mb-4">
                                At Mentoverse, we believe that every student and
                                professional deserves access to quality
                                mentorship. Our platform connects you with
                                industry experts who have walked the path you
                                aspire to take.
                            </p>
                            <p className="mb-6">
                                Whether you&apos;re a CA student, a finance
                                professional, or a startup founder, we have
                                mentors who can provide you with personalized
                                guidance tailored to your specific needs.
                            </p>
                            <Link href="/about-us" className="btn-primary p-4 rounded-2xl shadow-lg shadow-white">
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
                        <p className="text-lg max-w-3xl mx-auto">The passionate individuals behind Mentoverse</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {TEAM_MEMBERS.map((member, index) => (
                            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                                <div className="h-64 relative">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        style={{ objectFit: "contain" }}
                                        className="pt-2"
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
                                                <span className="h-5 w-5 inline-block">{social.icon}</span>
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Join Our Journey</h2>
                        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white opacity-90">
                            {`Whether you're looking for guidance or want to become a mentor, we'd love to have you be a part of
                            Mentoverse.`}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/booking" className="btn-secondary p-4 rounded-2xl shadow-lg shadow-white">
                                Book a Session
                            </Link>
                            <Link
                                href="/contact-us"
                                className="btn-outline border-white text-white hover:bg-white hover:text-primary p-4 rounded-2xl shadow-lg shadow-white"
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