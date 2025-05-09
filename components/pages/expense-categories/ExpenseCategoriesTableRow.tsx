import { TableCell } from "@/components/ui/tables/TableCell";
import { TableRow } from "@/components/ui/tables/TableRow";
import { Category } from "@/types/category";

interface IProps {
    category: Category;
    isAction?: boolean
};

export const ExpenseCategoriesTableRow = ({ category, isAction = false }: IProps) => (
    <TableRow>
        <TableCell bold>{category.name}</TableCell>
        <TableCell>
            <span
                className="inline-block w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: category.color }}
            ></span>
            <span className="text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)]">
                {category.color}
            </span>
        </TableCell>
        {isAction && <TableCell />}
    </TableRow>
);