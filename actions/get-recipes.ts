import { db } from "@/lib/db";
import { Category, Recipe } from "@prisma/client";

type Recipes = Recipe & {
    category: Category | null;
    ingredients: { id: string }[];
};

type GetRecipes = {
    userId: string;
    title?: string;
    categoryId?: string;
};

export const getRecipes = async ({
    userId,
    title,
    categoryId
}: GetRecipes): Promise<Recipes[]> => {
    try {
        const recipesResult = await db.recipe.findMany({
            where: {
                isPublish: true,
                title: {
                    contains: title,
                },
                categoryId: categoryId,
                userId: userId
            },
            include: {
                category: true,
                ingredients: {
                    select: {
                        id: true,
                    }
                }
            },
            orderBy: {
                createdAt: "desc",
            }
        });

        
        const recipes: Recipes[] = await Promise.all(
            recipesResult.map(async recipe => {
                return  {
                    ...recipe
                };
            })
        );

        return recipes;

    } catch(error) {
        console.log("[GET_RECIPES]", error);
        return [];
    }
}