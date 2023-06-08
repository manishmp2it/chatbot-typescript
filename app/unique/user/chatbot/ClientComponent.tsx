'use client';
import { Chatbot, Question } from '@prisma/client';
import Image from 'next/image';
import React, { useMemo, useState } from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi"
import { IoMdClose, IoMdSend } from "react-icons/io"

interface ClientComponentsProps {
    chatbot_detail: Chatbot | null;
    chatbot_questions: Question[]
}

const ClientComponent = ({ chatbot_detail, chatbot_questions }: ClientComponentsProps) => {

    const [questions, setQuestions] = useState(chatbot_questions);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [chats, setChats] = useState<any>([]);

    const [isChatbotEnabled, setChatbotEnabled] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<any>([]);

    const toggleChatbot = () => {
        setChatbotEnabled(!isChatbotEnabled);
    };

    const handleInputChange = (event: any) => {
        setMessage(event.target.value);
    };

    console.log(chatHistory)

    const handleSubmit = () => {
        if (message.trim() !== '') {
            if(questions[currentQuestionIndex]?.lead_field==="mobile"){
                if(/^[6-9]\d{9}$/.test(message)){
                    const newQuestion = { type: 'q', message: questions[currentQuestionIndex].text }
                    const newAnswer = { type: 'a', message: message };
                    setChatHistory([...chatHistory, newQuestion, newAnswer]);
                    setMessage('');
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                }
                
            }else if(questions[currentQuestionIndex]?.lead_field==="email"){
                if(/^(.+)@(.+)$/.test(message)){
                    const newQuestion = { type: 'q', message: questions[currentQuestionIndex]?.text }
                    const newAnswer = { type: 'a', message: message };
                    setChatHistory([...chatHistory, newQuestion, newAnswer]);
                    setMessage('');
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                }
            }else{
                const newQuestion = { type: 'q', message: questions[currentQuestionIndex]?.text }
                const newAnswer = { type: 'a', message: message };
                setChatHistory([...chatHistory, newQuestion, newAnswer]);
                setMessage('');
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
        }
    };

   
    return (
        <div className="fixed bottom-0 right-0 m-4">
            {isChatbotEnabled && (
                <div className="bg-white rounded-lg shadow-xl border w-[360px] h-[500px] relative">
                    {/* Chatbot content */}
                    <div className={`flex items-center rounded-t-lg p-4`} style={{ background: `${chatbot_detail?.theme_color}` }}>
                        <div className="w-10 h-10 rounded-full bg-[#333] relative">
                            <Image src={`${chatbot_detail?.image}`} alt='icon' fill />
                        </div>
                        <div className="ml-2">
                            <p className="font-bold text-[#fff]">{chatbot_detail?.name}</p>
                        </div>
                        <div className='absolute right-5 flex'>
                            <HiOutlineDotsVertical color='#fff' size={24} />
                            <IoMdClose className='ml-4 cursor-pointer' color="#fff" size={24} onClick={toggleChatbot} />
                        </div>
                    </div>

                    <div className={`overflow-y-auto scrollbar-w-[6px] scrollbar-thumb-rounded-full scrollbar scrollbar-thumb-[#333] scrollbar-track-gray-100 max-h-[72%] min-h-[72%] border-b-[1px] border-[#333]`} >
                        {/* Chat messages */}
                        <div className="flex flex-col space-y-2 my-2 mx-2">
                            {/* Chat message components */}
                            {chatHistory.map((item: any, index: any) => {

                                return (
                                    item.type === "q" ? <div className="flex">
                                        <div className="flex items-center">
                                            <div className="min-w-[32px] min-h-[32px] rounded-full relative bg-[#fff]" style={{ border: `1px solid ${chatbot_detail?.theme_color}` }}>
                                                <Image src={`${chatbot_detail?.image}`} alt='icon' fill />
                                            </div> <div className='bg-[#f5f5f5] ml-2 text-[#000] py-2 px-4 rounded-[35px] rounded-bl-none'>{item.message}</div>
                                        </div>
                                    </div> : <div className="flex justify-end">
                                        <div className={`ml-2 text-[#fff] py-2 px-4 rounded-[35px] rounded-br-none`} style={{ background: `${chatbot_detail?.theme_color}` }}>{item.message}</div>
                                    </div>
                                )

                            })}

                            {questions.map((item: any, index) => {

                                if (index == currentQuestionIndex) {
                                    return (
                                        <div className="flex flex-col">
                                            <div className="flex items-center">
                                                <div className="min-w-[32px] min-h-[32px] rounded-full relative bg-[#fff]" style={{ border: `1px solid ${chatbot_detail?.theme_color}` }}>
                                                    <Image src={`${chatbot_detail?.image}`} alt='icon' fill />
                                                </div> <div className='bg-[#f5f5f5] ml-2 text-[#000] py-2 px-4 rounded-[35px] rounded-bl-none'>{item.text}</div>
                                            </div>
                                            {item.answerable == "true" && item.options != null ? <div className='flex flex-wrap mx-3 my-2'>
                                                {item.options.map((item: any) => (
                                                    <div onClick={()=>{
                                                        setMessage(item);
                                                        handleSubmit();
                                                    }} className='p-2 border my-[5px] rounded-md hover:bg-[#333] hover:text-[#fff] transition cursor-pointer'>{item}</div>
                                                ))}
                                            </div> : ''}
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>

                    {/* Chat input */}
                    <div className=" absolute bottom-1 w-full flex flex-col ">
                        <div className='flex'>
                            <input
                                type="text"
                                value={message}
                                disabled={questions.length===currentQuestionIndex+1}
                                placeholder="Type your message..."
                                className="w-full p-2 text-sm rounded-md focus:outline-none"
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button
                                style={{ color: `${chatbot_detail?.theme_color}` }}
                                className="py-2 px-4 ml-2 rounded-md focus:outline-none"
                                onClick={handleSubmit}
                            >
                                <IoMdSend size={24} />
                            </button>
                        </div>
                        <div className='text-[#1661f5] text-center text-sm font-light'>
                            Chat 💡 by WebHopers
                        </div>
                    </div>

                </div>
            )}

            {!isChatbotEnabled ? <button
                className={`text-white p-2 w-14 h-14 rounded-full focus:outline-none relative`}
                onClick={toggleChatbot}
                style={{ border: `4px solid ${chatbot_detail?.theme_color}` }}
            >
                <Image className='' src={`${chatbot_detail?.image}`} alt='icon' fill />
            </button> : ''}
        </div>
    );
}

export default ClientComponent