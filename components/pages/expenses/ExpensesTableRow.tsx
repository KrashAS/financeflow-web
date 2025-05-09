import { Expense } from "@/types/expense";

interface IProps {
    expense: Expense;
    symbol: string;
    isAction?: boolean
};

export const ExpensesTableRow = ({
    expense,
    symbol,
    isAction = false
}: IProps) => (
    <tr className="hover:bg-gray-50 dark:hover:bg-[var(--color-dark-border-default)]">
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
        {isAction && <td className="px-6 py-4 text-[var(--color-text-muted-light)] dark:text-[var(--color-dark-text-muted)]"></td>}
    </tr>
);