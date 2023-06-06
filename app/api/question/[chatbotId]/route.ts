import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
    chatbotId?: string;
  }

export async function GET(request:Request,{ params }: { params: IParams }){

    const { chatbotId } = params;

    const questions = await prisma.question.findMany({
        where:{
            chatbot_id:chatbotId
        },
        select:{
            text:true,
            lead_field:true,
            validation_id:true,
            options:true,
            answerable:true
        }
    })
    return NextResponse.json(questions);
}