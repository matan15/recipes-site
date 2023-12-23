import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: { recipeId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const recipe = await db.recipe.findUnique({
            where: {
                id: params.recipeId,
                userId: userId
            },
            include: {
                ingredients: true
            }
        });

        if (!recipe) {
            return new NextResponse("Not found", { status: 404 })
        }

        const deletedRecipe = await db.recipe.delete({
            where: {
                id: params.recipeId,
            },
        });

        return NextResponse.json(deletedRecipe);
    } catch (error) {
        console.log("[RECIPE_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

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

        const recipe = await db.recipe.update({
            where: {
                id: recipeId,
                userId
            },
            data: {
                ...values,
            }
        });

        return NextResponse.json(recipe);
    } catch (error) {
        console.log("[RECIPE_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
