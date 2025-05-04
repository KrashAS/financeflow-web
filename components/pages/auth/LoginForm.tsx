"use client";

import { Button } from "@/components/ui/buttons/Button";
import InputEmail from "@/components/ui/inputs/InputEmail";
import InputPassword from "@/components/ui/inputs/InputPassword";

import { storage } from "@/utils/storage";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            setError("Invalid email or password");
        } else {
            const session = await getSession();
            const user = session?.user;

            if (user) {
                storage.setItem("user", {
                    id: user.uid || "",
                    name: user.name || null,
                });
            }
            setEmail("");
            setPassword("");
            setError("");
            router.push("/dashboard");
        }
    };



    return (
        <div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-background p-4">
            <form onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
                <div className="mb-4">
                    <InputEmail id="email"
                        label="Email"
                        value={email}
                        onChange={setEmail}
                        isFocused={true} />
                </div>
                <div className="mb-6">
                    <InputPassword id="password"
                        label="Password"
                        value={password}
                        onChange={setPassword} />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <Button type="submit"
                    className="btn btn-primary w-full py-2 px-4 rounded"
                    title='Sign In' />

                <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
                    Don&apos;t have an account?{" "}
                    <Link href="/auth/register"
                        className="text-blue-600 hover:underline">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
}