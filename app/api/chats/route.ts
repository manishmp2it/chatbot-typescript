import prisma from "@/app/libs/prismadb";
import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {

    const body = await request.json();


    const { current_question_priority, data, chatbot_id } = body;

    const chat = await prisma.chat.create({
        data: {
            chat_secret_key: '',
            current_question_priority,
            data: data,
            chatbot_id
        }
    })
    return NextResponse.json(chat);
}

export async function PUT(request: Request) {

    const body = await request.json();


    const { current_question_priority, data, chatbot_id,chat_id } = body;

    const chat = await prisma.chat.update({
        where:{
            id:chat_id
        },
        data: {
            chat_secret_key: '',
            current_question_priority,
            data: data,
            chatbot_id
        }
    })
    return NextResponse.json(chat);
}

export async function GET(request:NextRequest) {


    const tag = request.nextUrl.searchParams.get('chat_id')

    console.log(tag);

    const chats = await prisma.chat.findFirst({
     where:{
       id:`${tag}`
     }
    })

 return NextResponse.json(chats);
}