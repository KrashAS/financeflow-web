import { useEffect, useRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    isFocused?: boolean;
    classNameWrapper?: string;
    classNameLabel?: string;
}

export default function Input({
    label,
    id,
    classNameWrapper = "",
    isFocused,
    className = "",
    classNameLabel = "",
    onChange,
    maxLength = 24,
    ...props
}: InputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFocused]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const trimmedValue = value.replace(/^\s+/, "");

        if (onChange) {
            const newEvent = {
                ...e,
                target: {
                    ...e.target,
                    value: trimmedValue,
                },
            };
            onChange(newEvent as React.ChangeEvent<HTMLInputElement>);
        }
    };

    return (
        <div className={`w-full ${classNameWrapper}`}>
            {label && (
                <label htmlFor={id}
                    className={`block mb-1 w-fit ${classNameLabel}`}>
                    {label}
                </label>
            )}
            <input
                ref={inputRef}
                id={id}
                maxLength={maxLength}
                onChange={handleChange}
                autoComplete="off"
                className={`w-full px-4 py-2 border border-gray-300 dark:border-transparent rounded-md bg-[var(--color-bg)] dark:bg-gray-800 focus:border-[var(--color-brand)] dark:focus:border-[var(--color-dark-brand)] focus:ring-2 focus:ring-[var(--color-brand)] dark:focus:ring-[var(--color-dark-brand)] focus:outline-none ${className}`}
                {...props}
            />
        </div>
    );
}
