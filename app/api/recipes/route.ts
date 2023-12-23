import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const { title } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const recipe = await db.recipe.create({
            data: {
                userId,
                title
            }
        });

        return NextResponse.json(recipe)
    } catch (error) {
        console.log("[RECIPES]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
