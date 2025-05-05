export interface Transaction {
    id: number;
    userId: string;
    type: "income" | "expense";
    amount: number;
    createdAt: string;
}
