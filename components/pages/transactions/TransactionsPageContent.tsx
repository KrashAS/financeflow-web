"use client";

import { TableBody } from "@/components/ui/tables/TableBody";
import { TableHeader } from "@/components/ui/tables/TableHeader";
import { TableWrapper } from "@/components/ui/tables/TableWrapper";
import { ExpenseCategory, Transaction } from "@prisma/client";
import TransactionsEmpty from "./TransactionsEmpty";
import { TransactionsTableRow } from "./TransactionsTableRow";

type Props = {
    transactions: (Transaction & { category: ExpenseCategory | null })[];
};

export default function TransactionsPageContent({ transactions }: Props) {
    if (!transactions.length) {
        return <TransactionsEmpty />;
    }
    return (
        <div className="space-y-4">
            <div className="overflow-x-auto">
                <TableWrapper>
                    <TableHeader
                        columns={[
                            { title: "Date" },
                            { title: "Title" },
                            { title: "Type" },
                            { title: "Category" },
                            { title: "Amount", align: "right" },
                        ]}
                    />
                    <TableBody>
                        {transactions.map((element) => (
                            <TransactionsTableRow key={element.id}
                                transaction={element}
                            />
                        ))}
                    </TableBody>
                </TableWrapper>
            </div>
        </div>
    );
}
