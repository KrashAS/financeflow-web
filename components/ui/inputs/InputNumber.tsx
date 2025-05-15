"use client";

import { useEffect, useRef } from "react";

interface InputNumberProps {
    value: string;
    onChange: (value: string) => void;
    id?: string;
    label?: string;
    placeholder?: string;
    isFocused?: boolean;
    classNameWrapper?: string;
    classNameLabel?: string;
    className?: string;
}

export default function InputNumber({
    value,
    onChange,
    id = "number",
    label = "Number",
    placeholder = "",
    isFocused,
    classNameWrapper = "",
    classNameLabel = "",
    className = "",
}: InputNumberProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFocused]);

    const formatInput = (input: string) => {
        let cleaned = input.trim();

        cleaned = cleaned.replace(/[^0-9.,]/g, "").replace(/,/g, ".");

        if (cleaned.startsWith(".")) {
            cleaned = cleaned.slice(1);
        }

        const parts = cleaned.split(".");
        if (parts.length > 2) {
            cleaned = parts[0] + "." + parts.slice(1).join("").replace(/\./g, "");
        }

        if (/^0[0-9]/.test(cleaned)) {
            cleaned = cleaned.replace(/^0+/, "");
        }

        return cleaned;
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = event.target.value;
        const formatted = formatInput(rawValue);
        onChange(formatted);
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
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                inputMode="decimal"
                maxLength={12}
                autoComplete="off"
                className={`w-full px-4 py-2 border border-gray-300 dark:border-transparent rounded-md bg-[var(--color-bg)] dark:bg-gray-800 focus:border-[var(--color-brand)] dark:focus:border-[var(--color-dark-brand)] focus:ring-2 focus:ring-[var(--color-brand)] dark:focus:ring-[var(--color-dark-brand)] focus:outline-none ${className}`}
            />
        </div>
    );
}
