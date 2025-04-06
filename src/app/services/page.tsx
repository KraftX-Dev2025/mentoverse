import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { SITE_NAME, SERVICES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
    title: `Our Services | ${SITE_NAME} - Shaping Your Tomorrow`,
    description:
        "Explore our range of services including mock interviews, profile reviews, and career guidance.",
};

export default function ServicesPage() {
    // Enhanced services with additional details
    const servicesWithDetails = [
        {
            id: "mock-interview",
            name: "1 on 1 Personal Mock Interview",
            icon: "🎯",
            description:
                "Practice with industry experts and get real-time feedback on your interviewing skills.",
            price: 1500,
            benefits: [
                "Practice with experienced interviewers from your target industry",
                "Get honest, constructive feedback on your performance",
                "Learn industry-specific interview techniques",
                "Identify and improve your weak areas",
                "Boost your confidence for real interviews",
            ],
            howItWorks: [
                "Book a session with your preferred mentor",
                "Share your target role and company details beforehand",
                "Participate in a realistic interview simulation",
                "Receive immediate feedback and actionable tips",
                "Get a detailed performance report within 24 hours",
            ],
            imageUrl: "/images/services/mock-interview.jpg",
        },
        {
            id: "linkedin-review",
            name: "LinkedIn Profile Review",
            icon: "👔",
            description:
                "Get your LinkedIn profile optimized by professionals to attract better opportunities.",
            price: 1200,
            benefits: [
                "Stand out to recruiters with an optimized profile",
                "Learn LinkedIn algorithm optimization techniques",
                "Get feedback on your headline, summary, and experience descriptions",
                "Improve your profile's searchability",
                "Receive suggestions for better profile content and structure",
            ],
            howItWorks: [
                "Share your LinkedIn profile URL",
                "Complete a brief questionnaire about your career goals",
                "Our expert reviews your profile in detail",
                "Receive a comprehensive report with specific improvement suggestions",
                "Get a 30-minute call to discuss the recommendations",
            ],
            imageUrl: "/images/services/linkedin-review.jpg",
        },
        {
            id: "cv-resume-review",
            name: "CV Resume Review",
            icon: "📄",
            description:
                "Professional review of your CV/resume to stand out among other candidates.",
            price: 1200,
            benefits: [
                "Get a professional assessment of your resume's effectiveness",
                "Learn how to highlight your achievements and skills",
                "Receive industry-specific formatting recommendations",
                "Make your resume ATS-friendly",
                "Increase your interview callback rate",
            ],
            howItWorks: [
                "Upload your current resume",
                "Complete a brief questionnaire about your career goals",
                "Our expert reviews your resume in detail",
                "Receive a comprehensive feedback report",
                "Get a revised version with tracked changes and suggestions",
            ],
            imageUrl: "/images/services/cv-review.jpg",
        },
        {
            id: "group-discussion",
            name: "Group Discussion",
            icon: "👥",
            description:
                "Learn the art of group discussions with like-minded peers and expert guidance.",
            price: 800,
            benefits: [
                "Practice in a realistic group discussion environment",
                "Learn effective communication and persuasion techniques",
                "Develop leadership skills and presence in group settings",
                "Get feedback on your participation and contribution",
                "Network with peers from similar career paths",
            ],
            howItWorks: [
                "Register for an upcoming group discussion session",
                "Receive pre-session materials and preparation guidelines",
                "Participate in a moderated 60-minute group discussion",
                "Get real-time feedback from the moderator",
                "Receive a personalized feedback report post-session",
            ],
            imageUrl: "/images/services/group-discussion.jpg",
        },
        {
            id: "career-guidance",
            name: "1 on 1 Career Guidance",
            icon: "🧭",
            description:
                "Personalized career planning and guidance from industry professionals.",
            price: 1800,
            benefits: [
                "Get clarity on your career path and options",
                "Develop a personalized career roadmap",
                "Learn about industry trends and opportunities",
                "Identify skill gaps and development areas",
                "Make informed decisions about your professional future",
            ],
            howItWorks: [
                "Complete a comprehensive career assessment questionnaire",
                "Book a 60-minute session with a career specialist",
                "Discuss your goals, strengths, and concerns in detail",
                "Receive a personalized career development plan",
                "Get a follow-up session after 3 months to track progress",
            ],
            imageUrl: "/images/services/career-guidance.jpg",
        },
        {
            id: "events-webinars",
            name: "Events & Webinars",
            icon: "🎤",
            description:
                "Stay updated with the latest industry trends through our events and webinars.",
            price: 500,
            benefits: [
                "Learn from industry leaders and experts",
                "Stay updated with the latest trends and developments",
                "Network with professionals from your field",
                "Get answers to your specific questions",
                "Access recordings for future reference",
            ],
            howItWorks: [
                "Browse our upcoming events calendar",
                "Register for events that interest you",
                "Receive pre-event materials and preparation guidelines",
                "Participate in the live session with Q&A opportunities",
                "Get access to event recordings and additional resources",
            ],
            imageUrl: "/images/services/events-webinars.jpg",
        },
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-primary text-white py-16">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Our Services
                        </h1>
                        <p className="text-xl opacity-90">
                            Comprehensive solutions to help you advance your
                            career and achieve your professional goals
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Overview */}
            <section className="py-16 bg-white">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {SERVICES.map((service) => (
                            <Link
                                key={service.id}
                                href={`/services/${service.id}`}
                                className="group"
                            >
                                <div className="bg-background rounded-lg p-8 h-full transition-all duration-300 hover:shadow-md hover:bg-primary hover:bg-opacity-5">
                                    <div className="w-14 h-14 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mb-5 text-2xl text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        {service.name}
                                    </h3>
                                    <p className="text-text-secondary mb-4">
                                        {service.id === "mock-interview"
                                            ? "Practice with industry experts and get real-time feedback to improve your interview skills."
                                            : service.id === "linkedin-review"
                                            ? "Get your LinkedIn profile optimized by professionals to attract better opportunities."
                                            : service.id === "cv-resume-review"
                                            ? "Professional review of your CV/resume to stand out among other candidates."
                                            : service.id === "group-discussion"
                                            ? "Learn the art of group discussions with like-minded peers and expert guidance."
                                            : service.id === "career-guidance"
                                            ? "Personalized career planning and guidance from industry professionals."
                                            : "Stay updated with the latest industry trends through our events and webinars."}
                                    </p>
                                    <span className="text-primary font-medium inline-flex items-center">
                                        Learn More
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 ml-1 group-hover:ml-2 transition-all duration-300"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Service */}
            <section className="py-16 bg-background">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-primary font-semibold mb-2 inline-block">
                                FEATURED SERVICE
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                1 on 1 Career Guidance
                            </h2>
                            <p className="text-lg mb-6">
                                Get personalized career advice from industry
                                experts who have navigated the path you&apos;re
                                on. Our career guidance sessions are tailored to
                                your specific needs and goals.
                            </p>
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-3">
                                    What you&apos;ll get:
                                </h3>
                                <ul className="space-y-2">
                                    {servicesWithDetails
                                        .find((s) => s.id === "career-guidance")
                                        ?.benefits.map((benefit, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start"
                                            >
                                                <svg
                                                    className="w-5 h-5 text-primary mt-1 mr-2 shrink-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <span>{benefit}</span>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                            <div className="flex items-center mb-6">
                                <div className="text-2xl font-bold mr-2">
                                    {formatCurrency(
                                        servicesWithDetails.find(
                                            (s) => s.id === "career-guidance"
                                        )?.price || 0
                                    )}
                                </div>
                                <div className="text-text-secondary">
                                    per session
                                </div>
                            </div>
                            <Link
                                href="/booking?service=career-guidance"
                                className="btn-primary"
                            >
                                Book a Session
                            </Link>
                        </div>
                        <div className="hidden lg:block">
                            <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-lg">
                                <Image
                                    src="/images/services/career-guidance-detail.jpg"
                                    alt="Career Guidance"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Services */}
            <section className="py-16 bg-white">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="section-title">
                            All Our Services in Detail
                        </h2>
                        <p className="section-subtitle">
                            Explore our comprehensive range of services designed
                            to help you excel in your career
                        </p>
                    </div>

                    {servicesWithDetails.map((service, index) => (
                        <div key={service.id} className="mb-16">
                            <div
                                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                                    index % 2 === 1
                                        ? "lg:grid-flow-row-dense"
                                        : ""
                                }`}
                            >
                                <div
                                    className={
                                        index % 2 === 1 ? "lg:col-start-2" : ""
                                    }
                                >
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-3 text-xl text-primary">
                                            {service.icon}
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold">
                                            {service.name}
                                        </h2>
                                    </div>
                                    <p className="text-lg mb-6">
                                        {service.description}
                                    </p>

                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold mb-3">
                                            Benefits
                                        </h3>
                                        <ul className="space-y-2">
                                            {service.benefits.map(
                                                (benefit, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="flex items-start"
                                                    >
                                                        <svg
                                                            className="w-5 h-5 text-primary mt-1 mr-2 shrink-0"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                        <span>{benefit}</span>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold mb-3">
                                            How It Works
                                        </h3>
                                        <ol className="space-y-2">
                                            {service.howItWorks.map(
                                                (step, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="flex items-start"
                                                    >
                                                        <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center mr-3 text-sm shrink-0">
                                                            {idx + 1}
                                                        </div>
                                                        <span>{step}</span>
                                                    </li>
                                                )
                                            )}
                                        </ol>
                                    </div>

                                    <div className="flex items-center mb-6">
                                        <div className="text-2xl font-bold mr-2">
                                            {formatCurrency(service.price)}
                                        </div>
                                        <div className="text-text-secondary">
                                            per session
                                        </div>
                                    </div>

                                    <Link
                                        href={`/booking?service=${service.id}`}
                                        className="btn-primary"
                                    >
                                        Book Now
                                    </Link>
                                </div>
                                <div
                                    className={
                                        index % 2 === 1 ? "lg:col-start-1" : ""
                                    }
                                >
                                    <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
                                        <Image
                                            src={service.imageUrl}
                                            alt={service.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            {index < servicesWithDetails.length - 1 && (
                                <div className="my-16 border-b border-gray-200"></div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQs */}
            <section className="py-16 bg-background">
                <div className="container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg max-w-3xl mx-auto">
                            Find answers to common questions about our services
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        {[
                            {
                                question:
                                    "How do I choose the right mentor for my session?",
                                answer: "You can browse our mentors page to view detailed profiles of our mentors including their expertise, experience, and ratings. Choose a mentor whose background aligns with your career goals. You can also filter mentors by industry, expertise, or rating to find the perfect match.",
                            },
                            {
                                question:
                                    "What happens if I need to reschedule my booked session?",
                                answer: "You can reschedule your session up to 24 hours before the scheduled time without any penalty. Simply go to your dashboard, find the booking, and click the reschedule option to select a new time slot that works for you.",
                            },
                            {
                                question:
                                    "How long does each session typically last?",
                                answer: "Most of our one-on-one sessions last for 60 minutes. Group discussions may run for 90 minutes. The duration is specified on the booking page for each service. If you need more time, you can book extended sessions where available.",
                            },
                            {
                                question:
                                    "Is there any preparation required before my session?",
                                answer: "Yes, for most services, you'll receive preparation guidelines after booking. For mock interviews, you'll need to share your target role and company. For resume or LinkedIn reviews, you'll need to share your current resume or profile. Our team will guide you on the specific preparations needed.",
                            },
                            {
                                question:
                                    "Can I get a refund if I'm not satisfied with the service?",
                                answer: "We strive for 100% satisfaction. If you're not happy with the service you received, please contact us within 48 hours of your session, and our team will work with you to resolve your concerns. Refunds are handled on a case-by-case basis according to our refund policy.",
                            },
                        ].map((faq, index) => (
                            <div
                                key={index}
                                className="mb-4 bg-white rounded-lg shadow-sm overflow-hidden"
                            >
                                <details className="group">
                                    <summary className="flex items-center justify-between cursor-pointer p-5">
                                        <h3 className="text-lg font-medium">
                                            {faq.question}
                                        </h3>
                                        <svg
                                            className="w-5 h-5 text-primary group-open:rotate-180 transition-transform"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </summary>
                                    <div className="p-5 pt-0 text-text-secondary">
                                        {faq.answer}
                                    </div>
                                </details>
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
                            Ready to Take the Next Step?
                        </h2>
                        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white opacity-90">
                            Invest in your career growth today with expert
                            guidance from our mentors.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/booking" className="btn-secondary">
                                Book a Session
                            </Link>
                            <Link
                                href="/mentors"
                                className="btn-outline border-white text-white hover:bg-white hover:text-primary"
                            >
                                Browse Mentors
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
