"use client";

import DropdownActions from "@/components/ui/dropdowns/DropdownActions";
import { POPUP_NAMES } from "@/constants/popupNames";
import { useAppDispatch } from "@/lib/hooks/useRedux";
import { openPopup } from "@/lib/redux/features/popup/popupSlice";
import { Category } from "@/types/category";

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
                <table className="min-w-full divide-y divide-[var(--color-border-default)] dark:divide-[var(--color-dark-border-default)] bg-[var(--color-bg)] dark:bg-[var(--color-dark-bg)] rounded-md overflow-hidden">
                    <thead className="bg-gray-100 dark:bg-[var(--color-dark-bg)]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-gray)] dark:text-[var(--color-dark-text-gray)] uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-gray)] dark:text-[var(--color-dark-text-gray)] uppercase tracking-wider">
                                Color
                            </th>
                            <th className="px-6 py-3 text-[var(--color-text-gray)] dark:text-[var(--color-dark-text-gray)] uppercase tracking-wider"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-[var(--color-dark-bg)] divide-y divide-[var(--color-border-default)] dark:divide-[var(--color-dark-border-default)]">
                        {categories.map((cat) => (
                            <tr key={cat.id}
                                className="hover:bg-gray-50 dark:hover:bg-[var(--color-dark-border-default)]">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--color-foreground)] dark:text-[var(--color-dark-foreground)]">
                                    {cat.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className="inline-block w-4 h-4 rounded-full mr-2"
                                        style={{ backgroundColor: cat.color }}></span>
                                    <span className="text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)]">{cat.color}</span>
                                </td>
                                <td className="px-6 py-4 text-[var(--color-text-muted-light)] dark:text-[var(--color-dark-text-muted)]"></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="absolute z-10 top-[50px] right-2">
                {categories?.map((category, index) => <DropdownActions
                    key={category.id}
                    className="mb-[21px]"
                    onEdit={() => clickOnEdit(category.id)}
                    onDelete={() => clickOnDelete(category.id)}
                    openUp={categories.length > 3 && index === categories.length - 1}
                />)}
            </div>
        </div>
    );
}
