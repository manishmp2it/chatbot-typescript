import prisma from "@/app/libs/prismadb";
import { randomBytes } from "crypto";
import { NextResponse } from "next/server";

export async function POST(request:Request){

    const body = await request.json();
  

    const {name,company,theme_color,status,image}=body;

    let token = '';

    await randomBytes(30, function(err, buffer) {
         token = buffer.toString('hex');
      });


    const chatbot = await prisma.chatbot.create({
        data:{
            name,
            company_id:company,
            theme_color,
            status,
            secret_key:token,
            image
        }
    })

    return NextResponse.json({});
}