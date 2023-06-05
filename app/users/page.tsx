import React, { useState } from 'react'
import UserComponent from './UserComponent';
import getAllUsers from '../actions/getAllUsers';

const page = async() => {

    const users = await getAllUsers();

    return (
        <UserComponent users={users}/>
    )
}

export default page