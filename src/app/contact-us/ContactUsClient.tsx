"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/constants";

export default function ContactUsClient() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        success: boolean;
        message: string;
    } | null>(null);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        // Simulate API call
        try {
            // In a real implementation, you would send the form data to your API
            // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });

            // Simulating API delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setSubmitStatus({
                success: true,
                message:
                    "Thank you for contacting us! We will get back to you soon.",
            });
            setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            });
        } catch {
            setSubmitStatus({
                success: false,
                message:
                    "There was an error submitting your form. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-primary text-white py-16">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Contact Us
                        </h1>
                        <p className="text-xl opacity-90">
                            {`Have questions or need assistance? We're here to
                            help!`}
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-16 bg-white text-white">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-6">
                                Get in Touch
                            </h2>
                            <p className="mb-8 text-primary">
                                Whether you have a question about our services,
                                need help with your account, or want to explore
                                partnership opportunities, our team is ready to
                                assist you.
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-4 shrink-0">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-1">
                                            Email
                                        </h3>
                                        <a
                                            href={`mailto:${CONTACT_EMAIL}`}
                                            className="text-primary hover:underline"
                                        >
                                            {CONTACT_EMAIL}
                                        </a>
                                        <p className="text-sm text-text-secondary mt-1">
                                            {`We'll respond within 24-48 hours`}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-4 shrink-0">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-1">
                                            Phone
                                        </h3>
                                        <a
                                            href="tel:+919876543210"
                                            className="text-primary hover:underline"
                                        >
                                            +91 9876543210
                                        </a>
                                        <p className="text-sm text-text-secondary mt-1">
                                            Mon-Fri from 9am to 6pm
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-4 shrink-0">
                                        <svg
                                            className="w-5 h-5 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-1">
                                            Social Media
                                        </h3>
                                        <div className="flex space-x-4 mt-2">
                                            <a
                                                href="#"
                                                className="text-primary hover:text-primary-dark transition-colors hover:scale-125"
                                                aria-label="LinkedIn"
                                            >
                                                <svg
                                                    className="h-6 w-6"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                </svg>
                                            </a>
                                            <a
                                                href="#"
                                                className="text-primary hover:text-primary-dark transition-colors hover:scale-125"
                                                aria-label="Instagram"
                                            >
                                                <svg
                                                    className="h-6 w-6"
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
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <div className="bg-background p-8 rounded-xl shadow-lg ">
                                <h2 className="text-2xl font-bold mb-6">
                                    Send Us a Message
                                </h2>
                                {submitStatus && (
                                    <div
                                        className={`p-4 mb-6 rounded-md ${
                                            submitStatus.success
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {submitStatus.message}
                                    </div>
                                )}
                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="form-label"
                                            >
                                                Full Name*
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="form-control p-2 rounded-2xl"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="form-label"
                                            >
                                                Email Address*
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="form-control p-2 rounded-2xl"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label
                                                htmlFor="phone"
                                                className="form-label"
                                            >
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="form-control p-2 rounded-2xl"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="subject"
                                                className="form-label"
                                            >
                                                Subject*
                                            </label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="form-control p-2 rounded-2xl"
                                                required
                                            >
                                                <option value="">
                                                    Select a subject
                                                </option>
                                                <option value="General Inquiry">
                                                    General Inquiry
                                                </option>
                                                <option value="Mentorship">
                                                    Mentorship
                                                </option>
                                                <option value="Become a Mentor">
                                                    Become a Mentor
                                                </option>
                                                <option value="Technical Support">
                                                    Technical Support
                                                </option>
                                                <option value="Partnership">
                                                    Partnership
                                                </option>
                                                <option value="Other">
                                                    Other
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label
                                            htmlFor="message"
                                            className="form-label"
                                        >
                                            Message*
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={5}
                                            className="form-control p-2 rounded-2xl"
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn-primary w-1/2 p-3 rounded-2xl shadow-lg shadow-white"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center">
                                                <svg
                                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Sending...
                                            </span>
                                        ) : (
                                            "Send Message"
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-background">
                <div className="container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg max-w-3xl mx-auto">
                            Find quick answers to common questions about our
                            platform
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        {[
                            {
                                question:
                                    "How do I book a session with a mentor?",
                                answer: "To book a session, navigate to the Mentors page, select a mentor that matches your requirements, choose a service, and select an available time slot. Follow the checkout process to confirm your booking.",
                            },
                            {
                                question: "What payment methods do you accept?",
                                answer: "We accept all major credit/debit cards, UPI, and net banking options commonly used in India. All transactions are secure and processed through trusted payment gateways.",
                            },
                            {
                                question:
                                    "Can I reschedule or cancel my session?",
                                answer: "Yes, you can reschedule or cancel your session up to 24 hours before the scheduled time without any penalty. For cancellations made less than a day before, a partial refund may be applicable.",
                            },
                            {
                                question:
                                    "How do I become a mentor on Mentoverse?",
                                answer: "To become a mentor, click on the 'Become a Mentor' option and fill out the application form. Our team will review your application and get back to you within 3-5 business days.",
                            },
                            {
                                question: "Are the sessions recorded?",
                                answer: "No, we value privacy and do not record sessions by default. However, if both mentor and mentee agree, sessions can be recorded for reference purposes.",
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
        </>
    );
}
