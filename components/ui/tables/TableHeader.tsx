type TableHeaderProps = {
    columns: { title: string; align?: "left" | "right" }[];
    isAction?: boolean
};

export const TableHeader = ({ columns, isAction = false }: TableHeaderProps) => (
    <thead className="bg-gray-100 dark:bg-[var(--color-dark-bg)]">
        <tr>
            {columns.map(({ title, align = "left" }, idx) => (
                <th
                    key={idx}
                    className={`px-6 py-3 text-${align} text-xs font-semibold text-[var(--color-text-gray)] dark:text-[var(--color-dark-text-gray)] uppercase tracking-wider`}
                >
                    {title}
                </th>
            ))}
            {isAction && <th className="px-6 py-3"></th>}
        </tr>
    </thead>
);