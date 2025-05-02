import WrapperForPage from "@/components/layout/WrapperForPage";

export default function ExpensesPage() {
    return (
        <WrapperForPage>
            <div className="p-6 max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">💸 Expenses</h1>
                <p className="text-gray-600 dark:text-[var(--color-dark-text-muted)]">
                    Expenses overview coming soon...
                </p>
            </div>
        </WrapperForPage>
    );
}