"use client";

import DropdownActions from "@/components/ui/dropdowns/DropdownActions";
import { TableBody } from "@/components/ui/tables/TableBody";
import { TableHeader } from "@/components/ui/tables/TableHeader";
import { TableWrapper } from "@/components/ui/tables/TableWrapper";
import { POPUP_NAMES } from "@/constants/popupNames";
import { useAppDispatch } from "@/lib/hooks/useRedux";
import { openPopup } from "@/lib/redux/features/popup/popupSlice";
import { FormattedBudget } from "@/types/budget";
import { BudgetsTableRow } from "./BudgetsTableRow";

interface BudgetsListProps {
    budgets: FormattedBudget[];
}

export default function BudgetsTable({ budgets }: BudgetsListProps) {
    const dispatch = useAppDispatch();
    const currencySymbol = budgets[0]?.currencySymbol || "";

    function clickOnEdit(id: number): void {
        const budget = budgets.find((element) => element.id === id);
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
        const budget = budgets.find((element) => element.id === id);
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
        <div className="relative">
            <div className="overflow-x-auto">
                <TableWrapper>
                    <TableHeader
                        columns={[
                            { title: "Name" },
                            { title: "Amount", align: "right" },
                            { title: "Created At" },
                        ]}
                        isAction={true}
                    />
                    <TableBody>
                        {budgets.map((budget) => (
                            <BudgetsTableRow key={budget.id}
                                budget={budget}
                                currencySymbol={currencySymbol}
                                isAction={true} />
                        ))}
                    </TableBody>
                </TableWrapper>
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

