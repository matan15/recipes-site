import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

export async function POST(
  req: Request
) {
    const formData = await req.json();

    try {
        const response = await axios.post("https://api.courier.com/send", {
            message: {
              to: {
                data: {
                  name: 'Matan Naydis',
                },
                email: 'matan.naydis@gmail.com',
              },
              content: {
                title: 'משתמש שלח לך הודעה מאתר recipes',
                body: `שם המשתמש: ${formData.name}\nאימייל: ${formData.email}\nהודעה: ${formData.message}`,
              },
              routing: {
                method: 'single',
                channels: ['email'],
              },
            },
        }, {
          headers: {
            "Authorization": "Bearer " + process.env.SEND_EMAIL_API_KEY
          }
        });
        if (response.status) {
          return NextResponse.json(response.data)
        } else {
          return new NextResponse('Internal Server Error', { status: 500 })
        }
    } catch (error) {
        console.log("[EMAIL ERROR]", error);
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}