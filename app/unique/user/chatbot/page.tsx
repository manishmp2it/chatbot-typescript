import React from 'react';
import getChatbotdetails, { IListingsParams } from '@/app/actions/getChatbotdetails';
import getAllChatbotQuestion from '@/app/actions/getAllChatbotQuestion';
import dynamic from 'next/dynamic';

interface ChatbotProps {
    searchParams: IListingsParams;
}

const ClientComponent = dynamic(() => import('./ClientComponent'), { 
    ssr: false 
  });

const page = async ({ searchParams }: ChatbotProps) => {

    const chatbot_detail = await getChatbotdetails(searchParams);
    const chatbot_questions = await getAllChatbotQuestion(searchParams);

    return (
        <ClientComponent chatbot_detail={chatbot_detail} chatbot_questions={chatbot_questions} />
    );
};

export default page;