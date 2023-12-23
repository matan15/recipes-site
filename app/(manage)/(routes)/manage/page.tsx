import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";



const RecipesPage = async () => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const recipes = await db.recipe.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            ingredients: true,
            category: true
        }
    });

    return (
        <div className="p-6 h-screen">
            <DataTable columns={columns} data={recipes} />
        </div>
    );
}

export default RecipesPage;