import WrapperForPage from "@/components/layout/WrapperForPage";
import ExpenseCategoryForm from "@/components/pages/expense-categories/ExpenseCategoryForm";


export default function NewExpenseCategoryPage() {
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