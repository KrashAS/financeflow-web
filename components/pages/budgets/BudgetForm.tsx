"use client";

import { Button } from "@/components/ui/buttons/Button";
import { CURRENCIES } from "@/constants/currencies";
import { RootState } from "@/lib/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function BudgetForm() {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const currencyCode = useSelector((state: RootState) => state.currency.code);

    const currencySymbol =
        CURRENCIES.find((c) => c.code === currencyCode)?.symbol || "";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || Number(amount) <= 0) return;

        setIsSubmitting(true);

        const res = await fetch("/api/budgets", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                amount: parseFloat(amount),
                currency: currencyCode,
            }),
        });

        if (res.ok) {
            router.push("/budgets");
        } else {
            const { error } = await res.json();
            alert(error || "Failed to create budget");
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-8 rounded-xl shadow-md w-full max-w-md space-y-6"
        >
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[color:var(--color-dark-text-gray)] mb-1">Budget Name</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-transparent rounded-md bg-[var(--color-bg)] dark:bg-gray-800 focus:border-[var(--color-brand)] dark:focus:border-[var(--color-dark-brand)] focus:ring-2 focus:ring-[var(--color-brand)] dark:focus:ring-[var(--color-dark-brand)] focus:outline-none"
                    placeholder="Enter the income name"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[color:var(--color-dark-text-gray)] mb-1">Amount</label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">
                        {currencySymbol}
                    </span>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-transparent rounded-md bg-[var(--color-bg)] dark:bg-gray-800 focus:border-[var(--color-brand)] dark:focus:border-[var(--color-dark-brand)] focus:ring-2 focus:ring-[var(--color-brand)] dark:focus:ring-[var(--color-dark-brand)] focus:outline-none"
                        placeholder="Enter the income amount"
                        required
                    />
                </div>
            </div>

            <div className="flex justify-between">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary font-medium px-4 py-2 rounded"
                    title={isSubmitting ? "Saving..." : "Create Budget"}
                />
                <Link href="/budgets"
                    className="btn-secondary inline-block px-4 py-2 rounded">
                    Back
                </Link>
            </div>
        </form>
    );
}

