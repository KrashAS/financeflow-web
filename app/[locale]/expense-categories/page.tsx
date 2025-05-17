import WrapperForPage from "@/components/layout/WrapperForPage";
import UnauthorizedMessage from "@/components/pages/auth/UnauthorizedMessage";
import ExpenseCategoriesTable from "@/components/pages/expense-categories/ExpenseCategoriesTable";
import { authOptions } from "@/lib/auth/authOptions";
import { formatDate } from "@/lib/formatDate";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function ExpenseCategoriesPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return <UnauthorizedMessage />;

    const categories = await prisma.expenseCategory.findMany({
        where: { userId: session.user.uid },
        orderBy: { createdAt: "desc" },
    });

    const formattedCategories = categories.map(({ createdAt, ...rest }) => ({
        ...rest,
        createdAt: formatDate(createdAt),
    }));

    return (
        <WrapperForPage>
            <div className="p-6 max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">📂 Expense Categories</h1>
                    <Link
                        href="/expense-categories/new"
                        className="btn btn-primary px-4 py-2 rounded-md"
                    >
                        <span className="xs:hidden text-lg">＋</span>
                        <span className="hidden xs:inline">+ Add Category</span>
                    </Link>
                </div>

                <ExpenseCategoriesTable categories={formattedCategories} />
            </div>
        </WrapperForPage>
    );
}