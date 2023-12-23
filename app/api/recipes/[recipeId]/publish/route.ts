import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
    req: Request,
    { params }: { params: { recipeId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const recipe = await db.recipe.findUnique({
            where: {
                id: params.recipeId,
                userId,
            },
            include: {
                ingredients: true,
            },
        });

        if (!recipe) {
            return new NextResponse("Not found", { status: 404 });
        }

        if (
            !recipe.title ||
            !recipe.description ||
            !recipe.categoryId ||
            !recipe.ingredients ||
            !recipe.instructions ||
            !recipe.time ||
            !recipe.difficulty ||
            !recipe.imageUrl
        ) {
            return new NextResponse("Missing required fields", { status: 401 });
        }

        const publishedRecipe = await db.recipe.update({
            where: {
                id: params.recipeId,
                userId,
            },
            data: {
                isPublish: true,
            },
        });

        return NextResponse.json(publishedRecipe);
    } catch (error) {
        console.log("[RECIPE_ID_PUBLISH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
