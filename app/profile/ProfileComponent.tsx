import React from 'react'

const ProfileComponent = () => {

    const profileData = {
        name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        location: 'New York City, USA',
        avatar: 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
      };

    return (
        <div className="container mx-auto p-8">
            <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex justify-center mt-4">
                    <img
                        src={profileData.avatar}
                        alt="Profile Avatar"
                        className="w-32 h-32 object-cover rounded-full"
                    />
                </div>
                <div className="text-center mt-4">
                    <h1 className="text-xl font-semibold">{profileData.name}</h1>
                    <p className="text-gray-600">@{profileData.username}</p>
                </div>
                <div className="px-6 py-4">
                    <p className="text-gray-700">{profileData.bio}</p>
                    <div className="mt-4">
                        <p className="text-gray-600">
                            <span className="font-semibold">Email:</span> {profileData.email}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Location:</span> {profileData.location}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileComponent