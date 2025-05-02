import WrapperForPage from "@/components/layout/WrapperForPage";
import BudgetsList from "@/components/pages/budgets/BudgetsList";
import { formatDate } from "@/lib/formatDate";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";


export default async function BudgetsPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        redirect("/auth/login");
    }

    const budgets = await prisma.budget.findMany({
        where: { userId: session.user.uid },
        orderBy: { createdAt: "desc" },
    });


    const formattedBudgets = budgets.map((b) => ({
        id: b.id.toString(),
        name: b.title,
        amount: b.amount,
        createdAt: formatDate(b.createdAt),
    }));

    return (
        <WrapperForPage>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">📊 Budgets</h1>
                    <Link
                        href="/budgets/new"
                        className="btn btn-primary px-4 py-2 rounded-md"
                    >+ Add Budget</Link>
                </div>
                <BudgetsList budgets={formattedBudgets} />
            </div>
        </WrapperForPage>
    );
}