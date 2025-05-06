import Link from "next/link"

const EmptyDashboardInfo = () => {
    return (
        <div className="max-w-xl mx-auto mt-16 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Welcome to FinanceFlow!
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
                This is your personal dashboard where you’ll track budgets, expenses, and monitor your financial trends.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
                To get started, create your first budget. Once you’ve added a budget, you’ll be able to track your spending and view helpful insights.
            </p>
            <Link
                href="/budgets/new"
                className="inline-block px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Create Budget
            </Link>
        </div>
    )
}

export default EmptyDashboardInfo