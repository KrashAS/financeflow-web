import WrapperForPage from "@/components/layout/WrapperForPage";
import { getServerSession } from "next-auth";
import ExpenseMultiForm from "@/components/pages/expenses/ExpenseMultiForm";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function NewExpensePage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return null;

    const categories = await prisma.expenseCategory.findMany({
        where: { userId: session.user.uid },
        orderBy: { createdAt: "asc" },
    });

    return (
        <WrapperForPage>
            <div className="p-6 max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">➕ Add Multiple Expenses</h1>
                <ExpenseMultiForm categories={categories} />
            </div>
        </WrapperForPage>
    );
}