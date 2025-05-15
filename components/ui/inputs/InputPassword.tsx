import IconClosedEye from "@/components/icons/IconClosedEye";
import IconOpenEye from "@/components/icons/IconOpenEye";
import { useEffect, useState } from "react";

interface PasswordInputProps {
    value: string;
    onChange: (value: string) => void;
    onValidationChange?: (hasError: boolean) => void;
    id?: string;
    label?: string;
}

const MIN_PASSWORD_LENGTH = 8;

export default function InputPassword({
    value,
    onChange,
    onValidationChange,
    id = "password",
    label = "Password",
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (isTouched && onValidationChange) {
            const hasError = value.length > 0 && value.length < MIN_PASSWORD_LENGTH;
            setIsError(hasError);
            onValidationChange?.(hasError);
        }
    }, [value, isTouched, onValidationChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const onlyLatin = input.replace(/[^A-Za-z0-9]/g, "");
        onChange(onlyLatin);
    };

    const handleBlur = () => {
        setIsTouched(true);
    };

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
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                maxLength={32}
                placeholder="Enter a password"
                className={`w-full pr-10 px-4 py-2 border rounded-md bg-[var(--color-bg)] dark:bg-gray-800 focus:outline-none 
                    ${isError
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 dark:border-transparent focus:border-[var(--color-brand)] dark:focus:border-[var(--color-dark-brand)] focus:ring-2 focus:ring-[var(--color-brand)] dark:focus:ring-[var(--color-dark-brand)]"
                    }`}
            />
            <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[48px] transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
                {showPassword ? <IconOpenEye /> : <IconClosedEye />}
            </button>
            <div className="min-h-[1.25rem] mt-1">
                {isTouched && onValidationChange && (
                    <p className={`text-sm mt-1 ${isError ? "text-red-500" : "text-gray-500"}`}>
                        {isError
                            ? `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`
                            : "Use only Latin letters or number and no spaces."}
                    </p>
                )}
            </div>
        </div>
    );
}
