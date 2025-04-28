import WrapperForPage from "@/components/layout/WrapperForPage";
import AddBudgetButton from "@/components/pages/budgets/AddBudgetButton";
import BudgetsList from "@/components/pages/budgets/BudgetsList";
import { formatDate } from "@/lib/formatDate";

import { prisma } from "@/lib/prisma";

export default async function BudgetsPage() {
    const budgets = await prisma.budget.findMany({
        orderBy: { createdAt: "desc" },
    });

    const formattedBudgets = budgets.map((budget) => ({
        id: budget.id.toString(),
        name: budget.title,
        amount: budget.amount,
        createdAt: formatDate(budget.createdAt),
    }));

    return (
        <WrapperForPage>
            <div className="p-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">📊 Budgets</h1>
                    <AddBudgetButton />
                </div>
                <BudgetsList budgets={formattedBudgets} />
            </div>
        </WrapperForPage>
    );
}