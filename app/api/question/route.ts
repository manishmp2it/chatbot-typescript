import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request:Request){

    const body =await request.json()

    const {questions,chatbot_id}=body;

    await prisma.question.deleteMany({
      where:{
        chatbot_id:chatbot_id
      }
    })

    const questionObjects = questions.map((question:any) => ({
        text: question.text,
        lead_field: question.lead_field,
        options:question.options,
        answerable:question.answerable,
        chatbot_id,
        validation_id:question.validation_id!='' ? question.validation_id:null

      }));

      const createdQuestions = await prisma.question.createMany({
        data:questionObjects
      })
      return NextResponse.json(createdQuestions);
}

