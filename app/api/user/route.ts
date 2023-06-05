// import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request:Request){

    const body = await request.json();

    const {name,email,phone,password,role,location}=body;


    const user = await prisma.user.create({
        data:{
            email,
            name,
            password,
            role,
            phone,
            location
        }
    });
    
    return NextResponse.json(user);

}