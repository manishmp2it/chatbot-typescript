'use client';
import React, { useState } from 'react'
import CreateChatbotModal from '../components/modal/CreateChatbotModal';
import { Chatbot, Company, Validation } from '@prisma/client';
import { BiEdit } from 'react-icons/bi';
import Image from 'next/image';

interface ChatbotComponentProps {
    companies: (Company & {
        user: {
            name: string | null;
        };
    })[];

    chatbots: (Chatbot & {
        company: Company & {
            user: {
                name: string | null;
            };
        };
    })[];

    validations: Validation[]
}

const ChatbotComponent = ({ companies, chatbots, validations }: ChatbotComponentProps) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState('');
    const [chatbot_id, setChatbot_id] = useState('');
    const [appData, setAppData] = useState('');
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    console.log(chatbots)

    const Table = () => {


        return (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                ID
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Icon
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Name
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Company/Domain
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Owner
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Status
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {chatbots.map((row: any, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="w-9 h-9 rounded-full relative bg-[#fff]">
                                        {row.image != null ? <Image src={`${row.image}`} alt='icon' fill /> : ''}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{row.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{row.company.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{row.company.user.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{row.status}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">
                                        <button
                                            onClick={(any) => {
                                                setMode('Edit');
                                                setChatbot_id(row.id);
                                                setAppData(row);
                                                setModalOpen(true);

                                            }}
                                            className="flex items-center justify-center bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none"
                                        >
                                            <BiEdit size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="container mx-auto py-4">
            <div className='flex items-center justify-between px-6 py-6'>
                <h1 className="text-2xl font-bold mb-4 items-center">Chatbots Table</h1>
                <button
                    onClick={openModal}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700"
                >
                    Create Chatbot
                </button>
            </div>
            <CreateChatbotModal isOpen={modalOpen} onClose={closeModal} companies={companies} setMode={setMode} mode={mode} chatbot_id={chatbot_id} appData={appData} validations={validations} />
            <Table />
        </div>
    )
}

export default ChatbotComponent