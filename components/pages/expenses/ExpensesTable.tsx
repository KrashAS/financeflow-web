"use client";

import DropdownActions from "@/components/ui/dropdowns/DropdownActions";
import { POPUP_NAMES } from "@/constants/popupNames";
import { useAppDispatch } from "@/lib/hooks/useRedux";
import { openPopup } from "@/lib/redux/features/popup/popupSlice";
import { Expense } from "@/types/expense";

interface Props {
    expenses: Expense[];
    symbol: string;
}

export default function ExpensesTable({ expenses, symbol }: Props) {
    const dispatch = useAppDispatch();

    function clickOnEdit(id: number): void {
        const expense = expenses.find((element) => element.id === id);
        if (!expense) return;

        dispatch(openPopup({
            activePopup: POPUP_NAMES.EDIT_EXPENSE,
            title: "Edit Expense",
            description: "Update your expense details.",
            payload: {
                id: expense.id,
                name: expense.title,
                amount: expense.amount,
                createdAt: expense.createdAt,
                currencySymbol: symbol
            }
        }));
    }

    function clickOnDelete(id: number): void {
        const expense = expenses.find((element) => element.id === id);
        if (!expense) return;

        dispatch(openPopup({
            activePopup: POPUP_NAMES.DELETE_EXPENSE,
            title: "Delete Expense",
            description: "Are you sure you want to delete this expense?",
            payload: {
                id: expense.id,
                name: expense.title,
                amount: expense.amount,
                createdAt: expense.createdAt,
            }
        }));
    }

    if (!expenses.length) {
        return <p className="text-gray-500">No expenses found.</p>;
    }

    return (
        <div className="relative">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[var(--color-border-default)] dark:divide-[var(--color-dark-border-default)] bg-[var(--color-bg)] dark:bg-[var(--color-dark-bg)] rounded-md overflow-hidden">
                    <thead className="bg-gray-100 dark:bg-[var(--color-dark-bg)]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-gray)] dark:text-[var(--color-dark-text-gray)] uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-[var(--color-text-gray)] dark:text-[var(--color-dark-text-gray)] uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-gray)] dark:text-[var(--color-dark-text-gray)] uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-gray)] dark:text-[var(--color-dark-text-gray)] uppercase tracking-wider">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-[var(--color-dark-bg)] divide-y divide-[var(--color-border-default)] dark:divide-[var(--color-dark-border-default)]">
                        {expenses.map((expense) => {
                            return (
                                <tr key={expense.id}
                                    className="hover:bg-gray-50 dark:hover:bg-[var(--color-dark-border-default)]">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--color-foreground)] dark:text-[var(--color-dark-foreground)]">
                                        {expense.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)]">
                                        {`${expense.amount.toFixed(2)} (${expense.currency}, ${symbol})`}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)] flex items-center gap-2">
                                        <span
                                            className="inline-block w-3 h-3 rounded-full"
                                            style={{ backgroundColor: expense.category.color }}
                                        ></span>
                                        {expense.category.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text-muted-light)] dark:text-[var(--color-dark-text-muted)]">
                                        {expense.createdAt}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="absolute z-10 top-[50px] right-2">
                {expenses?.map((element, index) => <DropdownActions
                    key={element.id}
                    className="mb-[21px]"
                    onEdit={() => clickOnEdit(element.id)}
                    onDelete={() => clickOnDelete(element.id)}
                    openUp={expenses.length > 3 && index === expenses.length - 1}
                />)}
            </div></div>
    );
}
