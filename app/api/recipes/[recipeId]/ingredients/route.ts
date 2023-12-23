import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { Ingredient } from "@prisma/client";

export async function PATCH(
    req: Request,
    { params }: { params: { recipeId: string } }
) {
    try {
        const { userId } = auth();
        const { recipeId } = params;
        const values = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        } 

        const recipe = await db.recipe.findUnique({
            where: { id: recipeId },
            include: { ingredients: true }
        })

        if (!recipe) {
            return new NextResponse("Recipe not found", { status: 404 });
        }

        if (values.ingredients) {
            const updatedIngredients: Ingredient[] = values.ingredients;
            await db.recipe.update({
                where: { id: recipeId },
                data: {
                    ingredients: {
                        deleteMany: {},
                        create: updatedIngredients,
                    },
                },
            });

            recipe.ingredients = updatedIngredients;
        }


        return NextResponse.json(recipe);
    } catch (error) {
        console.log("[RECIPE_ID.INGREDIENTS]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
