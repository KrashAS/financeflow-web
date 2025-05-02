import WrapperForPage from "@/components/layout/WrapperForPage";
import ExpenseCategoriesTable from "@/components/pages/expense-categories/ExpenseCategoriesTable";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function ExpenseCategoriesPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return null;

    const categories = await prisma.expenseCategory.findMany({
        where: { userId: session.user.uid },
        orderBy: { createdAt: "desc" },
    });

    return (
        <WrapperForPage>
            <div className="p-6 max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">📂 Expense Categories</h1>
                    <Link
                        href="/expense-categories/new"
                        className="btn btn-primary px-4 py-2 rounded-md"
                        title="+ Add Category"
                    >
                        + Add Category
                    </Link>
                </div>

                <ExpenseCategoriesTable categories={categories} />
            </div>
        </WrapperForPage>
    );
}