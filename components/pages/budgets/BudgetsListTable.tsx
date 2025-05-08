"use client";

import DropdownActions from "@/components/ui/dropdowns/DropdownActions";
import { POPUP_NAMES } from "@/constants/popupNames";
import { useAppDispatch } from "@/lib/hooks/useRedux";
import { openPopup } from "@/lib/redux/features/popup/popupSlice";
import { Budget } from "@/types/budget";

interface BudgetsListProps {
    budgets: Budget[];
}

export default function BudgetsListTable({ budgets }: BudgetsListProps) {
    const dispatch = useAppDispatch();
    const currencySymbol = budgets[0]?.currencySymbol || "";

    function clickOnEdit(id: number): void {
        const budget = budgets.find((b) => b.id === id);
        if (!budget) return;

        dispatch(openPopup({
            activePopup: POPUP_NAMES.EDIT_BUDGET,
            title: "Edit Budget",
            description: "Update your budget details.",
            payload: {
                id: budget.id,
                name: budget.name,
                amount: budget.amount,
                createdAt: budget.createdAt,
                currencySymbol: budget.currencySymbol
            }
        }));
    }

    function clickOnDelete(id: number): void {
        const budget = budgets.find((b) => b.id === id);
        if (!budget) return;

        dispatch(openPopup({
            activePopup: POPUP_NAMES.DELETE_BUDGET,
            title: "Delete Budget",
            description: "Are you sure you want to delete this budget?",
            payload: {
                id: budget.id,
                name: budget.name,
                amount: budget.amount,
                createdAt: budget.createdAt,
            }
        }));
    }

    if (budgets.length === 0) {
        return <p className="text-gray-500 dark:text-[var(--color-dark-text-muted)]">No budgets yet.</p>;
    }

    return (
        <div className="relative ">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[var(--color-border-default)] dark:divide-[var(--color-dark-border-default)] bg-[var(--color-bg)] dark:bg-[var(--color-dark-bg)] rounded-md overflow-hidden">
                    <thead className="bg-gray-100 dark:bg-[var(--color-dark-bg)]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-gray)] dark:text-[var(--color-dark-text-gray)] uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-[var(--color-text-gray)] dark:text-[var(--color-dark-text-gray)] uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-gray)] dark:text-[var(--color-dark-text-gray)] uppercase tracking-wider">
                                Created At
                            </th>
                            <th className="px-6 py-3 text-[var(--color-text-gray)] dark:text-[var(--color-dark-text-gray)] uppercase tracking-wider"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-border-default)] dark:divide-[var(--color-dark-border-default)]">
                        {budgets.map((budget) => (
                            <tr
                                key={budget.id}
                                className="hover:bg-gray-50 dark:hover:bg-[var(--color-dark-border-default)] transition-colors"
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--color-foreground)] dark:text-[var(--color-dark-foreground)]">
                                    {budget.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)] text-right">
                                    {`${budget.amount.toFixed(2)} ${currencySymbol}`}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text-muted-light)] dark:text-[var(--color-dark-text-muted)]">
                                    {budget.createdAt}
                                </td>
                                <td className="px-6 py-4 text-[var(--color-text-muted-light)] dark:text-[var(--color-dark-text-muted)]"></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="absolute z-10 top-[50px] right-2">
                {budgets?.map((budget, index) => <DropdownActions
                    key={budget.id}
                    className="mb-[21px]"
                    onEdit={() => clickOnEdit(budget.id)}
                    onDelete={() => clickOnDelete(budget.id)}
                    openUp={budgets.length > 3 && index === budgets.length - 1}
                />)}
            </div>
        </div>
    );
}

