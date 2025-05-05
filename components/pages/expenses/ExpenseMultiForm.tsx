"use client";

import { Button } from "@/components/ui/buttons/Button";
import { Category } from "@/types/category";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
    categories: Category[];
    currency: string;
}

interface ExpenseInput {
    title: string;
    amount: string;
}

export default function ExpenseMultiForm({ categories, currency }: Props) {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [inputs, setInputs] = useState<Record<number, ExpenseInput>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const toggleCategory = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const handleInputChange = (id: number, field: keyof ExpenseInput, value: string) => {
        setInputs((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value,
            },
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = selectedIds
            .map((id) => ({
                ...inputs[id],
                categoryId: id,
            }))
            .filter((e) => e.title?.trim() && parseFloat(e.amount) > 0)
            .map((e) => ({
                title: e.title.trim(),
                amount: parseFloat(e.amount),
                categoryId: e.categoryId,
                currency,
            }));

        if (!payload.length) return alert("Please fill in at least one expense");

        setIsSubmitting(true);

        const res = await fetch("/api/expenses/bulk", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ expenses: payload }),
        });

        if (res.ok) {
            router.push("/expenses");
        } else {
            const err = await res.json();
            alert(err.error || "Failed to add expenses");
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}
            className="space-y-6">
            <fieldset className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {categories.map((cat) => (
                    <label
                        key={cat.id}
                        className="flex items-center space-x-2 cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            checked={selectedIds.includes(cat.id)}
                            onChange={() => toggleCategory(cat.id)}
                            className="accent-[var(--color-brand)]"
                        />
                        <span
                            className="flex items-center gap-2 text-sm"
                            title={cat.name}
                        >
                            <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: cat.color }}
                            ></span>
                            {cat.name}
                        </span>
                    </label>
                ))}
            </fieldset>

            <div className="space-y-4">
                {selectedIds.map((id) => {
                    const cat = categories.find((c) => c.id === id);
                    const value = inputs[id] || { title: "", amount: "" };
                    return (
                        <div
                            key={id}
                            className="border border-[var(--color-border-default)] dark:border-[var(--color-dark-border-default)] rounded-lg p-4"
                        >
                            <h3 className="text-sm font-semibold mb-2">
                                {cat?.name} expense
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={value.title ?? ""}
                                    onChange={(e) => handleInputChange(id, "title", e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-transparent rounded-md bg-[var(--color-bg)] dark:bg-gray-800 transition-colors duration-200 focus:border-[var(--color-brand)] dark:focus:border-[var(--color-dark-brand)] focus:ring-2 focus:ring-[var(--color-brand)] dark:focus:ring-[var(--color-dark-brand)] focus:outline-none"
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder={`Amount (${currency})`}
                                    value={value.amount ?? ""}
                                    onChange={(e) => handleInputChange(id, "amount", e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-transparent rounded-md bg-[var(--color-bg)] dark:bg-gray-800 transition-colors duration-200 focus:border-[var(--color-brand)] dark:focus:border-[var(--color-dark-brand)] focus:ring-2 focus:ring-[var(--color-brand)] dark:focus:ring-[var(--color-dark-brand)] focus:outline-none"
                                    required
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-between">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary font-medium px-4 py-2 rounded"
                    title={isSubmitting ? "Saving..." : "Create Category"}
                />
                <Link
                    href="/expenses"
                    className="btn-secondary font-medium inline-block px-4 py-2 rounded"
                >
                    Back
                </Link>
            </div>
        </form>
    );
}