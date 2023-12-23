"use client";

import { Category } from "@prisma/client"
import { CategoryItem } from "./category-item";
import { useSearchParams } from "next/navigation";

interface CategoryListProps {
    items: Category[];
}

export const CategoryList = ({
    items,
}: CategoryListProps) => {
    const searchParams = useSearchParams();
    const searchCategory = searchParams.get("searchCategory");

    if (searchCategory) {
        items = items.filter((category) => category.name === searchCategory);
    }

    console.log(items);

    return (
        <div dir="rtl" className="flex flex-col items-center gap-y-2 overflow-y-auto pb-2 pt-3 overflow-x-hidden">
            {items.length !== 0 && items.map((item) => (
                <CategoryItem
                    key={item.id}
                    label={item.name}
                    value={item.id}
                />
            ))}
            {items.length === 0 && (
                <p className="text-center">
                    אין קטגוריות תואמות לחיפוש
                </p>
            )}
        </div>
    )
}