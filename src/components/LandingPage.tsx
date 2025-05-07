import Image from "next/image";
import Link from "next/link";
import { AVATAR_COLORS, SERVICES, stats, testimonials } from "@/lib/constants";
import { ChevronRight, Star } from 'lucide-react';

export default function Home() {
    const avatarColors = AVATAR_COLORS;

    const getColorClass = (name: string) => {
        const hash = Array.from(name).reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return avatarColors[hash % avatarColors.length];
    };

    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-primary text-white relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-30">
                    <Image
                        src="/hero-bg-pattern.png"
                        alt="Background Pattern"
                        fill
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <div className="container relative z-10 py-10 md:py-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="animate-fade-in">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
                                Revolutionizing the awareness of people towards their next step in education, career and beyond.
                            </h1>
                            {/* <h2 className="text-xl md:text-2xl mb-8 font-medium text-white opacity-90">
                                Revolutionizing the awareness of people towards
                                their next step in education, career and beyond.
                            </h2> */}
                            <p className="text-lg mb-8 max-w-md text-white opacity-80">
                                Get personalized guidance from industry experts
                                who have been there and done that. Connect with
                                mentors who genuinely care about your success.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/services"
                                    className="btn-secondary px-2 py-2 rounded-xl  border-2 flex justify-center items-center"
                                >
                                    Explore Now
                                </Link>
                                <Link
                                    href="/mentors"
                                    className="btn-outline border-white text-white hover:bg-white hover:text-primary px-2 py-2 rounded-xl border-2 flex justify-center items-center"
                                >
                                    Meet Our Mentors
                                </Link>
                            </div>
                        </div>
                        <div className="hidden md:block ml-12">
                            <Image
                                src="/hero-section.png"
                                alt="Mentorship Illustration"
                                width={700}
                                height={600}
                                className="animate-fade-in"
                            />
                        </div>
                    </div>
                </div>
            </section>



            {/* Our Offerings Section */}
            <section className="section-padding bg-background py-[4rem]">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="section-title font-bold">Our Offerings</h2>
                        <p className="section-subtitle">
                            Comprehensive services designed to accelerate your
                            professional growth
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {SERVICES.map((service) => (
                            <div key={service.id} className="card group rounded-xl hover:scale-110">
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
                                        // href={`/services/${service.id}`}
                                        href={`/services#${service.id}-section`}
                                        className="text-primary font-medium inline-flex items-center group-hover:underline"
                                    >
                                        Learn More
                                        <ChevronRight className="h-4 w-4 ml-1" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Showcase Section */}

            <section className="py-16 bg-gradient-primary text-white mt-4 rounded-xl">
                <div className="container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                            We are good with numbers
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-primary">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 text-center hover:scale-110"
                            >
                                <div className="text-4xl md:text-5xl font-bold mb-2 text-primary">
                                    {stat.number}
                                </div>
                                <div className="text-lg  opacity-80 text-primary">

                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section-padding bg-white py-[4rem]">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="section-title font-bold">What Our Mentees Say</h2>
                        <p className="section-subtitle">
                            Hear from those who have accelerated their careers
                            with Mentoverse
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {testimonials.map((testimonial, index) => {
                            const colorClass = getColorClass(testimonial.name);
                            return (
                                <div key={index} className="card p-6 rounded-2xl bg-gray-50 hover:scale-110">
                                    <div className="flex items-center mb-4">
                                        <div
                                            className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-semibold mr-4 ${colorClass}`}
                                        >
                                            {testimonial.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">{testimonial.name}</h4>
                                            <p className="text-sm text-text-secondary">{testimonial.role}</p>
                                        </div>
                                    </div>
                                    <p className="italic text-text-secondary">{testimonial.text}</p>
                                    <div className="mt-4 flex text-secondary">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 fill-current" />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}

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

                            <Link href="https://pages.razorpay.com/pl_IvDppElicuMMnF/view" className="btn-secondary px-2 py-2 rounded-xl ">

                                Book a Session
                            </Link>
                            <Link
                                href="/mentors"
                                className="btn-outline border-white text-white hover:bg-white hover:text-primary px-2 py-2 rounded-xl "
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