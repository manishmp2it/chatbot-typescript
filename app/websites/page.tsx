import React from 'react'
import WebsiteComponent from './WebsiteComponent'
import getAllUsers from '../actions/getAllUsers';
import getAllCompany from '../actions/getAllCompany';
import getCurrentUser from '../actions/getCurrentUser';
import { redirect } from 'next/navigation';

const page = async() => {
  const currentUser = await getCurrentUser();
   
    if(!currentUser){
        redirect('/login');
    }

    const users = await getAllUsers();
    const companies = await getAllCompany();

  return (
    <>
    <WebsiteComponent users={users} companies={companies} />
    </>
  )
}

export default page