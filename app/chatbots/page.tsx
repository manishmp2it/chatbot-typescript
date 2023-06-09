import React from 'react'
import ChatbotComponent from './ChatbotComponent'
import getAllCompany from '../actions/getAllCompany';
import getAllChatbots from '../actions/getAllChatbots';
import getValidations from '../actions/getValidations';
import getCurrentUser from '../actions/getCurrentUser';
import { redirect } from 'next/navigation';

const page = async () => {
    const currentUser = await getCurrentUser();
   
    if(!currentUser){
        redirect('/login');
    }

    const companies = await getAllCompany();
    const chatbots = await getAllChatbots();
    const validations = await getValidations();

    return (
        <>
            <ChatbotComponent companies={companies} chatbots={chatbots} validations={validations} />
        </>
    )
}

export default page