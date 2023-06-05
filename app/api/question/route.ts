import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request:Request){

    const body =await request.json()

    const {questions}=body;

    const questionObjects = questions.map((question:any) => ({
        title: question.title,
        content: question.content,
      }));
    
    //   const createdQuestions = await prisma.question.createMany({
    //     data:{
    //         answerable:1,
    //         chatbot_id:"dasdsa",
    //     }
    //   })
      return NextResponse.json({});



}