import { Category, Recipe } from "@prisma/client";

import { RecipeCard } from "@/components/recipe-card";

type RecipeWithCategory = Recipe & {
    category: Category | null;
    ingredients: { id: string }[];
};

interface RecipesListProps {
    items: RecipeWithCategory[];
    from_: string;
}

export const RecipesList = ({ items, from_ }: RecipesListProps) => {
    return (
        <div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
                {items.map((item) => (
                    <RecipeCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        imageUrl={item.imageUrl}
                        numberOfIngredients={item.ingredients.length}
                        duration={item.time!}
                        difficulty={item.difficulty!}
                        category={item?.category?.name!}
                        from_={from_}
                    />
                ))}
            </div>
            {items.length === 0 && (
                <div className="text-center text-sm text-muted-foreground mt-10">
                    לא נמצאו מתכונים.
                </div>
            )}
        </div>
    );
};
