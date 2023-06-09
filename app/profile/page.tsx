import React from 'react'
import ProfileComponent from './ProfileComponent'
import getCurrentUser from '../actions/getCurrentUser';
import { redirect } from 'next/navigation';

const page = async() => {

    const currentUser = await getCurrentUser();

    if(!currentUser){
      redirect('/login');
    }
    
    return (
        <div className="container mx-auto py-4">
            <div className='flex items-center justify-between px-6 py-6'>
                <h1 className="text-2xl font-bold mb-4 items-center">My Profile</h1>
            </div>
            <ProfileComponent />
        </div>
    )
}

export default page