import { NextResponse } from 'next/server'
import React from 'react'
import prisma from '../libs/prismadb';


const getAllLeads = async() => {

    try{

      
      

        const detail  = await prisma.lead.findMany({
            include:{
                chat:{
                    select:{
                        Chatbot:{
                            select:{
                                name:true
                            }
                        }
                    }
                }
            }
        })
       
        return detail;

    }catch(error:any){
       throw new Error(error);
    }
}

export default getAllLeads