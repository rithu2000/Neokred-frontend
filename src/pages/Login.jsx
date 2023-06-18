import { useState } from 'react'
import loginImg from '../assets/login.jpg'
import logo from '../assets/Logo.png'
import validator from 'validator'
import { userLogin } from '../axios/axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [loginData, setLoginData] = useState({ emailAddress: '' })
  const [isEmail, setIsEmail] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [submit, setSubmit] = useState(false)


  const handleChange = async (e) => {
    const { value, name } = e.target
    setLoginData({ ...loginData, [name]: value })
    setIsEmail(validator.isEmail(loginData?.emailAddress))
    setIsPassword(loginData?.password?.length >= 7)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true)
    try {
      if (isEmail && isPassword) {
        const response = await userLogin(loginData);
        if (response.error) {
          toast.error(response.error)
        } else if (response.message) {
          toast.success(response.message)
          const token = response.token;
          localStorage.setItem('token', token);
          navigate('/profile')
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='grid w-full h-screen lg:grid-cols-2 p-8'>
      <div className='w-full h-full relative'>
        <img className='w-full h-full object-cover object-center rounded-lg' src={loginImg} alt="" />
        <img className='absolute top-10 left-10' src={logo} alt="" />
      </div>
      <div className='flex flex-col p-32'>
        <h2 className='text-xl text-gray-500'>Welcome</h2>
        <h1 className='text-4xl'>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='mt-10'>
            <div className='flex flex-col w-full'>
              <label htmlFor="emailAddress">Email</label>
              <input className='border rounded-lg w-full p-3' id='emailAddress' type="text" placeholder='email' name='emailAddress' onChange={handleChange} />
            </div>
            <div>
              {!loginData.emailAddress && submit ? <small className='text-red-500'>*Please enter an email</small> : null}
              {!isEmail && loginData.emailAddress ? <small className='text-red-500'>*Please enter a valid email</small> : null}
            </div>
            <div className='flex flex-col w-full mt-5'>
              <label htmlFor="password">Password</label>
              <input className='border rounded-lg w-full p-3' id='password' type="password" placeholder='**********' name='password' onChange={handleChange} />
              <div>
                {!loginData.password && submit ? <small className='text-red-500'>*Please enter a password</small> : null}
                {!isPassword && loginData.password ? <small className='text-red-500'>*Minimum length of 8 characters</small> : null}
              </div>
              <p className='text-right mt-2 text-sm text-blue-600 cursor-pointer'>Forgot password?</p>
            </div>
            <button type='submit' className='bg-blue-500 rounded-lg w-full p-3 mt-5 border hover:bg-white text-white duration-300 border-blue-500 hover:text-blue-500'>Login</button>
          </div>
        </form>
        <p className='text-sm text-gray-400 mt-7'>Don't have an account?  <span className='text-blue-600 underline underline-offset-1 cursor-pointer' onClick={() => navigate('/register')}>Sign up</span></p>
      </div>
    </div>
  )
}

export default Login