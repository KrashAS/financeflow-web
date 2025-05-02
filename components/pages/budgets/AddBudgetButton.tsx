"use client";

import Link from "next/link";

export default function AddBudgetButton() {


    return (
        <Link
            href="/budgets/new"
            className="btn btn-primary px-4 py-2 rounded-md"
            title="+ Add Budget"
        >+ Add Budget</Link>
    );
}
