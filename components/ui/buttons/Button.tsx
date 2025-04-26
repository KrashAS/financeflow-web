'use client';

import React from 'react';


interface ButtonProps {
    title: string;
    type?: 'button' | 'submit' | 'reset';
    onClickButton?: () => void;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    type = 'button',
    onClickButton,
    className = '',
}) => {
    return (
        <button
            type={type}
            className={`cursor-pointer ${className}`}
            onClick={onClickButton}
        >
            {title}
        </button>
    );
};