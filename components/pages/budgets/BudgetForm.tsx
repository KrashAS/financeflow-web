"use client";

import { Button } from "@/components/ui/buttons/Button";
import Input from "@/components/ui/inputs/Input";
import InputNumber from "@/components/ui/inputs/InputNumber";
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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
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
            className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-8 rounded-xl shadow-md w-full space-y-6"
        >
            <Input type="text"
                id="budget-name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label="Budget Name"
                placeholder="Enter the income name"
                isFocused={true}
            />
            <InputNumber id="budget-amount"
                value={amount}
                onChange={setAmount}
                placeholder="Enter the income amount"
                label={`Amount${currencySymbol ? `, ${currencySymbol}` : ""}`} />
            <div className="flex justify-between">
                <Button
                    type="submit"
                    disabled={isSubmitting || !title || !amount || +amount == 0}
                    className="btn btn-primary font-medium px-4 py-2 rounded"
                    title={isSubmitting ? "Saving..." : "Create Budget"}
                />
                <Link href="/budgets"
                    className="btn-secondary inline-block font-medium px-4 py-2 rounded">
                    Back
                </Link>
            </div>
        </form>
    );
}

