import { Category } from "@/types/category";

export const CategoryTableRow = ({ category, isAction = false }: { category: Category, isAction?: boolean }) => (
    <tr className="hover:bg-gray-50 dark:hover:bg-[var(--color-dark-border-default)]">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--color-foreground)] dark:text-[var(--color-dark-foreground)]">
            {category.name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
            <span
                className="inline-block w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: category.color }}
            ></span>
            <span className="text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)]">
                {category.color}
            </span>
        </td>
        {isAction && <td className="px-6 py-4 text-[var(--color-text-muted-light)] dark:text-[var(--color-dark-text-muted)]"></td>}
    </tr>
);