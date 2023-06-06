
import prisma from '../libs/prismadb'

const getValidations = async () => {

    try {

        const validations = await prisma.validation.findMany({})

        return validations;

    } catch (error: any) {
        throw new Error(error);
    }
}

export default getValidations