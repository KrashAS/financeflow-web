"use client";

import { useEffect, useState } from "react";

export default function Statistics() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        isLoading ? (
            <div className="animate-pulse space-y-4" >
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
                <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center space-y-6">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Your financial statistics will appear here soon 📊
                </p>
                <div className="w-full max-w-md h-64 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-lg shadow-lg flex items-center justify-center text-white font-bold text-xl">
                    Chart Placeholder
                </div>
            </div>
        )
    );
}