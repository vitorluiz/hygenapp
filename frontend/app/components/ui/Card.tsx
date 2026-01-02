import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export function Card({ children, className = '', title }: CardProps) {
    return (
        <div className={`bg-[#1C1C22] rounded-2xl p-6 border border-white/5 shadow-xl ${className}`}>
            {title && <h3 className="text-gray-400 text-sm font-bold uppercase mb-4 tracking-wider">{title}</h3>}
            {children}
        </div>
    );
}
