"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ActionsProps {
    disabled: boolean;
    recipeId: string;
    isPublished: boolean;
}

export const Actions = ({
    disabled,
    recipeId,
    isPublished,
}: ActionsProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            if (isPublished) {
                await axios.patch(`/api/recipes/${recipeId}/unpublish`)
                toast.success("המתכון לא מפורסם");
            } else {
                await axios.patch(`/api/recipes/${recipeId}/publish`)
                toast.success("המתכון מפורסם");
            }

            router.refresh();
        } catch {
            toast.error("משהו השתבש");
        } finally {
            setIsLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true);

            await axios.delete(`/api/recipes/${recipeId}`)

            toast.success("המתכון נמחק");
            router.refresh();
            router.push(`/recipes`);
        } catch {
            toast.error("משהו השתבש")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onClick}
                disabled={disabled || isLoading}
                variant="outline"
                size="sm"
            >
                {isPublished ? "הסר מפרסום" : "פרסם"}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
                <Button size="sm" disabled={isLoading}>
                    <Trash className="h-4 w-4" />
                </Button>
            </ConfirmModal>
        </div>
    );
};
