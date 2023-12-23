import { UserButton } from "@clerk/nextjs"
import { MobileSidebar } from "./mobile-navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const Navbar = () => {
    return (
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
            <MobileSidebar />
            <div>
                <Link href="/manage">
                    <Button>
                        מעבר לניהול
                    </Button>
                </Link>
            </div>
            <div className="flex gap-x-2 mr-auto">
                <UserButton 
                    afterSignOutUrl="/"
                />
            </div>
        </div>
    )
}