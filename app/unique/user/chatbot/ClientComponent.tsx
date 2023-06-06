'use client';
import React,{useState} from 'react'

const ClientComponent = () => {
  
    const [isChatbotEnabled, setChatbotEnabled] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const toggleChatbot = () => {
        setChatbotEnabled(!isChatbotEnabled);
    };

    const handleInputChange = (event: any) => {
        setMessage(event.target.value);
    };

    const handleSubmit = () => {
        if (message.trim() !== '') {
            const newMessage = { sender: 'user', text: message };
            // setChatHistory([...chatHistory, newMessage]);
            setMessage('');
        }
    };

    return (
        <div className="fixed bottom-0 right-0 m-4">
            {isChatbotEnabled && (
                <div className="bg-white rounded-lg shadow-xl border p-4 w-[350px] h-96 relative">
                    {/* Chatbot content */}
                    <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500"></div>
                        <div className="ml-2">
                            <p className="font-bold">Chatbot Name</p>
                            <p className="text-gray-500">Online</p>
                        </div>
                    </div>

                    <div className="overflow-y-auto max-h-48">
                        {/* Chat messages */}
                        <div className="flex flex-col space-y-2">
                            {/* Chat message components */}
                            <div className="flex">
                                <div className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                                    Hello, how can I help you?
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <div className="bg-gray-200 py-2 px-4 rounded-lg">
                                    Lorem ipsum dolor sit amet.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chat input */}
                    <div className="mt-4 absolute bottom-1 w-[91%] flex flex-row">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                        <button
                            className="bg-blue-500 text-white py-2 px-4 ml-2 rounded-md focus:outline-none"
                            onClick={handleSubmit}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}

            <button
                className={`bg-blue-500 text-white py-2 px-4 rounded-md focus:outline-none `}
                onClick={toggleChatbot}
            // disabled={isChatbotEnabled}
            >
                {isChatbotEnabled ? 'Chatbot Enabled' : 'Chatbot Disabled'}
            </button>
        </div>
    );
}

export default ClientComponent