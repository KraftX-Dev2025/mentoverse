import { motion } from "framer-motion";

const stats = [
    { number: "5+", label: "Events" },
    { number: "20+", label: "Mentors" },
    { number: "3,000+", label: "Community" },
    { number: "50,000+", label: "Reach" },
];

// Stats Page Added
const Stats = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
            },
        },
    };

    // Counter animation configuration
    const CounterAnimation = ({ value }: { value: string }) => {
        // Extract the numeric part from the value (e.g., "3,000+" -> 3000)
        const numericValue = parseInt(value.replace(/,/g, ""));
        const formattedValue = value.includes("+")
            ? `${Number(numericValue).toLocaleString()}+`
            : numericValue.toLocaleString();

        return (
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {formattedValue}
            </motion.span>
        );
    };

    return (
        <section className="py-20 bg-gradient-primary text-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
            </div>

            <div className="container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                        We are good with numbers
                    </h2>
                </motion.div>

                <motion.div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 text-center hover:transform hover:scale-105 transition-transform duration-300"
                            variants={itemVariants}
                            whileHover={{
                                y: -5,
                                transition: { duration: 0.2 },
                            }}
                        >
                            <motion.div
                                className="text-4xl md:text-5xl font-bold mb-2 text-white"
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{
                                    delay: 0.3 + index * 0.1,
                                    duration: 0.5,
                                    type: "spring",
                                    stiffness: 100,
                                }}
                                viewport={{ once: true }}
                            >
                                <CounterAnimation value={stat.number} />
                            </motion.div>
                            <div className="text-lg text-white opacity-90">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Stats;
