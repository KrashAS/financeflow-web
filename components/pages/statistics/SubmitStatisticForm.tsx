'use client';
import { Button } from '@/components/ui/buttons/Button';
import Link from 'next/link';
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

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setType(event.target.value as MetricType);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
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
            className="space-y-4 max-w-md"
            noValidate>
            <div>
                <label className="block mb-1">Metric</label>
                <select
                    id="type"
                    value={type}
                    onChange={handleTypeChange}
                    className="w-full border px-3 py-2 rounded"
                >
                    {METRIC_TYPES.map((element) => (
                        <option key={element}
                            value={element}
                            className="text-black">
                            {element.charAt(0).toUpperCase() + element.slice(1)}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block mb-1">Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    className="w-full border px-3 py-2 rounded"
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className='flex justify-between'>
                <Button
                    type="submit"
                    title={isSubmitting ? "Saving..." : "Save"}
                    className="btn btn-primary w-fit py-2 px-4 rounded transition"
                    disabled={isSubmitting}
                />
                <Link
                    href="/statistics"
                    className="btn-secondary inline-block px-4 py-2 rounded "
                >
                    Back
                </Link>
            </div>
        </form>
    );
}


