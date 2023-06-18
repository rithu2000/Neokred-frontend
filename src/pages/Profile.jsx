import { useEffect, useState } from 'react'
import ProfilePic from '../assets/profile.png'
import Header from '../components/Header'
import { userProfile } from '../axios/axios'

function Profile() {
    const [userData, setUserData] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        try {
            const response = await userProfile()
            console.log(response);
            setUserData(response)
        } catch (error) {
            console.error(error);
        }
      };
      fetchData();
    }, [])

    return (
        <>
        <Header user={userData}/>
            <div className='flex w-full justify-center items-center'>
                <div className='w-[70%] flex mt-24'>
                    <div className='w-[40%] relative'>
                        <div className='bg-slate-200 absolute right-10 rounded-full flex justify-center w-1/4 items-center'>
                            <img className='w-full h-auto' src={ProfilePic} alt="" />
                        </div>
                    </div>
                    {/* {userData.length > 0 && userData.map((user) => ( */}
                    <div className=' w-[40%] border rounded p-3'>
                        <h1 className='text-base text-gray-500'>PROFILE</h1>
                        <div className='grid grid-cols-2 w-full mt-5 gap-5'>
                            <div>
                                <h1 className='text-gray-500'>Name</h1>
                            </div>
                            <div>
                                <h1 className='text-gray-500'>{userData.fullName}</h1>
                            </div>
                            <div>
                                <h1 className='text-gray-500'>Email</h1>
                            </div>
                            <div>
                                <h1 className='text-gray-500'>{userData.emailAddress}</h1>
                            </div>
                            <div>
                                <h1 className='text-gray-500'>DOB</h1>
                            </div>
                            <div>
                                <h1 className='text-gray-500'>{userData.dateOfBirth}</h1>
                            </div>
                            <div>
                                <h1 className='text-gray-500'>Phone number</h1>
                            </div>
                            <div>
                                <h1 className='text-gray-500'>{userData.phoneNumber}</h1>
                            </div>
                            <div>
                                <h1 className='text-gray-500'>Address</h1>
                            </div>
                            <div>
                                <h1 className='text-gray-500'>{userData.address}</h1>
                            </div>
                            <div>
                                <h1 className='text-gray-500'>City</h1>
                            </div>
                            <div>
                                <h1 className='text-gray-500'>{userData.city}</h1>
                            </div>
                            <div>
                                <h1 className='text-gray-500'>State</h1>
                            </div>
                            <div>
                                <h1 className='text-gray-500'>{userData.state}</h1>
                            </div>
                            <div>
                                <h1 className='text-gray-500'>ZIP Code</h1>
                            </div>
                            <div>
                                <h1 className='text-gray-500'>{userData.zipCode}</h1>
                            </div>
                            <div>
                                <h1 className='text-gray-500'>Country</h1>
                            </div>
                            <div>
                                <h1 className='text-gray-500'>{userData.country}</h1>
                            </div>
                            <div>
                                <h1 className='text-gray-500'>Security</h1>
                            </div>
                            <div>
                                <h1 className='text-gray-500'>{userData.securityAnswer}</h1>
                            </div>
                        </div>
                    </div>
                    {/* ))} */}
                </div>
            </div>
        </>
    )
}

export default Profile