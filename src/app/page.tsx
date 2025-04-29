import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";

export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-primary text-white relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <Image
                        src="/images/hero-bg-pattern.svg"
                        alt="Background Pattern"
                        fill
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <div className="container relative z-10 py-20 md:py-28">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="animate-fade-in">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
                                Fast Track your Career with Mentoverse
                            </h1>
                            <h2 className="text-xl md:text-2xl mb-8 font-medium text-white opacity-90">
                                Shaping Your Tomorrow
                            </h2>
                            <p className="text-lg mb-8 max-w-md text-white opacity-80">
                                Get personalized guidance from industry experts
                                who have been there and done that. Connect with
                                mentors who genuinely care about your success.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/services"
                                    className="btn-secondary p-4 rounded-2xl  shadow-lg shadow-white"
                                >
                                    Explore Now
                                </Link>
                                <Link
                                    href="/mentors"
                                    className="btn-outline border-white text-white hover:bg-white hover:text-primary p-4 rounded-2xl  shadow-lg shadow-white"
                                >
                                    Meet Our Mentors
                                </Link>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <Image
                                src="/images/hero-illustration.svg"
                                alt="Mentorship Illustration"
                                width={600}
                                height={500}
                                className="animate-fade-in"
                            />
                        </div>
                    </div>
                </div>
            </section>



            {/* Our Offerings Section */}
            <section className="section-padding bg-background">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="section-title">Our Offerings</h2>
                        <p className="section-subtitle">
                            Comprehensive services designed to accelerate your
                            professional growth
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {SERVICES.map((service) => (
                            <div key={service.id} className="card group">
                                <div className="p-6">
                                    <div className="w-14 h-14 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mb-5 text-2xl text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">
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
                                    <Link
                                        href={`/services/${service.id}`}
                                        className="text-primary font-medium inline-flex items-center group-hover:underline"
                                    >
                                        Learn More
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
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Showcase Section */}
            <section className="py-16 bg-gradient-primary text-white mt-4">
                <div className="container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                            We are good with numbers
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { number: "5+", label: "Events" },
                            { number: "20+", label: "Mentors" },
                            { number: "3,000+", label: "Community" },
                            { number: "50,000+", label: "Reach" },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 text-center"
                            >
                                <div className="text-4xl md:text-5xl font-bold mb-2 text-black">
                                    {stat.number}
                                </div>
                                <div className="text-lg  opacity-80 text-black">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section-padding bg-white">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="section-title">What Our Mentees Say</h2>
                        <p className="section-subtitle">
                            Hear from those who have accelerated their careers
                            with Mentoverse
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Rahul Singh",
                                role: "CA Student",
                                image: "/images/testimonials/person1.jpg",
                                text: "The one-on-one sessions with my mentor helped me clear my CA finals. The guidance was practical and exactly what I needed.",
                            },
                            {
                                name: "Priya Sharma",
                                role: "Finance Professional",
                                image: "/images/testimonials/person2.jpg",
                                text: "My LinkedIn profile review session was eye-opening. I'm getting 3x more profile views and better connection requests now.",
                            },
                            {
                                name: "Amit Patel",
                                role: "Startup Founder",
                                image: "/images/testimonials/person3.jpg",
                                text: "The financial compliance guidance I received helped me navigate the complex regulatory landscape for my startup.",
                            },
                        ].map((testimonial, index) => (
                            <div key={index} className="card p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                                        <Image
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            width={48}
                                            height={48}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-sm text-text-secondary">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                                <p className="italic text-text-secondary">
                                    {testimonial.text}
                                </p>
                                <div className="mt-4 flex text-secondary">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-background">
                <div className="container">
                    <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                            Ready to Fast Track Your Career?
                        </h2>
                        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white opacity-90">
                            Connect with industry experts, get personalized
                            guidance, and take your career to new heights.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/mentors" className="btn-secondary p-4 rounded-2xl shadow-lg shadow-white">
                                Book a Session
                            </Link>
                            <Link
                                href="/mentors"
                                className="btn-outline border-white text-white hover:bg-white hover:text-primary p-4 rounded-2xl shadow-lg shadow-white"
                            >
                                Explore Mentors
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
