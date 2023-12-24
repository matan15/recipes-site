import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastProvider } from "@/components/providers/toaster-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Cook&Eat",
    description: "אתר Cook&Eat נוצר על מנת שמשתמשים יוכלו ליצור מתכונים ולשתף אותם עם אנשים אחרים.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    <ToastProvider />
                    <div className="flex-grow">
                        {children}
                    </div>
                </body>
            </html>
        </ClerkProvider>
    );
}
