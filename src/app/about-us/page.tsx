import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
    title: `About Us | ${SITE_NAME} - Shaping Your Tomorrow`,
    description:
        "Learn about Mentoverse's mission, vision, and the team behind our mentorship platform.",
};

export default function AboutUs() {
    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-primary text-white py-16 md:py-20">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            About Us
                        </h1>
                        <p className="text-xl opacity-90">
                            Learn about Mentoverse&apos;s mission, vision, and
                            the team behind our mentorship platform.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Our Story
                            </h2>
                            <p className="mb-4">
                                {`Mentoverse was born out of a simple observation:
                                there's a significant gap between academic
                                education and real-world industry requirements.
                                This gap often leaves students and early-career
                                professionals struggling to navigate their
                                career paths effectively.`}
                            </p>
                            <p className="mb-4">
                                {`Founded by Abhijeet, Aniruddh, and Shreyash,
                                Mentoverse started with a focus on providing
                                mentorship in finance and CA domains, areas
                                where personalized guidance can make a
                                substantial difference.`}
                            </p>
                            <p>
                                {`Today, we've expanded our vision to include
                                various industries while maintaining our core
                                expertise in finance, CA, and startup advisory.
                                Our goal is to be with you throughout your
                                educational and professional journey, providing
                                the guidance you need when you need it most.`}
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
                                <svg
                                    className="w-8 h-8 text-primary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                Our Mission
                            </h2>
                            <p className="mb-4">
                                {`To democratize access to quality mentorship and
                                career guidance, enabling students and
                                professionals to make informed decisions about
                                their careers and achieve their full potential.`}
                            </p>
                            <p>
                                {`We strive to bridge the gap between education
                                and industry by connecting mentees with
                                experienced professionals who can provide
                                real-world insights and guidance.`}
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <div className="w-16 h-16 bg-secondary bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                                <svg
                                    className="w-8 h-8 text-secondary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                Our Vision
                            </h2>
                            <p className="mb-4">
                                {`To create a world where every individual has
                                access to the mentorship they need to navigate
                                their career journey successfully. We envision
                                Mentoverse as the go-to platform for career
                                guidance across various industries.`}
                            </p>
                            <p>
                                {`Our focus on niche areas like CA, finance, and
                                startup advisory sets us apart, providing
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Our Values
                        </h2>
                        <p className="text-lg max-w-3xl mx-auto">
                            The principles that guide our approach to mentorship
                            and career guidance
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: (
                                    <svg
                                        className="w-8 h-8"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        />
                                    </svg>
                                ),
                                title: "Trust & Integrity",
                                description:
                                    "We build relationships based on trust and maintain the highest standards of integrity in all our interactions.",
                            },
                            {
                                icon: (
                                    <svg
                                        className="w-8 h-8"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                ),
                                title: "Community",
                                description:
                                    "We foster a supportive community where mentors and mentees can connect, learn, and grow together.",
                            },
                            {
                                icon: (
                                    <svg
                                        className="w-8 h-8"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                        />
                                    </svg>
                                ),
                                title: "Innovation",
                                description:
                                    "We continuously seek innovative ways to improve our platform and provide better mentorship experiences.",
                            },
                            {
                                icon: (
                                    <svg
                                        className="w-8 h-8"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                                        />
                                    </svg>
                                ),
                                title: "Personalization",
                                description:
                                    "We believe in tailored guidance that addresses the unique needs and goals of each individual.",
                            },
                        ].map((value, index) => (
                            <div
                                key={index}
                                className="bg-background p-6 rounded-lg"
                            >
                                <div className="text-primary mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    {value.title}
                                </h3>
                                <p>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 md:py-20 bg-background">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Meet Our Team
                        </h2>
                        <p className="text-lg max-w-3xl mx-auto">
                            The passionate individuals behind Mentoverse
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Abhijeet",
                                role: "Co-Founder",
                                image: "/images/team/abhijeet.jpg",
                                bio: "With extensive experience in finance and CA, Abhijeet leads our content strategy for finance and accounting mentorship.",
                            },
                            {
                                name: "Aniruddh",
                                role: "Co-Founder",
                                image: "/images/team/aniruddh.jpg",
                                bio: "Aniruddh brings his tech expertise to Mentoverse, ensuring our platform provides a seamless experience for mentors and mentees.",
                            },
                            {
                                name: "Shreyash",
                                role: "Co-Founder",
                                image: "/images/team/shreyash.jpg",
                                bio: "Shreyash's background in marketing helps us reach and connect with students and professionals who can benefit from our platform.",
                            },
                        ].map((member, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg overflow-hidden shadow-md"
                            >
                                <div className="h-64 relative">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-primary font-medium mb-3">
                                        {member.role}
                                    </p>
                                    <p className="text-text-secondary">
                                        {member.bio}
                                    </p>
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                            Join Our Journey
                        </h2>
                        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white opacity-90">
                            {`Whether you're looking for guidance or want to
                            become a mentor, we'd love to have you be a part of
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
