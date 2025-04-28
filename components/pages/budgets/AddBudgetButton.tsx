"use client";

export default function AddBudgetButton() {
    const handleClick = () => {
        alert("Add Budget clicked");
    };

    return (
        <button
            onClick={handleClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
            + Add Budget
        </button>
    );
}
