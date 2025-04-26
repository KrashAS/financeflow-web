export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="p-0 pt-4 sm:p-4 max-w-[1400px] mx-auto">{children}</main>

    );
}