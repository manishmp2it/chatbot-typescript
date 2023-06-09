import prisma from "@/app/libs/prismadb";
import { randomBytes } from "crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    const body = await request.json();


    const { current_question_priority, data, chatbot_id } = body;

    // let chats = JSON.stringify(data)

    // console.log(data)

    // await prisma.lead.deleteMany({
    //     where: {
    //        chat_id:''
    // })

    const lead = await prisma.lead.create({
        data: {
            data:data,
            chat_id:''
        }
    })

    return NextResponse.json(lead);
}