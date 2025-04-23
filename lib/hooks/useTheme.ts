"use client";

import { useEffect, useState } from "react";

export function useTheme() {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        const html = document.documentElement;
        const newTheme = !html.classList.contains("dark");
        if (newTheme) {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
        localStorage.setItem("theme", newTheme ? "dark" : "light");
        setIsDark(newTheme);
    };

    useEffect(() => {
        const html = document.documentElement;
        const stored = localStorage.getItem("theme");

        if (stored === "dark") {
            html.classList.add("dark");
        } else if (stored === "light") {
            html.classList.remove("dark");
        } else {
            const prefersDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;
            if (prefersDark) {
                html.classList.add("dark");
            } else {
                html.classList.remove("dark");
            }
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
