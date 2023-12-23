import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/search-input";
import { getRecipes } from "@/actions/get-recipes";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { RecipesList } from "@/components/recipes-list";

interface SearchPageProps {
    searchParams: {
        title: string;
        categoryId: string;
    }
}

const SearchPage = async ({
    searchParams
}: SearchPageProps) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        },
    });

    const recipes = await getRecipes({
        userId,
        ...searchParams,
    });

    return (
        <div className="h-full">
            <div className="px-6 pt-6 md:hidden md:mb-0 block">
                <SearchInput />
            </div>
            <div className="p-6 space-y-4">
                <Categories items={categories} />
                <RecipesList items={recipes} from_="manage" />
            </div>
        </div>
    );
};

export default SearchPage;
