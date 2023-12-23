"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Recipe } from "@prisma/client";

interface InstructionsFormProps {
    initialData: Recipe;
    recipeId: string;
}

const formSchema = z.object({
    instructions: z.string().min(1, {
        message: "שדה חובה*",
    }),
});

export const InstructionsForm = ({ initialData, recipeId }: InstructionsFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            instructions: initialData?.instructions || "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/recipes/${recipeId}`, values);
            toast.success("המתכון עודכן");
            toggleEdit()
            router.refresh();
            
        } catch {
            toast.error("משהו השתבש");
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                אופן הכנה
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>ביטול</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 ml-2" />
                            ערוך אופן הכנה
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className={cn(
                    "text-sm mt-2",
                    !initialData.instructions && "text-slate-500 italic"
                )}>
                    {initialData.instructions || "אין הוראות הכנה"}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField 
                            control={form.control}
                            name="instructions"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea 
                                            disabled={isSubmitting}
                                            placeholder={"לדוגמה:\n" + "1. חתוך 3 בצלים..."}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                            >
                                שמור
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
};
