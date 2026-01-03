import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export function Card({ children, className = '', title }: CardProps) {
    return (
        <div className={`bg-card rounded-2xl p-6 ${className}`}>
            {title && <h3 className="text-text-secondary text-sm font-bold uppercase mb-4 tracking-wider">{title}</h3>}
            {children}
        </div>
    );
}
