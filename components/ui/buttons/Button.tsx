'use client';

import React from 'react';


interface ButtonProps {
    title: string;
    type?: 'button' | 'submit' | 'reset';
    onClickButton?: () => void;
    className?: string;
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    type = 'button',
    onClickButton,
    className = '',
    disabled = false
}) => {
    return (
        <button
            type={type}
            className={`cursor-pointer ${className}`}
            onClick={onClickButton}
            disabled={disabled}
        >
            {title}
        </button>
    );
};