import React from 'react'
import prisma from '../libs/prismadb'
import getCurrentUser from './getCurrentUser'

const getAllChatbots = async () => {
    try {

        const currentUser = await getCurrentUser();

        let chatbots;

        if (currentUser?.role === "user") {

            chatbots = await prisma.chatbot.findMany({
                where:{
                    company:{
                        user:currentUser,
                    }
                },
                include:{
                    company:{
                        include:{
                            user:{
                                select:{
                                    name:true
                                }
                            }
                        }
                    }
                }
            })
        } else {
            chatbots = await prisma.chatbot.findMany({
                include:{
                    company:{
                        include:{
                            user:{
                                select:{
                                    name:true
                                }
                            }
                        }
                    }
                }
            })
        }

        return chatbots;

    } catch (error: any) {
        throw new Error(error);
    }

}

export default getAllChatbots