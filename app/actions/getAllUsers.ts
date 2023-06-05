
import prisma from '../libs/prismadb'

const getAllUsers = async () => {

    try {

        const users = await prisma.user.findMany({});

        return users;

    } catch (error: any) {
        throw new Error(error);
    }

}

export default getAllUsers