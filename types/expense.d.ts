import { Category } from "./category.d.ts";

export interface Expense {
    id: number;
    title: string;
    amount: number;
    currency: string;
    createdAt: string;
    category: Category;
}
