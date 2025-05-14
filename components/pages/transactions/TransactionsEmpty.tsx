const TransactionsEmpty = () => {
    return (
        <div className="p-6 rounded-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-md text-center text-gray-600 dark:text-gray-200 dark:shadow-[0_4px_12px_rgba(255,255,255,0.30)]">
            <p className="text-lg font-semibold mb-2">No transactions found</p>
            <p className="text-sm">
                You haven&apos;t added any expenses, incomes, or transfers yet.
            </p>
            <p className="text-sm mt-2">
                Click <strong>“+ Add Transaction”</strong> to get started!
            </p>
        </div>
    );
};

export default TransactionsEmpty;