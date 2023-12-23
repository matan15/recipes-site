"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LogoWithoutIcon } from "@/components/logo-without-icon";
import { Footer } from "@/components/footer";

export default function Home() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            console.log(formData);
            const response = await axios.post('/api/sendEmail', formData, { headers: { "Content-Type": "application/json" } });
            if (response.data.success) {
                setFormData({
                    name: "",
                    email: "",
                    message: "",
                });
            }
            else {
                console.error('Error occured!')
            }
        } catch (error) {
            console.error("Error occured!", error);
        }
    };

    return (
        <>
            <div className="bg-gray-100 min-h-screen" dir="rtl">
                <header className="bg-blue-500 text-white p-8">
                    <div className="container mx-auto flex items-center justify-center">
                        <LogoWithoutIcon />
                    </div>
                </header>

                <main className="w-screen">
                    <section className="mt-8 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">אודות</h2>
                        <p>
                            אתר זה נוצר על ידי{" "}
                            <a
                                href="https://github.com/matan15"
                                target="_blank"
                            >
                                מתן ניידיס
                            </a>{" "}
                            על מנת שמשתמשים יוכלו ליצור מתכונים שלהם ולשתף עם
                            אנשים אחרים (בקרוב!). למשתמשים קיים איזור אישי (בעת
                            התחברות) ובו הם יכולים לנהל את המתכונים שלהם.
                        </p>
                    </section>

                    <section className="mt-8 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">צור מתכונים</h2>
                        <p className="text-gray-800 pb-4">
                            על מנת ליצור מתכונים יש להתחבר או להירשם לאתר
                        </p>

                        <Button variant="default">
                            <Link href="/recipes">
                                התחבר / הירשם
                            </Link>
                        </Button>
                    </section>

                    <section className="mt-8 bg-white p-6 rounded-lg shadow-md">
                        <form onSubmit={handleSubmit} method="post" className="pb-5">
                            <h2 className="text-2xl font-bold mb-4">צור קשר</h2>
                            <div className="mb-4">
                                <Label
                                    htmlFor="name"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    שם:
                                </Label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="border rounded w-full py-2 px-3"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <Label
                                    htmlFor="email"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    אימייל:
                                </Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="border rounded w-full py-2 px-3"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <Label
                                    htmlFor="message"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    הודעה:
                                </Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="border rounded w-full py-2 px-3"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                            >
                                שלח
                            </Button>
                        </form>
                    </section>
                </main>
                <Footer />
            </div>
        </>
    );
}
