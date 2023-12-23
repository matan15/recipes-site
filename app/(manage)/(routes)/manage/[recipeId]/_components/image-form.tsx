"use client";

import * as z from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Recipe } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";
import { db } from "@/lib/db";
import { utapi } from "uploadthing/server";
import { NextResponse } from "next/server";

interface ImageFormProps {
    initialData: Recipe;
    recipeId: string;
}

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "שדה חובה*",
    }),
});

export const ImageForm = ({ initialData, recipeId }: ImageFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/recipes/${recipeId}`, values);
            toast.success("המתכון עודכן");
            toggleEdit();
            router.refresh();
        } catch (error) {
            toast.error("משהו השתבש");
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                תמונה של המנה
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && <>ביטול</>}
                    {!isEditing && !initialData.imageUrl && (
                        <>
                            <PlusCircle className="h-4 w-4 ml-2" />
                            הוסף תמונה
                        </>
                    )}
                    {!isEditing && initialData.imageUrl && (
                        <>
                            <Pencil className="h-4 w-4 ml-2" />
                            ערוך תמונה
                        </>
                    )}
                </Button>
            </div>
            {!isEditing &&
                (!initialData.imageUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <ImageIcon className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <Image
                            alt="upload"
                            fill
                            className="object-cover rounded-md"
                            src={initialData.imageUrl}
                        />
                    </div>
                ))}
            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="recipeImage"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ imageUrl: url });
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        מומלצת תמונה ביחס של 16:9
                    </div>
                </div>
            )}
        </div>
    );
};
