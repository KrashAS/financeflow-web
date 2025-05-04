"use client";

import { Button } from "@/components/ui/buttons/Button";
import InputPassword from "@/components/ui/inputs/InputPassword";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const nameRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, name }),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error('Error:', data);
            setError(data.error || "Failed to register.");
            return;
        }

        setEmail("");
        setPassword("");
        setName("");
        setError("");
        router.push("/auth/login");
    };

    useEffect(() => {
        nameRef.current?.focus();
    }, []);

    return (
        <div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-background p-4">
            <form onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
                <div className="mb-4">
                    <label htmlFor="name"
                        className="block mb-1">Name</label>
                    <input
                        ref={nameRef}
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="username"
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-transparent rounded-md bg-[var(--color-bg)] dark:bg-gray-800 transition-colors duration-200 focus:border-[var(--color-brand)] dark:focus:border-[var(--color-dark-brand)] focus:ring-2 focus:ring-[var(--color-brand)] dark:focus:ring-[var(--color-dark-brand)] focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1"
                        htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-transparent rounded-md bg-[var(--color-bg)] dark:bg-gray-800 transition-colors duration-200 focus:border-[var(--color-brand)] dark:focus:border-[var(--color-dark-brand)] focus:ring-2 focus:ring-[var(--color-brand)] dark:focus:ring-[var(--color-dark-brand)] focus:outline-none"
                    />
                </div>
                <div className="mb-6">
                    <InputPassword id="password"
                        label="Password"
                        value={password}
                        onChange={value => setPassword(value)} />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <Button type="submit"
                    className="btn btn-primary w-full py-2 px-4 rounded"
                    title='Sign Up' />
            </form>
        </div>
    );
}
