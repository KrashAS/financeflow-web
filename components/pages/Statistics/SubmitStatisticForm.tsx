'use client';
import { Button } from '@/components/ui/buttons/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const METRIC_TYPES = ['revenue', 'users', 'profit'] as const;
type MetricType = typeof METRIC_TYPES[number];

export default function SubmitStatisticForm() {
    const [type, setType] = useState<MetricType>(METRIC_TYPES[0]);
    const [amount, setAmount] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter()

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value as MetricType);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const res = await fetch("/api/statistics/create", {
                method: "POST",
                body: JSON.stringify({ userId: "42", type, amount: parseFloat(amount) }),
                headers: { "Content-Type": "application/json" },
            });
            if (!res.ok) throw new Error("Failed");
            router.push('/statistics')
        } catch (error) {
            console.log('POST /api/statistics/create:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}
            className="space-y-4 max-w-md">
            <div>
                <label className="block mb-1">Metric</label>
                <select
                    id="type"
                    value={type}
                    onChange={handleTypeChange}
                    className="w-full border px-3 py-2 rounded"
                >
                    {METRIC_TYPES.map((m) => (
                        <option key={m}
                            value={m}
                            className="text-black">
                            {m.charAt(0).toUpperCase() + m.slice(1)}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block mb-1">Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button
                type="submit"
                title={isSubmitting ? "Saving..." : "Save"}
                className="btn w-fit bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                disabled={isSubmitting}
            />
        </form>
    );
}


