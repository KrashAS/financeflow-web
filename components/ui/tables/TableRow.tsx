import React from "react";

interface Props extends React.HTMLAttributes<HTMLTableRowElement> {
    children: React.ReactNode;
}

export const TableRow = ({ children, className = "", ...rest }: Props) => {
    const baseClass =
        "hover:bg-gray-50 dark:hover:bg-[var(--color-dark-border-default)] hover:transition-colors";

    return (
        <tr className={`${baseClass} ${className}`}
            {...rest}>
            {children}
        </tr>
    );
};
