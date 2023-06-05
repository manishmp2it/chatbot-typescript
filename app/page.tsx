
import React from 'react';
import {redirect} from "next/navigation"
import getCurrentUser from './actions/getCurrentUser';
 
export default async function Home() {

  const currentUser = await getCurrentUser();


  if(!currentUser){
    redirect('/login');
  }
  else{
    redirect('/dashboard');
  }

  return (<></>)
}
