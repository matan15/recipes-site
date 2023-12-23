import { AlertTriangle, CheckCircleIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const bunnerVariants = cva(
    "border text-center p-4 text-sm flex items-center w-full",
    {
        variants: {
            variant: {
                warning: "bg-yellow-200/80 border-yellow-30 text-primary",
                success: "bg-emerald-700 border-emerald-800 text-secondery"
            }
        },
        defaultVariants: {
            variant: "warning"
        }
    }
);

interface BunnerProps extends VariantProps<typeof bunnerVariants> {
    label: string;
};

const iconMap = {
    warning: AlertTriangle,
    success: CheckCircleIcon,
};

export const Bunner = ({
    label,
    variant,
}: BunnerProps) => {
    const Icon = iconMap[variant || "warning"];

    return (
        <div dir="rtl" className={cn(bunnerVariants({ variant }))}>
            <Icon className="h-4 w-4 ml-2" />
            {label}
        </div>
    )
}