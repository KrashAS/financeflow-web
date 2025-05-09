import { Budget } from "@/types/budget";

interface IProps {
    budget: Budget;
    currencySymbol: string;
    isAction?: boolean
};

export const BudgetsTableRow = ({ budget, currencySymbol, isAction = false }: IProps) => (
    <tr
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
        {isAction && <td className="px-6 py-4 text-[var(--color-text-muted-light)] dark:text-[var(--color-dark-text-muted)]"></td>}
    </tr>
);