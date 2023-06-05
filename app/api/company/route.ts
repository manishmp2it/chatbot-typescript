import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";


export async function POST(request:Request){


    const body = await request.json();

    const {name,domain,user,status,ip} = body;

    const company = await prisma.company.create({
        data:{
            domain,
            ip,
            status,
            name,
            user_id:user
        }
    })

    return NextResponse.json(company);

}