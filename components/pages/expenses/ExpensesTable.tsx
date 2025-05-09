"use client";

import DropdownActions from "@/components/ui/dropdowns/DropdownActions";
import { TableBody } from "@/components/ui/tables/TableBody";
import { TableHeader } from "@/components/ui/tables/TableHeader";
import { TableWrapper } from "@/components/ui/tables/TableWrapper";
import { POPUP_NAMES } from "@/constants/popupNames";
import { useAppDispatch } from "@/lib/hooks/useRedux";
import { openPopup } from "@/lib/redux/features/popup/popupSlice";
import { Expense } from "@/types/expense";
import { ExpenseTableRow } from "./ExpenseTableRow";

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
                <TableWrapper>
                    <TableHeader
                        columns={[
                            { title: "Title" },
                            { title: "Amount", align: "right" },
                            { title: "Category" },
                            { title: "Date" },
                        ]}
                        isAction={true}
                    />
                    <TableBody>
                        {expenses.map((expense) => (
                            <ExpenseTableRow key={expense.id}
                                expense={expense}
                                symbol={symbol}
                                isAction={true} />
                        ))}
                    </TableBody>
                </TableWrapper>
            </div>
            <div className="absolute z-10 top-[50px] right-2">
                {expenses?.map((element, index) => <DropdownActions
                    key={element.id}
                    className="mb-[21px]"
                    onEdit={() => clickOnEdit(element.id)}
                    onDelete={() => clickOnDelete(element.id)}
                    openUp={expenses.length > 3 && index === expenses.length - 1}
                />)}
            </div>
        </div>
    );
}
