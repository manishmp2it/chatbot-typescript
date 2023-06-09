import React from 'react';
import ClientComponent from './ClientComponent';
import getChatbotdetails,{IListingsParams} from '@/app/actions/getChatbotdetails';
import getAllChatbotQuestion from '@/app/actions/getAllChatbotQuestion';
import getChats from '@/app/actions/getChats';

export const dynamic = 'force-dynamic'
interface ChatbotProps {
    searchParams: IListingsParams;
  }

const page = async({searchParams}:ChatbotProps) => {


    const chatbot_detail = await getChatbotdetails(searchParams);
    const chatbot_questions = await getAllChatbotQuestion(searchParams);


    return (
        <ClientComponent chatbot_detail={chatbot_detail} chatbot_questions={chatbot_questions} />
    );
};

export default page;