"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Recipe } from "@prisma/client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import TimeField from "@/components/ui/timeField";

interface TimeFormProps {
    initialData: Recipe;
    recipeId: string;
}

const formSchema = z.object({
    time: z.string().refine(
        (value) => {
            const [hours, minutes] = value.split(":").map(Number);
            return hours >= 0 && minutes >= 0;
        },
        {
            message:
                "פורמט לא נכון של זמן. השתמש בפורמט HH:MM ווודא שהשעות והדקות הם לא שליליים.",
        }
    ),
});

export const TimeForm = ({ initialData, recipeId }: TimeFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            time: initialData?.time || "אין זמן הכנה",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log(values);
            await axios.patch(`/api/recipes/${recipeId}`, values);
            toast.success("המתכון עודכן");
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("משהו השתבש");
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                זמן הכנה
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>ביטול</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            עדכן את זמן הכנה
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                    <p
                        className={cn(
                            "text-sm mt-2",
                            !initialData.time && "text-slate-500 italic"
                        )}
                    >
                        {initialData.time || "אין זמן הכנה"}
                    </p>
                )}
            {isEditing && (
                <>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 mt-4"
                        >
                            <FormField
                                control={form.control}
                                name="time"
                                render={({ field: { value, onChange } }) => (
                                    <FormItem>
                                        <FormLabel></FormLabel>
                                        <FormControl>
                                            <TimeField 
                                                onChange={onChange}
                                                value={value}
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
                </>
            )}
        </div>
    );
};
