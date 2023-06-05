'use client';
import React, { useState } from 'react'
import CreateWebsiteModal from '../components/modal/CreateWebsiteModal';
import { Company, User } from '@prisma/client';
import {BiEdit} from "react-icons/bi"

interface WebsiteComponentProps {
    users: User[];
    companies: any;
}

const WebsiteComponent = ({ users, companies }: WebsiteComponentProps) => {

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };


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
                                Name
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
                        {companies && companies.map((row: any, index: any) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{row.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{row.user.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{row.status}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        <button
                                            onClick={()=>{}}
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
            <h1 className="text-2xl font-bold mb-4">Websites Table</h1>
            <button
                onClick={openModal}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700"
            >
                Create Website
            </button>
            <CreateWebsiteModal isOpen={modalOpen} onClose={closeModal} users={users} />
            <Table />
        </div>
    )
}

export default WebsiteComponent