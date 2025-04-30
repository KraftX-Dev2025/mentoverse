"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { testimonials } from "@/lib/constants";

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // Animation variants
    const cardVariants = {
        initial: {
            opacity: 0,
            y: 30,
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
        exit: {
            opacity: 0,
            y: -30,
            transition: {
                duration: 0.3,
                ease: "easeIn",
            },
        },
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
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 py-[4rem]">
                        What Our Mentees Say
                    </h2>
                    <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                        Hear from those who have accelerated their careers with
                        Mentoverse
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto px-4">
                    {/* Testimonial Cards */}
                    <div className="relative h-[350px] md:h-[280px]">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial="initial"
                                animate={
                                    activeIndex === index ? "animate" : "exit"
                                }
                                variants={cardVariants}
                                className={`p-8 rounded-xl shadow-lg bg-white border border-gray-100 absolute top-0 left-0 right-0 ${
                                    activeIndex === index
                                        ? "z-10"
                                        : "z-0 hidden"
                                }`}
                            >
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                    <div className="shrink-0">
                                        <div className="relative w-20 h-20 rounded-full overflow-hidden">
                                            <Image
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex mb-4 text-secondary">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className={`h-5 w-5 ${
                                                        i < testimonial.rating
                                                            ? "text-secondary"
                                                            : "text-gray-300"
                                                    }`}
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>

                                        <p className="text-lg italic text-text-secondary mb-4">
                                            &quot;{testimonial.text}&quot;
                                        </p>

                                        <div>
                                            <h4 className="font-semibold text-lg">
                                                {testimonial.name}
                                            </h4>
                                            <p className="text-sm text-text-secondary">
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    activeIndex === index
                                        ? "bg-primary w-8"
                                        : "bg-gray-300 hover:bg-primary/50"
                                }`}
                                aria-label={`Testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
