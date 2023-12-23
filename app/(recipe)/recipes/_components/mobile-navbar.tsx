import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Sidebar } from "./sidebar";

export const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden pl-4 hover:opacity-75 transition">
                <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="p-0 bg-white">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
}