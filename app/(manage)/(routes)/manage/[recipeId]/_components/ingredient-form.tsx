"use client";

import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { Ingredient, Recipe } from "@prisma/client";

interface IngredientFormProps {
    initialData: Recipe & { ingredients: Ingredient[] };
    recipeId: string;
}

const ingredientSchema = z.object({
    ingredients: z.array(
        z.object({
            name: z.string().min(1, {
                message: "שדה חובה*"
            }),
            amount: z
                .number({
                    invalid_type_error: "השדה אמור להיות מספר",
                    required_error: "שדה חובה*",
                })
                .min(0, "כמות של מרכיב מסוים אמורה להיות גדולה מ 0"),
            unit: z.string().min(1, {
                message: "שדה חובה*",
            }),
        })
    ),
});

type ingredient =  {
    name: string;
    amount: number;
    unit: string;
    recipeId: string;
}

export const IngredientForm = ({
    initialData,
    recipeId,
}: IngredientFormProps) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [ingredients, setIngredients] = useState<ingredient[]>(
        initialData?.ingredients || []
    );
    const toggleEdit = () => setIsEditing((current) => !current);

    const form = useForm<z.infer<typeof ingredientSchema>>({
        resolver: zodResolver(ingredientSchema),
        defaultValues: { ingredients: initialData?.ingredients || [] },
    });

    const { isSubmitting, isValid, errors } = form.formState;

    const onSubmit = async (values: {ingredients: ingredient[]}) => {
        try {
            console.log(values);
            await axios.patch(`/api/recipes/${recipeId}/ingredients`, values);
            toast.success("המתכון עודכן");
            toggleEdit();
            router.refresh();
        } catch (error) {
            console.log(error);
            toast.error("משהו השתבש");
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                מרכיבי המתכון
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>ביטול</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 ml-2" />
                            ערוך מרכיבים
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <ul className="list-disc list-inside text-sm mt-2">
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>
                            {ingredient.name} - {ingredient.amount}{" "}
                            {ingredient.unit}
                        </li>
                    ))}
                </ul>
            )}
            {!isEditing && (!ingredients || ingredients.length === 0) && (
                <div className="text-sm text-gray-500">
                    לא נמצאו מרכיבים במתכון
                </div>
            )}
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        {ingredients
                            ? ingredients.map((ingredient, index) => (
                                  <div
                                      key={index}
                                      className="flex items-center space-x-4"
                                  >
                                      <Input
                                          className="ml-4"
                                          disabled={isSubmitting}
                                          {...form.register(
                                              `ingredients.${index}.name`,
                                              { required: true }
                                          )}
                                          placeholder="שם מרכיב"
                                          value={ingredient.name}
                                          onChange={(e) => {
                                              const ingredientsArr = [
                                                 ...ingredients,
                                              ];
                                              ingredientsArr[index].name = e.target.value;
                                              setIngredients(ingredientsArr);
                                          }}
                                      />
                                      <Input
                                          {...form.register(
                                              `ingredients.${index}.amount`,
                                              {
                                                  required: true,
                                                  valueAsNumber: true,
                                              }
                                          )}
                                          disabled={isSubmitting}
                                          type="number"
                                          placeholder="כמות"
                                          value={ingredient.amount}
                                          onChange={(e) => {
                                              const ingredientsArr = [
                                                ...ingredients,
                                              ];
                                              ingredientsArr[index].amount = parseFloat(e.target.value);
                                              setIngredients(ingredientsArr);
                                          }}
                                      />
                                      <Input
                                          {...form.register(
                                              `ingredients.${index}.unit`,
                                              { required: true }
                                          )}
                                          disabled={isSubmitting}
                                          placeholder="יחידה"
                                          value={ingredient.unit}
                                          onChange={(e) => {
                                            const ingredientsArr = [
                                                ...ingredients,
                                            ];
                                            ingredientsArr[index].unit = e.target.value;
                                            setIngredients(ingredientsArr)
                                          }}
                                      />
                                      <Button
                                          onClick={() => {
                                              form.unregister([`ingredients.${index}.name`, `ingredients.${index}.amount`, `ingredients.${index}.unit`]);
                                              var ingredientsArr = [
                                                  ...ingredients,
                                              ];
                                              delete ingredientsArr[index];
                                              ingredientsArr.splice(index, 1);
                                              console.log(ingredients);
                                              setIngredients(ingredientsArr);
                                          }}
                                          variant="ghost"
                                      >
                                          <Trash className="h-5 w-5 text-red-500" />
                                      </Button>
                                  </div>
                              ))
                            : null}
                        <Button
                            onClick={() => {
                                const newIngredient = {
                                    name: "",
                                    amount: 0,
                                    unit: "",
                                    recipeId: recipeId,
                                };

                                const newIngredients = ingredients
                                    ? [...ingredients, newIngredient]
                                    : [newIngredient];
                                setIngredients(newIngredients);
                            }}
                            variant="default"
                        >
                            הוסף מרכיב
                        </Button>
                        <div className="flex items-center gap-x-2">
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}
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
