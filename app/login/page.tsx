import React, { useState } from 'react';

import { redirect, useRouter } from "next/navigation"
import getCurrentUser from '../actions/getCurrentUser';

import LoginComponent from './LoginComponent';

const LoginPage = async() => {
   
    const currentUser = await getCurrentUser();


    if(currentUser){
      redirect('/dashboard');
    }
   
    return (
        <LoginComponent/>
    );
};

export default LoginPage;