"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
    onEdit: () => void;
    onDelete: () => void;
    openUp?: boolean;
    className?: string;
};

export default function DropdownActions({ onEdit, onDelete, openUp = false, className = "" }: Props) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`relative ${className}`}
            ref={dropdownRef}>
            <button
                onClick={() => setOpen(!open)}
                className="btn h-8 w-8 rounded-full backdrop-blur-sm bg-gray-200/70 dark:bg-white/10 hover:bg-gray-300/70 dark:hover:bg-white/20"
                aria-label="Actions"
            >
                ⋮
            </button>

            {open && (
                <div
                    className={`absolute z-10 right-0 w-32 bg-white dark:bg-[var(--color-dark-bg)] shadow-lg ring-1 ring-black/5 dark:ring-gray-700 overflow-hidden rounded-md  ${openUp ? "bottom-full mb-2" : "top-full mt-2"}`}
                >
                    <button
                        onClick={() => {
                            setOpen(false);
                            onEdit();
                        }}
                        className="btn block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => {
                            setOpen(false);
                            onDelete();
                        }}
                        className="btn block w-full text-left px-4 py-2 text-sm  text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}
