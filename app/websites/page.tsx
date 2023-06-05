import React from 'react'
import WebsiteComponent from './WebsiteComponent'
import getAllUsers from '../actions/getAllUsers';
import getAllCompany from '../actions/getAllCompany';

const page = async() => {

    const users = await getAllUsers();
    const companies = await getAllCompany();

  return (
    <>
    <WebsiteComponent users={users} companies={companies} />
    </>
  )
}

export default page