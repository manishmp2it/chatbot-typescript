import React from 'react'
import prisma from '../libs/prismadb'
import getCurrentUser from './getCurrentUser'

const getAllCompany = async () => {
    try {

        const currentUser = await getCurrentUser();

        let company;

        if (currentUser?.role === "user") {

            company = await prisma.company.findMany({
                where: {
                    user: currentUser
                },
                include:{
                    user:{
                        select:{
                            name:true
                        }
                    }
                }
            })
        } else {
            company = await prisma.company.findMany({
                include:{
                    user:{
                        select:{
                            name:true
                        }
                    }
                }
            })
        }

        return company;

    } catch (error: any) {
        throw new Error(error);
    }

}

export default getAllCompany