import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Icons Added
export interface ButtonProps {
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    href?: string;
    fullWidth?: boolean;
}

const Button = ({
    variant = "primary",
    size = "md",
    children,
    className = "",
    disabled = false,
    onClick,
    type = "button",
    href,
    fullWidth = false,
}: ButtonProps) => {
    // Base styles for all buttons
    const baseStyles =
        "inline-flex items-center justify-center font-medium rounded-2xl transition-all duration-300 shadow-md";

    // Variant-specific styles
    const variantStyles = {
        primary:
            "bg-primary text-white hover:bg-primary/90 shadow-lg focus:ring-2 focus:ring-primary/50",
        secondary:
            "bg-secondary text-white hover:bg-secondary/90 shadow-lg focus:ring-2 focus:ring-secondary/50",
        outline:
            "border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-2 focus:ring-primary/50",
    };

    // Size-specific styles
    const sizeStyles = {
        sm: "py-2 px-3 text-sm",
        md: "py-3 px-5 text-base",
        lg: "py-4 px-6 text-lg",
    };

    // Combine all styles
    const buttonStyles = `
    ${baseStyles} 
    ${variantStyles[variant]} 
    ${sizeStyles[size]} 
    ${fullWidth ? "w-full" : ""} 
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} 
    ${className}
  `;

    const buttonContent = (
        <motion.span
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center"
        >
            {children}
        </motion.span>
    );

    // Render as link if href is provided
    if (href) {
        return (
            <Link href={href} className={buttonStyles}>
                {buttonContent}
            </Link>
        );
    }

    // Otherwise render as button
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={buttonStyles}
        >
            {buttonContent}
        </button>
    );
};

export default Button;
