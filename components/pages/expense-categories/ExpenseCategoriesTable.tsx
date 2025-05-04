"use client";

interface Category {
    id: number;
    name: string;
    color: string;
}

interface Props {
    categories: Category[];
}

export default function ExpenseCategoriesTable({ categories }: Props) {
    if (!categories.length) {
        return <p className="text-gray-500">No categories found.</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--color-border-default)] dark:divide-[var(--color-dark-border-default)] bg-[var(--color-bg)] dark:bg-[var(--color-dark-bg)] rounded-md overflow-hidden">
                <thead className="bg-gray-100 dark:bg-[var(--color-dark-bg)]">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-gray)] dark:text-[var(--color-dark-text-gray)] uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-gray)] dark:text-[var(--color-dark-text-gray)] uppercase tracking-wider">
                            Color
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-[var(--color-dark-bg)] divide-y divide-[var(--color-border-default)] dark:divide-[var(--color-dark-border-default)]">
                    {categories.map((cat) => (
                        <tr key={cat.id}
                            className="hover:bg-gray-50 dark:hover:bg-[var(--color-dark-border-default)]">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--color-foreground)] dark:text-[var(--color-dark-foreground)]">
                                {cat.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className="inline-block w-4 h-4 rounded-full mr-2"
                                    style={{ backgroundColor: cat.color }}></span>
                                <span className="text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)]">{cat.color}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
