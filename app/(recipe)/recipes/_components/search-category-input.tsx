"use client"

import qs from "query-string";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const SearchCategoryInput = () => {
    const [value, setValue] = useState("");
    const debouncedValue = useDebounce(value);

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                searchCategory: debouncedValue,
            }
        }, { skipEmptyString: true, skipNull: true })

        router.push(url);
    }, [debouncedValue, router, pathname])

    return (
        <div className="relative">
            <Search className="h-4 w-4 absolute top-3 right-3 text-slate-600" />
            <Input
                onChange={(e) => setValue(e.target.value)}
                value={value}
                className="w-full md:w-50 pr-9 rounded-full bg-slate-100 focus-visible:ring-slate-200 mt-4"
                placeholder="חפש קטגוריה..."
            />
        </div>
    );
}