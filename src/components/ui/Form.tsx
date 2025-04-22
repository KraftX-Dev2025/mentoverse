// src/components/ui/Form.tsx
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
    className?: string;
}

interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
    className?: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
    className?: string;
    options: { value: string; label: string }[];
}

export const Input = ({
    label,
    error,
    fullWidth = true,
    className = "",
    id,
    ...props
}: InputProps) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    return (
        <div className={`mb-4 ${fullWidth ? "w-full" : ""} ${className}`}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-text-primary mb-1"
                >
                    {label}
                </label>
            )}
            <input
                id={inputId}
                className={`form-control w-full px-3 py-2 bg-white border ${
                    error ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors`}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export const Textarea = ({
    label,
    error,
    fullWidth = true,
    className = "",
    id,
    ...props
}: TextareaProps) => {
    const textareaId =
        id || `textarea-${Math.random().toString(36).substring(2, 9)}`;

    return (
        <div className={`mb-4 ${fullWidth ? "w-full" : ""} ${className}`}>
            {label && (
                <label
                    htmlFor={textareaId}
                    className="block text-sm font-medium text-text-primary mb-1"
                >
                    {label}
                </label>
            )}
            <textarea
                id={textareaId}
                className={`form-control w-full px-3 py-2 bg-white border ${
                    error ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors`}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export const Select = ({
    label,
    error,
    fullWidth = true,
    className = "",
    id,
    options,
    ...props
}: SelectProps) => {
    const selectId =
        id || `select-${Math.random().toString(36).substring(2, 9)}`;

    return (
        <div className={`mb-4 ${fullWidth ? "w-full" : ""} ${className}`}>
            {label && (
                <label
                    htmlFor={selectId}
                    className="block text-sm font-medium text-text-primary mb-1"
                >
                    {label}
                </label>
            )}
            <select
                id={selectId}
                className={`form-control w-full px-3 py-2 bg-white border ${
                    error ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors`}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};

// Usage examples:
// <Input label="Name" placeholder="Enter your name" required />
// <Textarea label="Message" placeholder="Write your message here" rows={4} required />
// <Select
//   label="Category"
//   options={[
//     { value: '', label: 'Select a category' },
//     { value: 'option1', label: 'Option 1' },
//     { value: 'option2', label: 'Option 2' },
//   ]}
//   required
// />
