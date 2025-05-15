"use client";

import { Button } from "@/components/ui/buttons/Button";
import Input from "@/components/ui/inputs/Input";
import InputNumber from "@/components/ui/inputs/InputNumber";
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
    const [errorMessage, setErrorMessage] = useState('');
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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const payload = selectedIds
            .map((id) => ({
                ...inputs[id],
                categoryId: id,
            }))
            .filter((element) => element.title?.trim() && parseFloat(element.amount) > 0)
            .map((element) => ({
                title: element.title.trim(),
                amount: parseFloat(element.amount),
                categoryId: element.categoryId,
                currency,
            }));

        if (!payload.length) return setErrorMessage("Please fill in at least one expense");

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
            setErrorMessage(err.error || "Failed to add expenses");
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
                    const cat = categories.find((element) => element.id === id);
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
                                <Input
                                    type="text"
                                    placeholder="Title"
                                    value={value.title ?? ""}
                                    onChange={(e) => handleInputChange(id, "title", e.target.value)}
                                />
                                <InputNumber
                                    placeholder={`Amount (${currency})`}
                                    value={value.amount ?? ""}
                                    onChange={(element) => handleInputChange(id, "amount", element)}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
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