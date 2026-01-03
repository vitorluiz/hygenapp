import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'brand' | 'success' | 'outline' | 'ghost';
    children: React.ReactNode;
}

export function Button({ variant = 'brand', className = '', ...props }: ButtonProps) {
    const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        brand: "bg-brand-gradient text-white",
        success: "bg-success text-white",
        outline: "bg-transparent border border-white/20 text-white hover:bg-white/5",
        ghost: "bg-transparent text-text-secondary hover:text-foreground"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        />
    );
}
