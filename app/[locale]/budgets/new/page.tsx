import WrapperForPage from "@/components/layout/WrapperForPage";
import UnauthorizedMessage from "@/components/pages/auth/UnauthorizedMessage";
import BudgetForm from "@/components/pages/budgets/BudgetForm";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";

export default async function NewBudgetPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return <UnauthorizedMessage />;
    return (
        <WrapperForPage>
            <div className="p-6 max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">➕ Add New Budget</h1>
                <BudgetForm />
            </div>
        </WrapperForPage>
    );
}