import React from 'react'
import UserComponent from './UserComponent';
import getAllUsers from '../actions/getAllUsers';
import getCurrentUser from '../actions/getCurrentUser';
import { redirect, useRouter } from 'next/navigation';

const page = async() => {
    const currentUser = await getCurrentUser();
   
    if(!currentUser){
        redirect('/login');
    }
    const users = await getAllUsers();
    
    return (
        <UserComponent users={users}/>
    )
}

export default page