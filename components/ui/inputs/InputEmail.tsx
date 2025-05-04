import { useEffect, useRef } from "react";

interface InputEmailProps {
    value: string;
    onChange: (value: string) => void;
    id?: string;
    label?: string;
    isFocused?: boolean;

}

export default function InputEmail({
    value,
    onChange,
    id = "email",
    label = "Email",
    isFocused = false
}: InputEmailProps) {
    const emailRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isFocused && emailRef.current) {
            emailRef.current.focus();
        }
    }, [isFocused]);
    return (
        <div className="w-full">
            <label htmlFor={id}
                className="block mb-1 w-fit">
                {label}
            </label>
            <input
                ref={emailRef}
                type="email"
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                autoComplete="email"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-transparent rounded-md bg-[var(--color-bg)] dark:bg-gray-800 focus:border-[var(--color-brand)] dark:focus:border-[var(--color-dark-brand)] focus:ring-2 focus:ring-[var(--color-brand)] dark:focus:ring-[var(--color-dark-brand)] focus:outline-none"
            />
        </div>
    );
}
