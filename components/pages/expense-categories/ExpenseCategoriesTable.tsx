"use client";

import DropdownActions from "@/components/ui/dropdowns/DropdownActions";
import { TableBody } from "@/components/ui/tables/TableBody";
import { TableHeader } from "@/components/ui/tables/TableHeader";
import { TableWrapper } from "@/components/ui/tables/TableWrapper";
import { POPUP_NAMES } from "@/constants/popupNames";
import { useAppDispatch } from "@/lib/hooks/useRedux";
import { openPopup } from "@/lib/redux/features/popup/popupSlice";
import { Category } from "@/types/category";
import { CategoryTableRow } from "./ExpenseCategoryTableRow";

interface Props {
    categories: Category[];
}

export default function ExpenseCategoriesTable({ categories }: Props) {
    const dispatch = useAppDispatch();



    function clickOnEdit(id: number): void {
        const category = categories.find((el) => el.id === id);
        if (!category) return;

        dispatch(openPopup({
            activePopup: POPUP_NAMES.EDIT_CATEGORY,
            title: "Edit Category",
            description: "Update your category details.",
            payload: {
                id: category.id,
                name: category.name,
                color: category.color,
                createdAt: category.createdAt,
            }
        }));
    }

    function clickOnDelete(id: number): void {
        const category = categories.find((b) => b.id === id);
        if (!category) return;

        dispatch(openPopup({
            activePopup: POPUP_NAMES.DELETE_CATEGORY,
            title: "Delete Category",
            description: "Are you sure you want to delete this category?",
            payload: {
                id: category.id,
                name: category.name,
                color: category.color,
                createdAt: category.createdAt,
            }
        }));
    }

    if (!categories.length) {
        return <p className="text-gray-500">No categories found.</p>;
    }

    return (
        <div className="relative">
            <div className="overflow-x-auto">
                <TableWrapper>
                    <TableHeader
                        columns={[
                            { title: "Name" },
                            { title: "Color" }]}
                        isAction={true} />
                    <TableBody>
                        {categories.map((cat) => (
                            <CategoryTableRow key={cat.id}
                                category={cat}
                                isAction={true} />
                        ))}
                    </TableBody>
                </TableWrapper>
            </div>
            <div className="absolute z-10 top-[50px] right-2">
                {categories?.map((category, index) => <DropdownActions
                    key={category.id}
                    className="mb-[22px]"
                    onEdit={() => clickOnEdit(category.id)}
                    onDelete={() => clickOnDelete(category.id)}
                    openUp={categories.length > 3 && index === categories.length - 1}
                />)}
            </div>
        </div>
    );
}
