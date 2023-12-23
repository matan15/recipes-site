"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "./ui/button";
import { SearchInput } from "./search-input";
import axios from "axios";


export const NavbarRoutes = () => {
    const pathname = usePathname();

    const isManagePage = pathname?.startsWith("/manage");
    const isSearchpage = pathname === "/search";


    return (
        <>
            {isSearchpage && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )}
            {isManagePage && (
                <Link href="/recipes">
                    <Button variant="ghost">
                        מעבר למתכונים
                    </Button>
                </Link>
            )}
            <div className="flex gap-x-2 mr-auto">
                <UserButton 
                    afterSignOutUrl="/"
                />
            </div>
        </>
    )
}