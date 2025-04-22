// src/components/ui/Button.tsx
import React from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline" | "text";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    isLoading?: boolean;
    children: React.ReactNode;
}

interface LinkButtonProps {
    href: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    className?: string;
    children: React.ReactNode;
}

export const Button = ({
    variant = "primary",
    size = "md",
    fullWidth = false,
    isLoading = false,
    className = "",
    children,
    ...props
}: ButtonProps) => {
    const baseClasses =
        "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variantClasses = {
        primary: "bg-primary text-white hover:bg-opacity-90 focus:ring-primary",
        secondary:
            "bg-secondary text-white hover:bg-opacity-90 focus:ring-secondary",
        outline:
            "border border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary",
        text: "text-primary hover:bg-primary hover:bg-opacity-5 focus:ring-primary",
    };

    const sizeClasses = {
        sm: "px-3 py-1.5 text-sm rounded-md",
        md: "px-4 py-2 rounded-lg",
        lg: "px-6 py-3 text-lg rounded-xl",
    };

    const widthClass = fullWidth ? "w-full" : "";

    const btnClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

    return (
        <button
            className={btnClasses}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading && (
                <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
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
            )}
            {children}
        </button>
    );
};

export const LinkButton = ({
    href,
    variant = "primary",
    size = "md",
    fullWidth = false,
    className = "",
    children,
}: LinkButtonProps) => {
    const baseClasses =
        "inline-flex items-center justify-center font-medium transition-all duration-200";

    const variantClasses = {
        primary: "bg-primary text-white hover:bg-opacity-90",
        secondary: "bg-secondary text-white hover:bg-opacity-90",
        outline:
            "border border-primary text-primary hover:bg-primary hover:text-white",
        text: "text-primary hover:bg-primary hover:bg-opacity-5",
    };

    const sizeClasses = {
        sm: "px-3 py-1.5 text-sm rounded-md",
        md: "px-4 py-2 rounded-lg",
        lg: "px-6 py-3 text-lg rounded-xl",
    };

    const widthClass = fullWidth ? "w-full" : "";

    const linkClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

    return (
        <Link href={href} className={linkClasses}>
            {children}
        </Link>
    );
};

// Usage examples:
// <Button variant="primary" size="md">Click Me</Button>
// <Button variant="secondary" size="lg" isLoading={true}>Submit</Button>
// <LinkButton href="/somewhere" variant="outline">Go Somewhere</LinkButton>
