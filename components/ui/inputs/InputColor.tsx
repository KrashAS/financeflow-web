"use client";

import { ChangeEvent } from "react";

type ColorInputProps = {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    classNameWrapper?: string;
    classNameLabel?: string;
};

export default function InputColor({
    label = "Category Color",
    value,
    onChange,
    classNameWrapper = "",
    classNameLabel = "",
}: ColorInputProps) {
    return (
        <div className={classNameWrapper}>
            <label className={`block mb-1 w-fit ${classNameLabel}`}>
                {label}
            </label>
            <input
                type="color"
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                className="w-16 h-10 p-1 rounded-md border border-gray-300 dark:border-[var(--color-dark-border-default)] bg-transparent cursor-pointer"
            />
        </div>
    );
}
