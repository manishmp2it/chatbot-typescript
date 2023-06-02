'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const Sidebar = () => {

    const router = useRouter();

    const menuItems = [
        { label: 'Dashboard', link: '/' },
        { label: 'Users', link: '/users' },
        { label: 'Leads', link: '/leads' },
        { label: 'Chatbots', link: '/chatbots' },
        { label: 'Websites', link: '/websites' },
        { label: 'Profile', link: '/profile' },
    ];

    return (
        <div className="flex flex-col bg-gray-800 text-gray-200 w-64 h-screen">
            <div className="flex items-center justify-center h-16 bg-gray-900">
                <span className="text-lg font-semibold">My Sidebar</span>
            </div>
            <ul className="flex flex-col p-4 space-y-2">
                {menuItems.map((item, index) => (
                    <li key={index} >
                        <Link href={item.link}>
                            <span className="flex items-center p-2 space-x-2 rounded-md hover:bg-gray-700" >
                                <span>{item.label}</span>
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;