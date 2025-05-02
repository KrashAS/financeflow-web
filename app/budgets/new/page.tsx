import WrapperForPage from "@/components/layout/WrapperForPage";
import BudgetForm from "@/components/pages/budgets/BudgetForm";

export default async function NewBudgetPage() {

    return (
        <WrapperForPage>
            <div className="p-6 max-w-xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">➕ Add New Budget</h1>
                <BudgetForm />
            </div>
        </WrapperForPage>
    );
}