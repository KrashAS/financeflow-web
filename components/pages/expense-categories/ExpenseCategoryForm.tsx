"use client";

import { Button } from "@/components/ui/buttons/Button";
import Input from "@/components/ui/inputs/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ExpenseCategoryForm() {
    const [name, setName] = useState("");
    const [color, setColor] = useState("#3B82F6");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !color) return;

        setIsSubmitting(true);

        const res = await fetch("/api/expense-categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, color }),
        });

        if (res.ok) {
            router.push("/expense-categories");
        } else {
            const err = await res.json();
            alert(err.error || "Failed to create category");
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-[var(--color-dark-bg)] border border-[var(--color-border-default)] dark:border-[var(--color-dark-border-default)] p-6 rounded-xl shadow-md space-y-4"
        >
            <Input type="text"
                id="category-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Budget Name"
                placeholder="Enter category"
                isFocused={true}
                required />
            <div>
                <label className="block mb-1 w-fit">
                    Category Color
                </label>
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-16 h-10 p-1 rounded-md border border-gray-300 dark:border-[var(--color-dark-border-default)] bg-transparent cursor-pointer"
                />
            </div>
            <div className="flex justify-between">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary font-medium px-4 py-2 rounded"
                    title={isSubmitting ? "Saving..." : "Create Category"}
                />
                <Link
                    href="/expense-categories"
                    className="btn-secondary font-medium inline-block px-4 py-2 rounded"
                >
                    Back
                </Link>
            </div>
        </form>
    );
}
