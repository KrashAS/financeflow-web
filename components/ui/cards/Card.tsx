import { classNames } from "@/lib/classNames";
import { ReactNode } from "react";


type CardProps = {
    className?: string;
    children: ReactNode;
};

export function Card({ className, children }: CardProps) {
    return (
        <div
            className={classNames(
                "rounded-2xl bg-white shadow-sm dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800",
                className
            )}
        >
            {children}
        </div>
    );
}

export function CardContent({ className, children }: CardProps) {
    return <div className={classNames("p-4 md:p-6", className)}>{children}</div>;
}