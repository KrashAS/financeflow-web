"use client";

import { Button } from "@/components/ui/buttons/Button";

export default function AddBudgetButton() {
    const handleClick = () => {
        alert("Add Budget clicked");
    };

    return (
        <Button
            onClickButton={handleClick}
            className="btn btn-primary px-4 py-2 rounded-md"
            title="+ Add Budget"
        />

    );
}
