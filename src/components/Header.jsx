import React from 'react'
import logo from '../assets/Logo.png'

function Header({user}) {
    return (
        <div className='w-full h-14 border-b border-gray-300 flex justify-between items-center p-4'>
            <div>
                <img className='h-8 w-auto' src={logo} alt="" />
            </div>
            <div className='flex flex-col'>
                <h1 className='text-sm text-gray-500'>{user.fullName}</h1>
                <h1 className='text-sm text-gray-600'>NK Admin</h1>
            </div>
        </div>
    )
}

export default Header