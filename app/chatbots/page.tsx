import React from 'react'
import ChatbotComponent from './ChatbotComponent'
import getAllCompany from '../actions/getAllCompany';
import getAllChatbots from '../actions/getAllChatbots';
import getValidations from '../actions/getValidations';

const page = async () => {

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