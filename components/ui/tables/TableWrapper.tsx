type TableWrapperProps = {
    children: React.ReactNode;
};

export const TableWrapper = ({ children }: TableWrapperProps) => (
    <table className="min-w-full divide-y divide-[var(--color-border-default)] dark:divide-[var(--color-dark-border-default)] bg-[var(--color-bg)] dark:bg-[var(--color-dark-bg)] rounded-md overflow-hidden">
        {children}
    </table>
);