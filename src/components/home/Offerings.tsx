import Link from "next/link";
import { motion } from "framer-motion";
import { SERVICES } from "@/lib/constants";

// Offerings Page Added
const Offerings = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
            },
        },
    };

    return (
        <section className="py-20 md:py-28 bg-background">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Our Offerings
                    </h2>
                    <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                        Comprehensive services designed to accelerate your
                        professional growth
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {SERVICES.map((service) => (
                        <motion.div
                            key={service.id}
                            variants={cardVariants}
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.3 },
                            }}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden group transition-all duration-300"
                        >
                            <div className="p-6">
                                <div className="w-14 h-14 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mb-5 text-2xl text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
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
                                    <span className="relative">
                                        Learn More
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                                    </span>
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
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Offerings;
