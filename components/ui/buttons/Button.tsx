import { forwardRef } from 'react';

interface ButtonProps {
    title: string;
    onClickButton?: () => void;
    className?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ title, onClickButton, className = '', disabled = false, type = 'button' }, ref) => {
        return (
            <button
                ref={ref}
                type={type}
                className={`cursor-pointer ${className}`}
                onClick={onClickButton}
                disabled={disabled}
            >
                {title}
            </button>
        );
    }
);

Button.displayName = 'Button';
