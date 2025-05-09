import React from "react";

interface Props extends React.TdHTMLAttributes<HTMLTableCellElement> {
    align?: "left" | "right";
    muted?: boolean;
    light?: boolean;
    bold?: boolean;
}

export const TableCell = ({
    align = "left",
    muted,
    light,
    bold,
    className = "",
    children,
    ...rest
}: Props) => {
    let colorClass = "text-[var(--color-foreground)] dark:text-[var(--color-dark-foreground)]";

    if (muted && !light) {
        colorClass = "text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)]";
    } else if (light) {
        colorClass = "text-[var(--color-text-muted-light)] dark:text-[var(--color-dark-text-muted)]";
    }

    const baseClass = `px-6 py-4 whitespace-nowrap text-sm ${align === "right" ? "text-right" : ""} ${bold ? "font-medium" : ""
        }`;

    return (
        <td className={`${baseClass} ${colorClass} ${className}`}
            {...rest}>
            {children}
        </td>
    );
};
