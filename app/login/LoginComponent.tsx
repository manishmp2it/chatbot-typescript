'use client'
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { redirect, useRouter } from "next/navigation"

const LoginComponent = () => {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        let data = { email, password }

        console.log(data)

        signIn('credentials', {
            ...data,
            redirect: false,
        })
            .then((callback) => {

                console.log(callback)

                if (callback?.ok) {
                    toast.success('Logged in');
                    router.push('/dashboard')
                    // router.refresh();
                }

                if (callback?.error) {
                    toast.error(callback.error);
                }
            });

    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                        >
                            Login
                        </button>
                    </div>

                </form>
            </div>
        </div>
  )
}

export default LoginComponent