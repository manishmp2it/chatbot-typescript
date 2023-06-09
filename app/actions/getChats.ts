import { NextResponse } from 'next/server'
import React from 'react'
import prisma from '../libs/prismadb';


export interface IChatsParams {
    chat_id:string|null
  }
  
const getChats = async (params: IChatsParams) => {
    const {chat_id} = params;

    try {
        if(chat_id){
            const detail = await prisma.chat.findFirst({
                where: {
                    id: `${chat_id}`
                }
            })
    
            return detail;
        }else{
            return [];
        }

    } catch (error: any) {
        throw new Error(error);
    }
}

export default getChats;