import Header from "@/components/layout/Header";
import SessionProviderWrapper from "@/components/layout/SessionProviderWrapper";
import PopupsContainer from "@/components/popups/PopupsContainer";
import { SUPPORTED_LOCALES } from "@/i18n/settings";
import { dir } from 'i18next';
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { notFound } from "next/navigation";
import StoreProvider from "../StoreProvider";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export function generateStaticParams() {
    return SUPPORTED_LOCALES.map(locale => ({ locale }));
}

export const metadata: Metadata = {
    title: "Finance Flow",
    description: "Simple finance tracker",
    icons: {
        icon: "/favicon/logo-32x32.png",
    },
};

export default async function RootLayout(props: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>
}) {
    const { locale } = await props.params;
    const { children } = props;

    if (!SUPPORTED_LOCALES.includes(locale)) {
        notFound();
    }
    return (
        <html lang={locale}
            dir={dir(locale)}>
            <body
                className={`bg-white text-black dark:bg-(--color-dark-bg) dark:text-white min-h-screen ${geistSans.variable} antialiased`}
            >
                <StoreProvider>
                    <SessionProviderWrapper>
                        <Header />
                    </SessionProviderWrapper>
                    <PopupsContainer />

                    {children}
                </StoreProvider>
            </body>
        </html>
    );
}
