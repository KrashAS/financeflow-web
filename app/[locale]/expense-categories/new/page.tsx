import WrapperForPage from "@/components/layout/WrapperForPage";
import UnauthorizedMessage from "@/components/pages/auth/UnauthorizedMessage";
import ExpenseCategoryForm from "@/components/pages/expense-categories/ExpenseCategoryForm";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";


export default async function NewExpenseCategoryPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return <UnauthorizedMessage />;
    return (
        <WrapperForPage>
            <div className="p-6 max-w-xl mx-auto">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold mb-6">🎯 Add Expense Category</h1>
                </div>
                <ExpenseCategoryForm />
            </div>
        </WrapperForPage>
    );
}