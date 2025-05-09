import { TableCell } from "@/components/ui/tables/TableCell";
import { TableRow } from "@/components/ui/tables/TableRow";
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
    <TableRow>
        <TableCell bold>{expense.title}</TableCell>

        <TableCell align="right"
            muted>
            {`${expense.amount.toFixed(2)} (${expense.currency}, ${symbol})`}
        </TableCell>

        <TableCell className="flex items-center gap-2"
            muted>
            <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: expense.category.color }}
            ></span>
            {expense.category.name}
        </TableCell>

        <TableCell light>{expense.createdAt}</TableCell>

        {isAction && <TableCell />}
    </TableRow>
);