import React from 'react'
import logo from '../assets/Logo.png'
import { useNavigate } from 'react-router-dom'

function Header({user}) {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear()
        navigate('/login')
    }
    return (
        <div className='w-full h-14 border-b border-gray-300 flex justify-between items-center p-4'>
            <div>
                <img className='h-8 w-auto' src={logo} alt="" />
            </div>
            <div className='flex '>
                <h1 className='text-base p-1 text-gray-500'>{user.fullName}</h1>
                <button className='bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-white duration-300 border border-blue-500 hover:text-blue-500' onClick={handleLogout} >Logout</button>
            </div>
        </div>
    )
}

export default Header