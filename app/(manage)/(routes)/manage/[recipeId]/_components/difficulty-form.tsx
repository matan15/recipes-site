"use client";

import React from "react";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Recipe } from "@prisma/client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { SvgIcon } from "@mui/material";

interface DifficultyFormProps {
    initialData: Recipe;
    recipeId: string;
}

const formSchema = z.object({
    difficulty: z.coerce.number(),
});

const labels: { [index: string]: string } = {
    1: "קל מאוד",
    2: "קל",
    3: "בינוני",
    4: "קשה",
    5: "קשה מאוד",
};

const getLabelText = (value: number) => {
    return `${value} Dish${value !== 1 ? "es" : ""}, ${labels[value]}`;
};

export const DifficultyForm = ({
    initialData,
    recipeId,
}: DifficultyFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [hover, setHover] = React.useState(-1);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            difficulty: initialData?.difficulty || 0,
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
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
                רמת קושי
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>ביטול</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            עדכן את רמת הקושי
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p
                    className={cn(
                        "text-sm mt-2",
                        !initialData.difficulty && "text-slate-500 italic"
                    )}
                >
                    {initialData.difficulty || "אין רמת קושי"}
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
                                name="difficulty"
                                render={({ field: { value, onChange } }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Box
                                                sx={{
                                                    width: 200,
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Rating
                                                    name="hover-feedback"
                                                    dir="ltr"
                                                    value={value}
                                                    precision={1}
                                                    getLabelText={getLabelText}
                                                    onChange={(
                                                        event,
                                                        newValue
                                                    ) => {
                                                        onChange(newValue);
                                                    }}
                                                    onChangeActive={(
                                                        event,
                                                        newHover
                                                    ) => {
                                                        setHover(newHover);
                                                    }}
                                                    icon={
                                                        <SvgIcon fontSize="inherit">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 64 64"
                                                                width="256"
                                                                height="256"
                                                            >
                                                                <path
                                                                    d="M0 47.23c.51 3.43 3.47 6.07 7.04 6.07h49.93c3.57 0 6.53-2.64 7.04-6.07H0zm61.07-2.85c0-15.52-12.21-28.22-27.52-29.03v-2.1h2.26V10.7h-7.63v2.55h2.26v2.1c-15.31.81-27.51 13.52-27.51 29.03v.78h58.14v-.78z"
                                                                    fill="#595bd4"
                                                                ></path>
                                                            </svg>
                                                        </SvgIcon>
                                                    }
                                                    emptyIcon={
                                                        <SvgIcon fontSize="inherit">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 64 64"
                                                                width="256"
                                                                height="256"
                                                            >
                                                                <path d="M0 47.23c.51 3.43 3.47 6.07 7.04 6.07h49.93c3.57 0 6.53-2.64 7.04-6.07H0zm61.07-2.85c0-15.52-12.21-28.22-27.52-29.03v-2.1h2.26V10.7h-7.63v2.55h2.26v2.1c-15.31.81-27.51 13.52-27.51 29.03v.78h58.14v-.78z"></path>
                                                            </svg>
                                                        </SvgIcon>
                                                    }
                                                />
                                                {value !== null && (
                                                    <Box
                                                        sx={{
                                                            mr: 2,
                                                            whiteSpace:
                                                                "nowrap",
                                                            display:
                                                                "inline-block",
                                                        }}
                                                    >
                                                        {
                                                            labels[
                                                                hover !== -1
                                                                    ? hover
                                                                    : value
                                                            ]
                                                        }
                                                    </Box>
                                                )}
                                            </Box>
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
