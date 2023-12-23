"use client";

import { Compass, Layout } from "lucide-react";
import { Sidebaritem } from "./sidebar-item";

const guestRoutes = [
    {
        icon: Layout,
        label: "ניהול מתכונים",
        href: "/manage",
    },
    {
        icon: Compass,
        label: "חיפוש",
        href: "/search",
    },
]

export const SidebarRoutes = () => {
    const routes = guestRoutes;

    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <Sidebaritem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    );
}