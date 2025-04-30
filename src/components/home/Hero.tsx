import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button} from "@/components/ui/Button";

// Hero Page Added
const Hero = () => {
    return (
        <section className="bg-gradient-primary text-white relative overflow-hidden py-24 md:py-32">
            {/* Background pattern */}
            <div className="absolute inset-0 z-0 opacity-20">
                <Image
                    src="/placeholder.webp"
                    alt="Background Pattern"
                    fill
                    style={{ objectFit: "cover" }}
                    className="opacity-30"
                />
            </div>

            <div className="container relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            Revolutionizing the awareness of people towards their next step in education, career and beyond.
                        </h1>
                        <h2 className="text-xl md:text-2xl mb-8 font-medium opacity-90">
                            Shaping Your Tomorrow
                        </h2>
                        <p className="text-lg mb-8 max-w-md opacity-80">
                            Get personalized guidance from industry experts who
                            have been there and done that. Connect with mentors
                            who genuinely care about your success.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/services">
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="shadow-lg shadow-secondary/20"
                                >
                                    Explore Now
                                </Button>
                            </Link>
                            <Link href="/mentors">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-white text-white hover:bg-white hover:text-primary shadow-lg shadow-white/10"
                                >
                                    Meet Our Mentors
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.2,
                            ease: "easeOut",
                        }}
                        className="hidden md:block"
                    >
                        <div className="relative">
                            <div className="absolute -inset-4 rounded-full bg-white/10 blur-xl"></div>
                            <Image
                                src="/placeholder.webp"
                                alt="Mentorship Illustration"
                                width={600}
                                height={500}
                                className="rounded-2xl relative z-10 shadow-2xl"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
        </section>
    );
};

export default Hero;
