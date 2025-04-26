"use client";

import { classNames } from "@/lib/classNames";
import { ReactNode, useEffect, useRef, useState } from "react";

interface SelectProps {
    options: string[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    children?: React.ReactNode;
}

export const Select = ({
    options,
    value,
    onChange,
    placeholder = "Select...",
    className,
}: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(value || "");
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onClickOutside = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) setIsOpen(false);
        };
        document.addEventListener("mousedown", onClickOutside);
        return () => document.removeEventListener("mousedown", onClickOutside);
    }, []);

    const handleSelect = (val: string) => {
        setSelected(val);
        onChange?.(val);
        setIsOpen(false);
    };

    return (
        <div ref={ref}
            className={classNames("relative inline-block", className)}>
            <SelectTrigger onClick={() => setIsOpen((prev) => !prev)}>
                <SelectValue placeholder={placeholder}>{selected || placeholder}</SelectValue>
            </SelectTrigger>

            {isOpen && (
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem
                            key={option}
                            value={option}
                            onClick={() => handleSelect(option)}
                            isSelected={option === selected}
                        >
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            )}
        </div>
    );
};

export const SelectTrigger = ({
    children,
    onClick,
    className
}: {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
}) => (
    <button
        onClick={onClick}
        className={classNames("w-full rounded-xl border border-gray-300 bg-white dark:bg-zinc-900 px-4 py-2 text-left text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary", className)}
    >
        {children}
    </button>
);

export const SelectValue = ({
    children,
    placeholder,
}: {
    children?: ReactNode;
    placeholder?: string;
}) => (
    <span className="block truncate">{children !== undefined ? children : placeholder}</span>
);

export const SelectContent = ({ children }: { children: ReactNode }) => (
    <div className="absolute z-10 mt-2 w-full rounded-xl border border-gray-300 bg-white dark:bg-zinc-900 shadow-lg">
        <div className="max-h-60 overflow-auto py-1 text-sm">{children}</div>
    </div>
);

interface SelectItemProps {
    value: string;
    onClick?: () => void;
    children: ReactNode;
    isSelected?: boolean;
}

export const SelectItem = ({
    value,
    onClick = () => {},
    children,
    isSelected = false,
}: SelectItemProps) => (
    <div
        onClick={onClick}
        className={classNames(
            "cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800",
            isSelected && "bg-gray-100 dark:bg-zinc-800 font-medium"
        )}
        data-value={value}
    >
        {children}
    </div>
);
