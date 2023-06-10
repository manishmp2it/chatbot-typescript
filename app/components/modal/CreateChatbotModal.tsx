'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast';
import { Validation } from '@prisma/client';
import { MdOutlineDeleteOutline } from "react-icons/md"
import ImageUpload from '../inputs/ImageUpload';


interface CreateChatbotModalProps {

    isOpen: boolean
    onClose: () => void;
    companies: any;
    mode: string;
    setMode: any;
    chatbot_id: string;
    appData: any;
    validations: Validation[]
}

interface Question {
    text: string;
    lead_field: string;
    validation_id: string;
    answerable: string;
    options: string[];
}

const CreateChatbotModal = ({ isOpen, onClose, companies, mode, setMode, chatbot_id, appData, validations }: CreateChatbotModalProps) => {

    const router = useRouter();

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [themeColor, setThemeColor] = useState('#000000');
    const [status, setStatus] = useState('');
    const [selectedDoamin, setSelectedDomain] = useState('');

    const [activeTab, setActiveTab] = useState('app');

    const [questions, setQuestions] = useState<Question[]>([
        { 'text': '', 'lead_field': '', 'validation_id': '', 'answerable': 'false', options: [] },
    ]);

    useMemo(async () => {
        if (mode === "Edit") {

            setName(appData?.name);
            setSelectedDomain(appData?.company_id);
            setThemeColor(appData?.theme_color);
            setStatus(appData?.status)
            setImage(appData.image)

            await axios.get(`/api/question/${chatbot_id}`)
                .then((response) => {
                    const updatedQuestions = [...response.data];
                    setQuestions(updatedQuestions)
                })
                .catch((error) => {
                    toast.error(error);
                })
        }
    }, [chatbot_id])


    const handleTabChange = (tab: any) => {
        setActiveTab(tab);
    };

    const handleQuestionChange = (index: any, field: 'text' | 'lead_field' | 'validation_id' | 'answerable', value: any) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][field] = value;
        setQuestions(updatedQuestions,);
    };

    const handleAnswerAdd = (index: any) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].options.push('');
        setQuestions(updatedQuestions);
    };

    const handleAnswerChange = (index: any, answerIndex: any, value: any) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].options[answerIndex] = value;
        setQuestions(updatedQuestions);
    };
    const handleRemoveAnswer = (index: any, answerIndex: any,) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].options.splice(answerIndex, 1);
        setQuestions(updatedQuestions);
    };

    console.log(questions);

    const handleAddQuestion = () => {
        setQuestions([...questions, { text: '', lead_field: '', validation_id: '', answerable: 'false', options: [] }]);
    };

    const handleRemoveQuestion = (index: any) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
    };

    const handleCreateChatbot = async (e: any) => {
        e.preventDefault();

        const data = { name, theme_color: themeColor, status, company: selectedDoamin,image }

        await axios.post('/api/chatbot', data)
            .then(() => {
                toast.success('Created Successfully!');
                router.refresh();
            })
            .catch((error) => {
                toast.error(error);
            })
            .finally(() => {
                // setIsLoading(false);
            })

        onClose();
        e.target.reset();
    };


    const handleCreateQuestion = async (e: any) => {
        e.preventDefault();

        let isError = false;

        const data = { questions, chatbot_id }

        questions.map((item) => {
            if (item.lead_field == '' || item.text == '') {
                isError = true;
            }
        })

        if (isError) {
            toast.error('please fill Entry properly');
        } else {
            await axios.post('/api/question', data)
                .then(() => {
                    toast.success('Created Successfully!');
                    // router.refresh();
                })
                .catch((error) => {
                    toast.error(error);
                })
                .finally(() => {
                    // setIsLoading(false);
                })

            onClose();
        }
        e.target.reset();
    };


    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        setImage(file);
    };

    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen px-4 sm:px-6">
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                ></div>
                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                    <div className="flex justify-between border-b border-gray-200">
                        <button
                            className={`w-1/2 py-4 text-center ${activeTab === 'questions' ? 'bg-indigo-600 text-white' : 'text-gray-700'
                                }`}
                            onClick={() => handleTabChange('questions')}
                        >
                            Questions
                        </button>
                        <button
                            className={`w-1/2 py-4 text-center ${activeTab === 'app' ? 'bg-indigo-600 text-white' : 'text-gray-700'
                                }`}
                            onClick={() => handleTabChange('app')}
                        >
                            App
                        </button>
                    </div>

                    <div className="bg-white px-4 py-5 sm:p-6">
                        {activeTab === 'questions' && (
                            <form onSubmit={handleCreateQuestion}>
                                <div className=' overflow-y-auto h-[425px]'>
                                    {questions.map((question, index) => (
                                        <div key={index} className="mb-4 mx-2 rounded-md drop-shadow-sm shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-8 shadow-indigo-200">
                                            <label htmlFor={`question-${index}`} className="block text-gray-700 font-medium mb-2">
                                                Question {index + 1}
                                            </label>
                                            <textarea
                                                id={`question-${index}`}
                                                value={question.text}
                                                onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            ></textarea>
                                            <label htmlFor={`leadField-${index}`} className="block text-gray-700 font-medium mb-2 mt-4">
                                                Lead Field
                                            </label>
                                            <input
                                                type="text"
                                                id={`leadField-${index}`}
                                                value={question.lead_field}
                                                onChange={(e) => handleQuestionChange(index, 'lead_field', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            <label htmlFor={`validation-${index}`} className="block text-gray-700 font-medium mb-2 mt-4">
                                                Validation
                                            </label>
                                            <select
                                                id={`validation-${index}`}
                                                value={question.validation_id}
                                                onChange={(e) => handleQuestionChange(index, 'validation_id', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            >
                                                <option value="" key={0}>Select a validation</option>
                                                {validations && validations.map((item, index) => (
                                                    <option key={index + 1} value={item.id}>{item.name}</option>

                                                ))}
                                            </select>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    handleQuestionChange(index, 'answerable', 'true')
                                                    handleAnswerAdd(index)

                                                }}
                                                className="mt-4 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-green-700 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
                                            >
                                                Add Answerable
                                            </button>
                                            {question.answerable === "true" ? <div>
                                                {question.options.map((answer, answerIndex) => (
                                                    <div key={answerIndex} className="flex items-center mt-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                                                            placeholder="Answer"
                                                            value={answer}
                                                            onChange={(e) =>
                                                                handleAnswerChange(index, answerIndex, e.target.value)
                                                            }
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveAnswer(index, answerIndex)}
                                                            className="ml-2 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
                                                        >
                                                            <MdOutlineDeleteOutline size={20} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div> : ''}

                                            {index > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveQuestion(index)}
                                                    className="mt-4 mb-2 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
                                                >
                                                    Remove Question
                                                </button>

                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={handleAddQuestion}
                                        className="mt-4 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
                                    >
                                        Add Question
                                    </button>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Submit Question
                                    </button>
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>

                        )}
                        {activeTab === 'app' && (

                            <form onSubmit={handleCreateChatbot}>
                                <div className="bg-white">
                                    <h2 className="text-lg font-medium mb-4">Create Chatbot</h2>
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="user" className="block text-gray-700 font-medium mb-2">
                                            Website (Domain)*
                                        </label>
                                        <select
                                            id="user"
                                            value={selectedDoamin}
                                            onChange={(e) => setSelectedDomain(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            <option value="" key={0}>--Select domain --</option>
                                            {companies && companies.map((item: any, index: any) => (
                                                <option key={index + 1} value={item.id}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="themeColor" className="block text-gray-700 font-medium mb-2">
                                            Theme Color
                                        </label>
                                        <input
                                            type="color"
                                            id="themeColor"
                                            style={{ background: themeColor }}
                                            value={themeColor}
                                            onChange={(e) => setThemeColor(e.target.value)}
                                            className={`w-full px-3 py-2 border  border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <ImageUpload onChange={(value:any) => setImage(value)}
                                            value={image} />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
                                            Status
                                        </label>
                                        <select
                                            id="status"
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            <option value="">Select a status</option>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Submit App
                                    </button>
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>

                            </form>

                        )}
                    </div>



                </div>
            </div>
        </div>
    )
}

export default CreateChatbotModal