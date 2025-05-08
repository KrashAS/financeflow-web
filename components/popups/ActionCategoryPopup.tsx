'use client';

import { POPUP_NAMES } from '@/constants/popupNames';
import useOnClickOutside from '@/lib/hooks/useOnClickOutside';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useRedux';
import { closePopup } from '@/lib/redux/features/popup/popupSlice';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Button } from '../ui/buttons/Button';
import Input from '../ui/inputs/Input';
import InputColor from '../ui/inputs/InputColor';


export const ActionCategoryPopup = () => {
    const { activePopup, title, description, payload, } = useAppSelector((state) => state.popup);
    const [name, setName] = useState(payload?.name);
    const [errorMessage, setErrorMessage] = useState("");
    const [color, setColor] = useState(`${payload?.color}`);
    const dispatch = useAppDispatch();
    const modalRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const deleteCategory = async (id: number) => {
        try {
            const res = await fetch("/api/expense-categories", {
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
            console.log("Category deleted");
        } catch (err) {
            console.error("deleteCategory", err);
        }
    };

    const editCategory = async (id: number, name: string, color: string) => {
        try {
            const res = await fetch("/api/expense-categories", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: id, name: name, color: color }),
            });

            if (!res.ok) {
                const { error } = await res.json();
                setErrorMessage(error || "Failed to update");
            } else {
                router.refresh()
                dispatch(closePopup());
            }

            const data = await res.json();
            console.log("Category updated:", data);
        } catch (err) {
            console.error("editCategory", err);
        }
    };

    useOnClickOutside(modalRef, () => dispatch(closePopup()));

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!payload?.id) return;

        if (activePopup === POPUP_NAMES.DELETE_CATEGORY) {
            deleteCategory(payload.id)
        }

        if (activePopup === POPUP_NAMES.EDIT_CATEGORY) {
            if (!name || !color) return;
            editCategory(payload.id, name, color)
        }
    };

    return (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/10 flex items-center justify-center p-3">
            <div ref={modalRef}
                className="bg-white dark:bg-dark rounded-2xl p-6 shadow-xl w-full max-w-sm">
                <h2 className="text-xl font-semibold text-center mb-2 text-gray-900">
                    {`${title}:`}
                    <span className="block">{`${payload?.name} ${payload?.createdAt}`}</span>
                </h2>
                <p className="text-sm text-center text-gray-600">{description}</p>
                <form onSubmit={handleSubmit}>
                    {activePopup === POPUP_NAMES.EDIT_CATEGORY && <div>
                        <Input type="text"
                            id="category-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label="Budget Name"
                            placeholder="Enter category"
                            isFocused={true}
                            required />
                        <InputColor
                            value={color}
                            onChange={setColor}
                            classNameWrapper="mb-4"
                        />

                    </div>}
                    {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                    <div className="flex gap-4 justify-between mt-6">
                        <Button
                            type="submit"
                            className={`px-4 py-2 rounded-xl btn ${activePopup === POPUP_NAMES.DELETE_CATEGORY ? "btn-warning" : "btn-primary"}`}
                            title={activePopup === POPUP_NAMES.DELETE_CATEGORY ? "Delete" : "Confirm"}
                        />
                        <Button
                            type="button"
                            onClickButton={() => dispatch(closePopup())}
                            className="px-4 py-2 rounded-xl btn btn-secondary"
                            title="Cancel"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};
