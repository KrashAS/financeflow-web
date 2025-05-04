interface IProps {
    symbol: string;
    totalBudget: number;
    totalExpenses: number;
    balance: number;
}

const SummaryCards = ({ symbol, totalBudget, totalExpenses, balance }: IProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">

            <div className="p-4 rounded-lg bg-blue-100 dark:bg-blue-900">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Total Budget</p>
                <p className="text-xl font-semibold text-blue-900 dark:text-blue-100">
                    {`${symbol} ${totalBudget.toFixed(2)}`}
                </p>
            </div>

            <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900">
                <p className="text-sm font-medium text-red-800 dark:text-red-200">Total Expenses</p>
                <p className="text-xl font-semibold text-red-900 dark:text-red-100">
                    {`-${symbol} ${totalExpenses.toFixed(2)}`}
                </p>
            </div>

            <div className={`p-4 rounded-lg ${balance <= 0 ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200" : "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"}`}>
                <p className="text-sm font-medium">Balance</p>
                <p className="text-xl font-semibold">
                    {`${symbol} ${balance.toFixed(2)}`}
                </p>
            </div>
        </div>
    )
}

export default SummaryCards