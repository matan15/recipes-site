import { Logo } from "@/components/logo";
import { SearchInput } from "@/components/search-input";
import { redirect } from "next/navigation";
import { SearchCategoryInput } from "./search-category-input";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { CategoryList } from "./category-list";

export const Sidebar = async () => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        },
    });

    return (
        <div dir="rtl" className="h-full border-l flex flex-col overflow-y-auto bg-white shdow-sm">
            <div className="pt-6 flex justify-center items-center">
                <Logo />
            </div>
            <div className="flex flex-col w-full">
                <div className="p-6">
                    <p className="pb-4">סנן לפי שם המתכון</p>
                    <SearchInput />
                </div>
                <div className="p-6">
                    <p>סנן לפי קטגוריה</p>
                    <SearchCategoryInput />
                    <CategoryList items={categories} />
                </div>
            </div>
        </div>
    );
}