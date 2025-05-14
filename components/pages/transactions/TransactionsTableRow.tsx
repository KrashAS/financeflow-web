import { TableCell } from "@/components/ui/tables/TableCell";
import { TableRow } from "@/components/ui/tables/TableRow";
import { ExpenseCategory, Transaction } from "@prisma/client";

interface IProps {
    transaction: (Transaction & { category: ExpenseCategory | null });
    isAction?: boolean
};

export const TransactionsTableRow = ({ transaction, isAction = false }: IProps) => (
    <TableRow
    >
        <TableCell bold>{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
        <TableCell >
            {transaction.title}
        </TableCell>
        <TableCell >{transaction.type}</TableCell>
        <TableCell >{transaction.category?.name || "-"}</TableCell>
        <TableCell
            align="right">{transaction.amount.toFixed(2)} {transaction.currency}</TableCell>
        {isAction && <TableCell />}
    </TableRow>
);