"use client";

import { Button } from "@/components/ui/buttons/Button";
import Input from "@/components/ui/inputs/Input";
import InputEmail from "@/components/ui/inputs/InputEmail";
import InputPassword from "@/components/ui/inputs/InputPassword";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
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

    return (
        <div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-background p-4">
            <form onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md w-full max-w-md"
                noValidate>
                <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
                <div className="mb-10">
                    <Input
                        type="text"
                        id="name"
                        label="Name"
                        value={name}
                        isFocused={true}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </div>
                <div className="mb-4">
                    <InputEmail
                        id="email"
                        label="Email"
                        value={email}
                        onChange={setEmail}
                        onValidationChange={setEmailError}
                    />
                </div>
                <div className="mb-12">
                    <InputPassword
                        id="password"
                        label="Password"
                        value={password}
                        onChange={setPassword}
                        onValidationChange={setPasswordError}
                    />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <Button type="submit"
                    className="btn btn-primary w-full py-2 px-4 rounded"
                    title='Sign Up'
                    disabled={emailError || passwordError || !email || !name || !password} />
            </form>
        </div>
    );
}
