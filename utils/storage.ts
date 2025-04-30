export const storage = {
    setItem: <T>(key: string, value: T): void => {
        if (typeof window === "undefined") return;
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error(`Error setting localStorage key “${key}”:`, e);
        }
    },

    getItem: <T>(key: string): T | null => {
        if (typeof window === "undefined") return null;
        try {
            const item = localStorage.getItem(key);
            if (!item || item === "undefined") return null;
            return JSON.parse(item) as T;
        } catch (e) {
            console.error(`Error parsing localStorage key “${key}”:`, e);
            return null;
        }
    },

    removeItem: (key: string): void => {
        if (typeof window === "undefined") return;
        localStorage.removeItem(key);
    },

    clearAll: (): void => {
        if (typeof window === "undefined") return;
        localStorage.clear();
    },
};
