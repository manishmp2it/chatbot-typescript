import { NextResponse } from 'next/server'
import React from 'react'
import prisma from '../libs/prismadb';

export interface IListingsParams {
    client_id?:string
  }
  

const getChatbotdetails = async(params: IListingsParams) => {

    try{

        const {client_id} = params;
        console.log(client_id)

        const detail  = await prisma.chatbot.findFirst({
            where:{
                secret_key:''
            }
        })

        return detail;

    }catch(error:any){
       throw new Error(error);
    }
}

export default getChatbotdetails