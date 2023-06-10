import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
    chatId?: string;
  }

export async function GET({ params }: { params: IParams }) {

       const {chatId}=params

       console.log(chatId)

       const chats = await prisma.chat.findFirst({
        where:{
          id:chatId
        }
       })

    return NextResponse.json(chats);
}