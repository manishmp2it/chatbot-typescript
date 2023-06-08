import { NextResponse } from 'next/server'
import React from 'react'
import prisma from '../libs/prismadb';

export interface IListingsParams {
    client_id?:string
  }
  

const getAllChatbotQuestion = async(params: IListingsParams) => {

    try{

        const {client_id} = params;
      

        const detail  = await prisma.question.findMany({
            where:{
                chatbot:{
                    secret_key:client_id
                },
            },
        })
       
        return detail;

    }catch(error:any){
       throw new Error(error);
    }
}

export default getAllChatbotQuestion