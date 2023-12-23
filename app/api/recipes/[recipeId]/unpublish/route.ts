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
        });

        if (!recipe) {
            return new NextResponse("Not found", { status: 404 });
        }

        const unpublishedRecipe = await db.recipe.update({
            where: {
                id: params.recipeId,
                userId,
            },
            data: {
                isPublish: false,
            },
        });

        return NextResponse.json(unpublishedRecipe);
    } catch (error) {
        console.log("[RECIPE_ID_UNPUBLISH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
