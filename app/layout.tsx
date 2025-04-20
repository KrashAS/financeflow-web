import Header from "@/components/layout/Header";
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
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen transition-colors ${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Header />
                {children}
            </body>
        </html>
    );
}
