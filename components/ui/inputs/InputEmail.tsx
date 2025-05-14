"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface InputEmailProps {
    value: string;
    onChange: (value: string) => void;
    onValidationChange?: (hasError: boolean) => void;
    id?: string;
    label?: string;
    isFocused?: boolean;
}

const minStringToValidate = 3;

export default function InputEmail({
    value,
    onChange,
    onValidationChange,
    id = "email",
    label = "Email",
    isFocused = false,
}: InputEmailProps) {
    const emailRef = useRef<HTMLInputElement>(null);
    const [isError, setIsError] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [wasBlurred, setWasBlurred] = useState(false);

    const validate = useCallback((input: string) => {
        if (!onValidationChange) return

        if (!input || input.trim() === "" || isFocus) {
            setIsError(false);
            onValidationChange?.(true);
            return;
        }

        const fullEmailRegex =
            /^(?!.*\.{2}|.*\+\+|.*__)[\w+.-]+@(?![&'+,.<=>_]+)(?!.*\.{2}|.*_)[\w.-]+\.[A-Za-z]{2,}$/;

        const hasAt = input.includes("@");

        if (input.length <= minStringToValidate) {
            setIsError(true);
            onValidationChange?.(true);
            return;
        }

        const isValid = hasAt ? fullEmailRegex.test(input) : false;

        setIsError(!isValid);
        onValidationChange?.(!isValid);
    }, [isFocus, onValidationChange]);

    useEffect(() => {
        if (wasBlurred) {
            validate(value);
        }
    }, [value, wasBlurred, validate]);

    useEffect(() => {
        if (isFocused && emailRef.current) {
            emailRef.current.focus();
        }
    }, [isFocused]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value.replace(/ /g, ""));
    };

    const handleBlur = () => {
        setIsFocus(false);
        setWasBlurred(true);
        validate(value);
    };

    const handleFocus = () => {
        setIsFocus(true);
    };

    return (
        <div className="w-full">
            <label htmlFor={id}
                className="block mb-1 w-fit">
                {label}
            </label>
            <input
                ref={emailRef}
                type="text"
                id={id}
                value={value}
                onChange={handleChange}
                autoComplete="off"
                onFocus={handleFocus}
                onBlur={handleBlur}
                maxLength={64}
                placeholder="Enter a valid email address"
                className={`w-full px-4 py-2 border rounded-md bg-[var(--color-bg)] dark:bg-gray-800 focus:outline-none
                    ${isError
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 dark:border-transparent focus:border-[var(--color-brand)] dark:focus:border-[var(--color-dark-brand)] focus:ring-2 focus:ring-[var(--color-brand)] dark:focus:ring-[var(--color-dark-brand)]"
                    }`}
            />
            <p
                className={`text-sm mt-1 min-h-[1.25rem] transition-opacity duration-200 ${isError && wasBlurred ? "text-red-500 opacity-100" : "text-transparent opacity-0"
                    }`}
            >
                Please enter a valid email address.
            </p>
        </div>
    );
}
