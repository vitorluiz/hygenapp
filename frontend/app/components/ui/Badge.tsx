import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'success';
    className?: string;
}

/**
 * Componente Badge seguindo o Design System Hyfen
 * 
 * Especificações:
 * - Sucesso: Verde #22C55E
 * - Texto escuro
 * - Formato pill (border-radius: 999px)
 */
export function Badge({ children, variant = 'success', className = '' }: BadgeProps) {
    const baseStyles = "inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold";

    const variants = {
        success: "bg-success text-black",
    };

    return (
        <span className={`${baseStyles} ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
}
