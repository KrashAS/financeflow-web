import Header from "@/components/layout/Header";
import SessionProviderWrapper from "@/components/layout/SessionProviderWrapper";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Finance Flow",
    description: "Simple finance tracker",
    icons: {
        icon: "/favicon/favicon_32x32.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`bg-white text-black dark:bg-(--color-dark-bg) dark:text-white min-h-screen transition-colors ${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <SessionProviderWrapper>
                    <Header />
                </SessionProviderWrapper>
                {children}
            </body>
        </html>
    );
}
