import { Footer } from "@/components/footer";

const RecipesLayout = async ({
    children
}: {
    children: React.ReactNode;
}) => {

    return (
        <>
            <div dir="rtl" className="h-full">
                <main className="h-full">
                    {children}
                </main>
            </div>
            <Footer />
        </>
    )
}

export default RecipesLayout