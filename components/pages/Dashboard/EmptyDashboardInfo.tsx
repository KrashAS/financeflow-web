import { Card } from "@/components/ui/cards/Card"

const EmptyDashboardInfo = () => {
    return (
        <Card className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Welcome to FinanceFlow 👋</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
                To start tracking your finances:
            </p>
            <ul className="text-left list-disc list-inside text-gray-700 dark:text-gray-400 mb-6">
                <li>Add your first <strong>transaction</strong></li>
                <li>Set a <strong>financial goal</strong></li>
                <li>Return here to see your stats</li>
            </ul>
            <div className="flex justify-center gap-4">
                <button>Add first transaction</button>
                <button >Create goal</button>
            </div>
        </Card>
    )
}

export default EmptyDashboardInfo