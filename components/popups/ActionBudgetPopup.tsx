'use client';

import { POPUP_NAMES } from '@/constants/popupNames';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useRedux';
import { closePopup } from '@/lib/redux/features/popup/popupSlice';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/buttons/Button';
import Input from '../ui/inputs/Input';
import PopupWrapper from './PopupWrapper';


export const ActionBudgetPopup = () => {
    const { activePopup, title, description, payload, } = useAppSelector((state) => state.popup);
    const [name, setName] = useState(payload?.name);
    const [errorMessage, setErrorMessage] = useState("");
    const [amount, setAmount] = useState(`${payload?.amount}`);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const deleteBudget = async (id: number) => {
        try {
            const res = await fetch("/api/budgets", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: id }),
            });

            if (!res.ok) {
                const { error } = await res.json();
                setErrorMessage(error || "Failed to delete");
            } else {
                router.refresh()
                dispatch(closePopup());
            }
        } catch (err) {
            console.error("deleteBudget", err);
        }
    };

    const editBudget = async (id: number, title: string, amount: number) => {
        try {
            const res = await fetch("/api/budgets", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: id, title: title, amount: amount }),
            });

            if (!res.ok) {
                const { error } = await res.json();
                setErrorMessage(error || "Failed to update");
            } else {
                router.refresh()
                dispatch(closePopup());
            }

            /*  const data = await res.json(); */

        } catch (err) {
            console.error("editBudget", err);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!payload?.id) return;

        if (activePopup === POPUP_NAMES.DELETE_BUDGET) {
            deleteBudget(payload.id)
        }

        if (activePopup === POPUP_NAMES.EDIT_BUDGET) {
            if (!name || !amount) return;
            editBudget(payload.id, name, +amount)
        }
    };

    return (
        <PopupWrapper>
            <h2 className="text-xl font-semibold text-center mb-2 text-gray-900">
                {`${title}:`}
                <span className="block">{`${payload?.name} ${payload?.createdAt}`}</span>
            </h2>
            <p className="text-sm text-center text-gray-600">{description}</p>
            <form onSubmit={handleSubmit} >
                {activePopup === POPUP_NAMES.EDIT_BUDGET && <div>
                    <Input type="text"
                        id="budget-name"
                        classNameWrapper="mt-3"
                        classNameLabel="text-black"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        label="Budget Name"
                        placeholder="Enter the income name"
                        isFocused={true}
                        required />
                    <Input type="number"
                        id="budget-amount"
                        classNameWrapper="mt-3"
                        classNameLabel="text-black"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        label={`Amount${payload?.currencySymbol ? `, ${payload.currencySymbol}` : ""}`}
                        placeholder="Enter the income amount"
                        required />

                </div>}
                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                <div className="flex gap-4 justify-between mt-6">
                    <Button
                        type="submit"
                        className={`px-4 py-2 rounded-xl btn ${activePopup === POPUP_NAMES.DELETE_BUDGET ? "btn-warning" : "btn-primary"}`}
                        title={activePopup === POPUP_NAMES.DELETE_BUDGET ? "Delete" : "Confirm"}
                    />
                    <Button
                        type="button"
                        onClickButton={() => dispatch(closePopup())}
                        className="px-4 py-2 rounded-xl btn btn-secondary"
                        title="Cancel"
                    />
                </div>
            </form>
        </PopupWrapper>

    );
};
