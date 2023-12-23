"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "*שדה חובה",
    }),
});

const CreatePage = () => {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/recipes", values);
            router.push(`/recipes/${response.data.id}`);
            toast.success("!המתכון נוצר בהצלחה");
        } catch {
            toast.error("משהו השתבש");
        }
    };

    return (
        <div dir="rtl" className="max-w-5xl text-right mx-auto flex md:items-center md:justify-center h-screen p-6">
            <div>
                <h1 className="text-2xl">תן שם למנה שלך</h1>
                <p className="text-sm text-slate-600">
                    איך תירצה לקרוא למנה שלך? אל תדאג, תוכל לשנות את השם אחר כך.
                </p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-8"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>שם המנה</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="לדוגמה: סלט יווני"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        תאר בקצרה את המנה
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                            >
                                המשך
                            </Button>
                            <Link href="/recipes">
                                <Button type="button" variant="ghost">
                                    ביטול
                                </Button>
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default CreatePage;
