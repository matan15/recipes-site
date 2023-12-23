"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface RecipeNavbarProps {
    recipeId: string;
}

export const RecipesNavbar = ({ recipeId }: RecipeNavbarProps) => {
    const searchParams = useSearchParams();
    const from_ = searchParams.get("from_");
    console.log(from_)

    return (
        <div className="h-[60px] border-b-2 hover:shadow-md transition-all w-full flex justify-between items-center">
            <Link href={from_ === "manage" ? "/search" : "/recipes"} className="mr-4">
                <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-full">
                    <ArrowRight className="pl-2" />
                    חזרה
                </Button>
            </Link>
            <div className="flex space-x-4 items-center justify-center flex-1">
                <Link href={`/recipes/${recipeId}#title`}>
                    <Button className="rounded-full bg-white hover:bg-slate-100 text-slate-900 transition">
                        שם ותיאור
                    </Button>
                </Link>
                <Link href={`/recipes/${recipeId}#ingredients`}>
                    <Button className="rounded-full bg-white hover:bg-slate-100 text-slate-900 transition">
                        מרכיבים
                    </Button>
                </Link>
                <Link href={`/recipes/${recipeId}#instructions`}>
                    <Button className="rounded-full bg-white hover:bg-slate-100 text-slate-900 transition">
                        אופן הכנה
                    </Button>
                </Link>
            </div>
        </div>
    );
};
