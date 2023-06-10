'use client';
import { Lead } from '@prisma/client';
import React from 'react'

interface TableProps{
    leads:(Lead & {
        chat: {
            Chatbot: {
                name: string;
            };
        };
    })[]
}

const Table = ({leads}:TableProps) => {

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            ChatBot
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            LeadData
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {leads.map((row, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{row.chat?.Chatbot?.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{JSON.parse(`${row.data}`)}</div>
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table