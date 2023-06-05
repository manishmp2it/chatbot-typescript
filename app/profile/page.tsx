import React from 'react'
import ProfileComponent from './ProfileComponent'

const page = () => {
    return (
        <div className="container mx-auto py-4">
            <h1 className="text-2xl font-bold mb-4">My Profile</h1>
            <ProfileComponent />
        </div>
    )
}

export default page