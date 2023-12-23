import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Info, Timer, Utensils } from "lucide-react";
import { redirect } from "next/navigation";

import { Bunner } from "@/components/banner";

import { TitleForm } from "./_components/title-form";
import { InstructionsForm } from "./_components/instractions-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { DescriptionForm } from "./_components/description-form";
import { DifficultyForm } from "./_components/difficulty-form";
import { TimeForm } from "./_components/time-form";
import { IngredientForm } from "./_components/ingredient-form";
import { Actions } from "./_components/actions";

const RecipeIdPage = async ({ params }: { params: { recipeId: string } }) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/recipes");
    }

    const recipe = await db.recipe.findUnique({
        where: {
            id: params.recipeId,
        },
        include: {
            ingredients: true,
        },
    });

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        },
    });

    if (!recipe) {
        return redirect("/recipes");
    }

    const requiredFields = [
        recipe.title,
        recipe.instructions,
        recipe.time,
        recipe.difficulty,
        recipe.categoryId,
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    const isComplete = requiredFields.every(Boolean);

    return (
        <div className="min-h-screen">
            {!recipe.isPublish && (
                <Bunner
                    label="המתכון הזה לא מפורסם. משתמשים לא יראו מתכון זה באתר."
                />
            )}
            <div className="p-6" dir="rtl">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-medium">עריכת המתכון</h1>
                        <span className="text-sm text-slate-700">
                            השלם את כל השדות {completionText}
                        </span>
                    </div>
                    <Actions 
                        disabled={!isComplete}
                        recipeId={params.recipeId}
                        isPublished={recipe.isPublish}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={Info} />
                            <h2 className="text-xl">פרטים כלליים</h2>
                        </div>
                        <ImageForm initialData={recipe} recipeId={recipe.id} />
                        <TitleForm initialData={recipe} recipeId={recipe.id} />
                        <DescriptionForm
                            initialData={recipe}
                            recipeId={recipe.id}
                        />

                        <CategoryForm
                            initialData={recipe}
                            recipeId={recipe.id}
                            options={categories.map((category) => ({
                                label: category.name,
                                value: category.id,
                            }))}
                        />
                    </div>
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={Utensils} />
                                <h2 className="text-xl">מצרכים ואופן הכנה</h2>
                            </div>
                            <div>
                                <InstructionsForm
                                    initialData={recipe}
                                    recipeId={recipe.id}
                                />
                                <IngredientForm
                                    initialData={recipe}
                                    recipeId={recipe.id}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={Timer} />
                                <h2 className="text-xl">דרגת קושי וזמן הכנה</h2>
                            </div>
                            <div>
                                <TimeForm
                                    initialData={recipe}
                                    recipeId={recipe.id}
                                />
                                <DifficultyForm
                                    initialData={recipe}
                                    recipeId={recipe.id}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeIdPage;
