import React from 'react'
import ChatbotComponent from './ChatbotComponent'
import getAllCompany from '../actions/getAllCompany';
import getAllChatbots from '../actions/getAllChatbots';

const page = async() => {

    const companies = await getAllCompany();
    const chatbots = await getAllChatbots();

  return (
   <>
   <ChatbotComponent companies={companies} chatbots={chatbots} />
   </>
  )
}

export default page