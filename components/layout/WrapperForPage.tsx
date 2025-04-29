'use client'

import StoreProvider from "@/app/StoreProvider";

export default function WrapperForPage({ children }: { children: React.ReactNode }) {
    return (
        <StoreProvider>
            <main className="p-0 pt-8 sm:p-4 sm:pt-6 max-w-[1400px] mx-auto">{children}</main>
        </StoreProvider>
    );
}