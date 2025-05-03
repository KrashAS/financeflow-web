"use client";

import { CURRENCIES, DEFAULT_CURRENCY } from "@/constants/currencies";
import { setCurrency } from "@/lib/redux/features/currency/currencySlice";
import { AppDispatch } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const LOCAL_STORAGE_KEY = "selectedCurrency";

const DropdownCurrency = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCurrency, setSelectedCurrencyState] = useState(DEFAULT_CURRENCY);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()

    useEffect(() => {
        const fetchCurrency = async () => {
            try {
                const res = await fetch("/api/settings/currency");
                const data = await res.json();

                const code = data.currency || DEFAULT_CURRENCY;

                setSelectedCurrencyState(code);
                dispatch(setCurrency(code));
                router.refresh()
                localStorage.setItem(LOCAL_STORAGE_KEY, code);
            } catch (error) {
                console.error("Failed to fetch currency:", error);
            }
        };

        fetchCurrency();
    }, [dispatch, router]);

    const toggleDropdown = () => setIsOpen(prev => !prev);

    const handleSelect = async (code: string) => {
        try {
            const res = await fetch('/api/settings/currency', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currency: code }),
            });
            if (!res.ok) {
                console.error('Failed to update currency', await res.text());
            } else {
                setSelectedCurrencyState(code);
                dispatch(setCurrency(code));
                localStorage.setItem(LOCAL_STORAGE_KEY, code);
                setIsOpen(false);
                router.refresh()
            }
        } catch (err) {
            console.error('Error updating currency:', err);
        }
    };

    const selected = CURRENCIES.find(c => c.code === selectedCurrency) || { symbol: '', code: '' };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="btn inline-flex items-center justify-center gap-2 rounded-md bg-white dark:bg-[var(--color-dark-bg)] px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow ring-1 ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500"
            >
                {selected?.symbol} {selected?.code}
                <svg
                    className={`w-4 h-4 text-gray-500 dark:text-white transform transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06 0L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-white dark:bg-[var(--color-dark-bg)] shadow-lg ring-1 ring-black/5 dark:ring-gray-700 z-50 overflow-hidden">
                    {CURRENCIES.map(currency => (
                        <button
                            key={currency.code}
                            onClick={() => handleSelect(currency.code)}
                            className={`btn block w-full text-left px-4 py-2 text-sm transition-colors ${selectedCurrency === currency.code
                                ? "bg-gray-100 dark:bg-gray-500  text-gray-900 dark:text-white font-semibold"
                                : "text-gray-700 dark:text-[var(--color-dark-text-muted)] dark:hover:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-500"
                                }`}
                        >
                            {currency.symbol} {currency.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropdownCurrency;
