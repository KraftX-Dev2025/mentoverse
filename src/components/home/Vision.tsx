import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

// Vision Page Added
const Vision = () => {
    // Animation variants for staggered animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Our Vision
                    </h2>
                    <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                        With you, throughout your educational and professional
                        life
                    </p>
                </motion.div>

                {/* Partner Logos */}
                <motion.div
                    className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-20"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {[
                        "Mahindra",
                        "KPMG",
                        "Aditya Birla Group",
                        "Kotak",
                        "JP Morgan",
                    ].map((partner) => (
                        <motion.div
                            key={partner}
                            variants={itemVariants}
                            className="grayscale hover:grayscale-0 transition-all duration-500 transform hover:scale-110"
                        >
                            <Image
                                src="/placeholder.webp"
                                alt={`${partner} logo`}
                                width={120}
                                height={60}
                                className="h-12 w-auto object-contain"
                            />
                        </motion.div>
                    ))}
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-primary/5 rounded-2xl"></div>
                        <Image
                            src="/placeholder.webp"
                            alt="Our Vision"
                            width={500}
                            height={400}
                            className="rounded-xl shadow-lg relative z-10"
                        />

                        {/* Decorative element */}
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-secondary/10 rounded-full z-0"></div>
                        <div className="absolute -top-6 -left-6 w-16 h-16 bg-primary/10 rounded-full z-0"></div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-2xl md:text-3xl font-bold mb-6">
                            Bridging the Gap Between Education and Industry
                        </h3>
                        <p className="mb-4 text-text-secondary">
                            At Mentoverse, we believe that every student and
                            professional deserves access to quality mentorship.
                            Our platform connects you with industry experts who
                            have walked the path you aspire to take.
                        </p>
                        <p className="mb-6 text-text-secondary">
                            Whether you&apos;re a CA student, a finance
                            professional, or a startup founder, we have mentors
                            who can provide you with personalized guidance
                            tailored to your specific needs.
                        </p>
                        <Link href="/about-us">
                            <Button
                                variant="primary"
                                size="md"
                                className="shadow-lg shadow-primary/20"
                            >
                                Learn More About Us
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Vision;
