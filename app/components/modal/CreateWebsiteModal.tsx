'use client';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

interface CreateWebsiteModalProps {

    isOpen: boolean;
    onClose: () => void;
    users: User[]
}

const CreateWebsiteModal = ({ isOpen, onClose, users }: CreateWebsiteModalProps) => {

    const router = useRouter();

    const [name, setName] = useState('');
    const [domain, setDomain] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    const handleCreateWebsite = async (e: any) => {
        e.preventDefault();

        const data = { name, domain, user: selectedUser, status: selectedStatus,ip:'5456482asd' }
    

        await axios.post('/api/company', data)
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


    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen px-4 sm:px-6">
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                ></div>
                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                    <form onSubmit={handleCreateWebsite}>
                        <div className="bg-white px-4 py-5 sm:p-6">
                            <h2 className="text-lg font-medium mb-4">Create Website</h2>
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
                                <label htmlFor="domain" className="block text-gray-700 font-medium mb-2">
                                    Domain
                                </label>
                                <input
                                    type="text"
                                    id="domain"
                                    value={domain}
                                    onChange={(e) => setDomain(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="user" className="block text-gray-700 font-medium mb-2">
                                    User
                                </label>
                                <select
                                    id="user"
                                    value={selectedUser}
                                    onChange={(e) => setSelectedUser(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="" key={0}>--Select User--</option>
                                    {users && users.map((item,index) => (
                                        <option key={index+1} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
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
                                Create Website
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
                </div>
            </div>
        </div>
    )
}

export default CreateWebsiteModal