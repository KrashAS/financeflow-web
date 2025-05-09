import { TableCell } from "@/components/ui/tables/TableCell";
import { TableRow } from "@/components/ui/tables/TableRow";
import { Budget } from "@/types/budget";

interface IProps {
    budget: Budget;
    currencySymbol: string;
    isAction?: boolean
};

export const BudgetsTableRow = ({ budget, currencySymbol, isAction = false }: IProps) => (
    <TableRow
    >
        <TableCell bold>{budget.name}</TableCell>
        <TableCell align="right"
            muted>
            {`${budget.amount.toFixed(2)} ${currencySymbol}`}
        </TableCell>
        <TableCell light>{budget.createdAt}</TableCell>
        {isAction && <TableCell />}
    </TableRow>
);