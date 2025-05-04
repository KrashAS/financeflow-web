import IconClosedEye from "@/components/icons/IconClosedEye";
import IconOpenEye from "@/components/icons/IconOpenEye";
import { useState } from "react";

interface PasswordInputProps {
    value: string;
    onChange: (value: string) => void;
    id?: string;
    label?: string;
}

export default function InputPassword({
    value,
    onChange,
    id = "password",
    label = "Password",
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative w-full">
            <label htmlFor={id}
                className="block mb-1 w-fit">
                {label}
            </label>
            <input
                type={showPassword ? "text" : "password"}
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                autoComplete="current-password"
                required
                className="w-full pr-10 px-4 py-2 border border-gray-300 dark:border-transparent rounded-md bg-[var(--color-bg)] dark:bg-gray-800  focus:border-[var(--color-brand)] dark:focus:border-[var(--color-dark-brand)] focus:ring-2 focus:ring-[var(--color-brand)] dark:focus:ring-[var(--color-dark-brand)] focus:outline-none"
            />
            <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[48px] transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
                {showPassword ? <IconOpenEye /> : <IconClosedEye />}
            </button>
        </div>
    );
}