import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

// Cta Page Added
const Cta = () => {
    return (
        <section className="py-20 bg-background">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white text-center shadow-xl"
                >
                    {/* Background Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-1/3 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary opacity-10 rounded-full translate-y-1/3 -translate-x-1/3"></div>

                    <motion.h2
                        className="text-3xl md:text-4xl font-bold mb-4 text-white relative z-10"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Ready to Fast Track Your Career?
                    </motion.h2>

                    <motion.p
                        className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white opacity-90 relative z-10"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        Connect with industry experts, get personalized
                        guidance, and take your career to new heights.
                    </motion.p>

                    <motion.div
                        className="flex flex-wrap justify-center gap-4 relative z-10"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <Link href="/booking">
                            <Button
                                variant="secondary"
                                size="lg"
                                className="shadow-lg shadow-secondary/20 px-6 py-4"
                            >
                                Book a Session
                            </Button>
                        </Link>

                        <Link href="/mentors">
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-white text-white hover:bg-white hover:text-primary shadow-lg shadow-white/10 px-6 py-4"
                            >
                                Explore Mentors
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Cta;
