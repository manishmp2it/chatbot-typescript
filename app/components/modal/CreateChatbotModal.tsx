'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast';

interface CreateChatbotModalProps {

    isOpen: boolean
    onClose: () => void;
    companies: any;
    mode:string;
    setMode:any;
    chatbot_id:string;
    appData:any
}

const CreateChatbotModal = ({ isOpen, onClose, companies,mode,setMode,chatbot_id,appData }: CreateChatbotModalProps) => {

    const router = useRouter();

    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [themeColor, setThemeColor] = useState('#000000');
    const [status, setStatus] = useState('');
    const [selectedDoamin, setSelectedDomain] = useState('');

    const [activeTab, setActiveTab] = useState('app');


    useMemo(()=>{
        if(mode==="Edit"){
            console.log("first")
            console.log(chatbot_id);
            console.log(appData)

            setName(appData?.name);
            setSelectedDomain(appData?.company_id);
            setThemeColor(appData?.theme_color);
            setStatus(appData?.status)
        }
    },[chatbot_id])

    const [questions, setQuestions] = useState([
        { 'question': '', 'leadField': '', 'validation': '' },
    ]);

    const handleTabChange = (tab: any) => {
        setActiveTab(tab);
    };

    const handleQuestionChange = (index: any, field: 'leadField'|'question'|'validation', value: any) => {
        const updatedQuestions = [...questions ];
        updatedQuestions[index][field] = value;
        setQuestions(updatedQuestions,);
    };

    console.log(questions);

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: '', leadField: '', validation: '' }]);
    };

    const handleRemoveQuestion = (index: any) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
    };


    const handleCreateChatbot = async(e: any) => {
        e.preventDefault();
    
        const data={name,theme_color:themeColor,status,company:selectedDoamin}
        
        await axios.post('/api/chatbot', data)
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
        e.target.reset();
    };

    const handleCreateQuestion = (e: any) => {
        e.preventDefault();
    }

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
                                        <div key={index} className="mb-4 rounded-md shadow-md p-8 shadow-indigo-200">
                                            <label htmlFor={`question-${index}`} className="block text-gray-700 font-medium mb-2">
                                                Question {index + 1}
                                            </label>
                                            <textarea
                                                id={`question-${index}`}
                                                value={question.question}
                                                onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            ></textarea>
                                            <label htmlFor={`leadField-${index}`} className="block text-gray-700 font-medium mb-2 mt-4">
                                                Lead Field
                                            </label>
                                            <input
                                                type="text"
                                                id={`leadField-${index}`}
                                                value={question.leadField}
                                                onChange={(e) => handleQuestionChange(index,'leadField', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            <label htmlFor={`validation-${index}`} className="block text-gray-700 font-medium mb-2 mt-4">
                                                Validation
                                            </label>
                                            <select
                                                id={`validation-${index}`}
                                                value={question.validation}
                                                onChange={(e) => handleQuestionChange(index, 'validation', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            >
                                                <option value="">Select a validation</option>
                                                <option value="required">Required</option>
                                                <option value="numeric">Numeric</option>
                                                <option value="email">Email</option>
                                            </select>
                                            {index > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveQuestion(index)}
                                                    className="mt-4 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
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