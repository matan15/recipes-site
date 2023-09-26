import { UserButton } from "@clerk/nextjs";
import { Recipe } from "../../_components/recipe";

const DUMMY_DATA = [
    { id: 1, title: "עוף שלם", ingredientCount: 5 },
    { id: 2, title: "שניצל", ingredientCount: 2 },
];

export default function Recipes() {
    return (
        <>
            <div>
                <UserButton afterSignOutUrl="/" />
            </div>
            {DUMMY_DATA.map((recipe) => {
                <Recipe
                    key={recipe.id}
                    id={recipe.id}
                    title={recipe.title}
                    ingridientCount={recipe.ingredientCount}
                    imageUrl={recipe?.imageUrl}
                />;
            })}
        </>
    );
}
