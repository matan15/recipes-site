import { Footer } from "@/components/footer";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const ManagementLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <>
            <div dir="rtl" className="h-max">
                <div className="h-[80px] md:pr-56 absolute inset-y-0 w-full z-50">
                    <Navbar />
                </div>
                <div className="h-full">
                    <div className="hidden md:flex h-full w-56 flex-col absolute inset-y-0 z-50">
                        <Sidebar />
                    </div>
                    <main className="md:pr-56 pt-[80px] h-full">
                        {children}
                    </main>
                </div>
            </div>
            <Footer />
        </>
    );
}
 
export default ManagementLayout;