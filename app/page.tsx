import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <p className="text-3xl font-medium text-sky-700">Hello World</p>
            <Button asChild variant="default">
                <Link href="/recipes">Log in</Link>
            </Button>
        </>
    );
}
