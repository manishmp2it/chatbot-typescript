import React from 'react';
import ClientComponent from './ClientComponent';
import getChatbotdetails from '@/app/actions/getChatbotdetails';

interface IParams {
    client_id?: string;
  }

const page = async({ params }: { params: IParams }) => {

    console.log(params);

    const chatbot_detail = await getChatbotdetails(params);

    return (
        <ClientComponent  />
    );
};

export default page;