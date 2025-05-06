"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
    onEdit: () => void;
    onDelete: () => void;
    openUp?: boolean;
};

export default function DropdownActions({ onEdit, onDelete, openUp = false }: Props) {
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
        <div className="relative"
            ref={dropdownRef}>
            <button
                onClick={() => setOpen(!open)}
                className="btn p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Actions"
            >
                ⋮
            </button>

            {open && (
                <div
                    className={`absolute right-0 w-32 bg-white dark:bg-gray-800 overflow-hidden shadow rounded-md z-10 
                    ${openUp ? "bottom-full mb-2" : "top-full mt-2"}`}
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
                        className="btn block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}
