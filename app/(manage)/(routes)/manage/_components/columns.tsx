"use client";


import { Category, Ingredient, Recipe } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Recipe>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    שם
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "ingredients",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    כמות מרכיבים
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const ingredients: Ingredient[] = row.getValue("ingredients");

            return ingredients.length;
        },
    },
    {
        accessorKey: "time",
        header: ({ column }) => {
            return (
                <Button
                    className="justify-end"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    זמן הכנה
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "category",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    קטגוריה
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const category: Category = row.getValue("category");

            return (
                <Badge className="bg-slate-500">
                    {category.name}
                </Badge>
            );
        },
    },
    {
        accessorKey: "isPublish",
        header: "סטטוס פרסום",
        cell: ({ row }) => {
            const isPublished = row.getValue("isPublish") || false;

            return (
                <Badge className={cn(
                    "bg-slate-500",
                    isPublished && "bg-sky-700"
                )}>
                    {isPublished ? "פורסם" : "טיוטה"}
                </Badge>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { id } = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-4 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Link href={`/manage/${id}`}>
                            <DropdownMenuItem dir="rtl">
                                <Pencil className="h-4 w-4 ml-2" />
                                ערוך
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    }
]