"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error('Error:', data);
            setError(data.error || "Failed to register.");
            return;
        }

        router.push("/auth/login");
    };

    return (
        <div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-background p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-md dark:bg-gray-800"
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-1" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-md dark:bg-gray-800"
                    />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}
