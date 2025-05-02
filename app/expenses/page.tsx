import WrapperForPage from "@/components/layout/WrapperForPage";
import ExpenseListTable from "@/components/pages/expenses/ExpenseListTable";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function ExpensesPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return null;

    const expenses = await prisma.expense.findMany({
        where: { userId: session.user.uid },
        include: { category: true },
        orderBy: { createdAt: "desc" },
    });

    const formattedExpenses = expenses.map((e) => ({
        id: e.id,
        title: e.title,
        amount: e.amount,
        createdAt: new Date(e.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
        }),
        category: {
            id: e.category.id,
            name: e.category.name,
            color: e.category.color,
        },
    }));
    return (
        <WrapperForPage>
            <div className="p-6 max-w-2xl mx-auto">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold mb-4">💸 Expenses</h1>
                    <Link
                        href="/expenses/new"
                        className="btn btn-primary px-4 py-2 rounded-md"
                    >+ Add Expenses</Link>
                </div>
                <ExpenseListTable expenses={formattedExpenses} />
            </div>
        </WrapperForPage >
    );
}