import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'brand' | 'success' | 'outline' | 'ghost';
    children: React.ReactNode;
}

export function Button({ variant = 'brand', className = '', ...props }: ButtonProps) {
    let baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        brand: "bg-brand-gradient text-white hover:opacity-90",
        success: "bg-green-500 text-white hover:bg-green-600",
        outline: "bg-transparent border border-white/20 text-white hover:bg-white/5",
        ghost: "bg-transparent text-gray-400 hover:text-white shadow-none"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        />
    );
}
