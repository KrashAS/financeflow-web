type TableBodyProps = {
    children: React.ReactNode;
};

export const TableBody = ({ children }: TableBodyProps) => (
    <tbody className="bg-white dark:bg-[var(--color-dark-bg)] divide-y divide-[var(--color-border-default)] dark:divide-[var(--color-dark-border-default)]">
        {children}
    </tbody>
);