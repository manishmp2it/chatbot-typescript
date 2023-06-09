import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
    listingId?: string;
  }

export async function GET({ params }: { params: IParams }) {



    
    // return NextResponse.json(chat);
}