import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "@/components/icon-badge";
import { Gauge, Salad, Timer } from "lucide-react";

interface RecipeCardProps {
    id: string;
    title: string;
    imageUrl: string | null;
    numberOfIngredients: number;
    duration: string;
    difficulty: number;
    category: string;
    from_: string;
}

export const RecipeCard = ({
    id,
    title,
    imageUrl,
    numberOfIngredients,
    duration,
    difficulty,
    category,
    from_
}: RecipeCardProps) => {
    

    const difficulty_word = ["קל מאוד", "קל", "בינוני", "קשה", "קשה מאוד"];

    return (
        <Link href={`/recipes/${id}?from_=${from_}`}>
            <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                    {imageUrl && (
                        <Image 
                        fill
                        className="object-cover"
                        alt={title}
                        src={imageUrl}
                    />
                    )}
                    {!imageUrl && (
                        <div className="flex justify-center items-center">
                        <Image
                            className="object-cover"
                            alt="title"
                            src="/dish.png"
                            width={160}
                            height={160}
                        />
                        </div>
                    )}
                </div>
                <div className="flex flex-col pt-2">
                    <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                        {title}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {category}
                    </p>
                    <div className="my-3 flex items-center gap-x-6 text-sm md:text-xs">
                        <div className="flex items-center gap-x-2 text-slate-500">
                            <IconBadge 
                                size="sm"
                                icon={Salad}
                            />
                            <span>
                                {numberOfIngredients === 1 ? "מרכיב אחד" : `${numberOfIngredients} מרכיבים`}
                            </span>
                        </div>
                        <div className="flex items-center gap-x-2 text-slate-500">
                            <IconBadge 
                                size="sm"
                                icon={Timer}
                            />
                            <span>
                                {duration}
                            </span>
                        </div>
                        <div className="flex items-center gap-x-2 text-slate-500">
                            <IconBadge 
                                size="sm"
                                icon={Gauge}
                            />
                            <span>
                                {difficulty_word[difficulty - 1]}
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </Link>
    );
}