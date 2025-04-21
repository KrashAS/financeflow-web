"use client";

import { useEffect, useState } from "react";

export function useTheme() {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        const html = document.documentElement;
        const newTheme = !html.classList.contains("dark");
        html.classList.toggle("dark", newTheme);
        localStorage.setItem("theme", newTheme ? "dark" : "light");
        setIsDark(newTheme);
    };

    useEffect(() => {
        const html = document.documentElement;
        const stored = localStorage.getItem("theme");

        if (stored) {
            html.classList.toggle("dark", stored === "dark");
        } else {
            const prefersDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;
            html.classList.toggle("dark", prefersDark);
        }

        setIsDark(html.classList.contains("dark"));

        const observer = new MutationObserver(() => {
            setIsDark(html.classList.contains("dark"));
        });

        observer.observe(html, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    return { isDark, toggleTheme };
}
