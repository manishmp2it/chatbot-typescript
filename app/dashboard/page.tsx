'use client'
import React from 'react'
import { BsChatDotsFill } from "react-icons/bs"

const page = () => {

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white shadow">
        <div className="container mx-auto py-4 px-8">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>
      </div>
      <div className="container mx-auto py-4 px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Dashboard cards or widgets */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Card 1</h2>
            {/* Card content */}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Card 2</h2>
            {/* Card content */}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Card 3</h2>
            {/* Card content */}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Card 4</h2>
            {/* Card content */}
          </div>
        </div>
      </div>
      {/* <div className='absolute bottom-14 right-0 pb-1 transition'>
        {isChatbotOpen ? (
          <Chatbot
            config={config}

            actionProvider={ActionProvider}
            headerText='Webhopers Infotech'
            validator={validateInput}
            // runInitialMessagesWithHistory
            messageHistory={loadMessages()}
            messageParser={MessageParser}
            // saveMessages={saveMessages}
          />
        ) : null}

      </div> */}
      <button className='bg-[#2898ec] text-white p-4 right-0 bottom-1 absolute rounded-full ' onClick={()=>{}}><BsChatDotsFill size={24} /></button>
    </div>

  )
}

export default page