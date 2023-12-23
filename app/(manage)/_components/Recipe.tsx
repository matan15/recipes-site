"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";

interface RecipeProps {
    id: number;
    title: string;
    ingridientsCount: 5;
    imageUrl?: string;
}

const Recipe: React.FC<RecipeProps> = ({ id, title, ingridientsCount, imageUrl }) => {
    const [inShoppingList, setInShoppingList] = useState(false);

    const handleAddToShoppingList = () => {
        setInShoppingList(true);
    }

    return (
        
        <div className="bg-white p-4 rounded shadow-md">
            <Link href={`/recipe/${id}`}>
                <a className="text-blue-500 hover: underline">
                    <div className="mb-4">
                        <img src={imageUrl || "/icon8-recipe.png"} alt={title} className="w-full h-auto rounded-lg" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{title}</h2>
                </a>
            </Link>
            <p className="text-gray-600">{ingridientsCount} מרכיבים</p>
            <button
                onClick={handleAddToShoppingList}
                className={`${inShoppingList ? "bg-green-600 hove:bg-green-700" : "bg-red-500 hove:bg-green-600"} text-white py-2 px-4 mt-2 rounded`}
            >
                {inShoppingList ? 'הכנס לרשימת קניות' : 'הסר מרשימת הקניות'}
            </button>
        </div>
    )
}

export default Recipe;