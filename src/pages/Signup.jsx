import { useState } from 'react'
import loginImg from '../assets/login.jpg'
import logo from '../assets/Logo.png'
import eyeSlash from '../assets/eye-slash.png'
import { registerUser } from '../axios/axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


function Signup() {
    const navigate = useNavigate()
    const [errors, setErrors] = useState({});
    const [signupData, setSignupData] = useState([])
    const [showPassword, setShowPassword] = useState(true)
    const validDate = new Date().toISOString().split('T')[0];

    const handleChange = async (e) => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const isValid = validateForm();
            if (isValid) {
                const response = await registerUser(signupData)
                if (response.message) {
                    toast.success(response.message)
                    navigate('/login')
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    const validateForm = () => {
        const newErrors = {};

        if (!signupData.fullName?.trim()) {
            newErrors.fullName = 'required';
        } else if (!/^[A-Za-z ]+$/.test(signupData.fullName)) {
            newErrors.fullName = 'Alphabetic characters only';
        } else if (signupData.fullName.length > 50) {
            newErrors.fullName = 'Maximum 50 characters long';
        }

        if (!signupData.emailAddress?.trim()) {
            newErrors.emailAddress = 'required';
        } else if (!/\S+@\S+\.\S+/.test(signupData.emailAddress)) {
            newErrors.emailAddress = 'Email Address is not valid';
        }

        if (!signupData.password?.trim()) {
            newErrors.password = 'required';
        } else if (signupData.password?.length < 8) {
            newErrors.password = 'Minimum 8 characters long';
        } else if (!/[A-Z]/.test(signupData.password) || !/\d/.test(signupData.password)) {
            newErrors.password = 'Atleast one uppercase and one digit';
        }

        if (!signupData.confirmPassword?.trim()) {
            newErrors.confirmPassword = 'required';
        } else if (signupData.confirmPassword !== signupData.password) {
            newErrors.confirmPassword = 'Password mismatch';
        }

        if (!signupData.dateOfBirth?.trim()) {
            newErrors.dateOfBirth = 'required';
        } else if (isNaN(Date.parse(signupData.dateOfBirth))) {
            newErrors.dateOfBirth = 'Date of Birth is not valid';
        }

        if (!signupData.phoneNumber?.trim()) {
            newErrors.phoneNumber = 'required';
        } else if (!/^\d{10}$/.test(signupData.phoneNumber)) {
            newErrors.phoneNumber = 'Please enter a valid 10 digit number';
        }

        if (!signupData.address?.trim()) {
            newErrors.address = 'required';
        } else if (signupData.address?.length > 100) {
            newErrors.address = 'Address should not be maximum 100 characters long';
        }

        if (!signupData.city?.trim()) {
            newErrors.city = 'required';
        } else if (!/^[A-Za-z ]+$/.test(signupData.city)) {
            newErrors.city = 'Only alphabetic characters';
        } else if (signupData.city.length > 50) {
            newErrors.city = 'City should not be maximum 50 characters long';
        }

        if (!signupData.state?.trim()) {
            newErrors.state = 'required';
        }

        if (!signupData.zipCode?.trim()) {
            newErrors.zipCode = 'required';
        } else if (!/^\d{6}$/.test(signupData.zipCode)) {
            newErrors.zipCode = 'Zip Code should be a 6-digit number';
        }

        if (!signupData.country?.trim()) {
            newErrors.country = 'required';
        }

        if (!signupData.securityAnswer?.trim()) {
            newErrors.securityAnswer = 'required';
        } else if (signupData.securityAnswer.length > 100) {
            newErrors.securityAnswer = 'Security Answer should be maximum 100 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <div className='w-full flex justify-center items-center h-auto grid-cols-2'>
            <div className='w-full grid p-10 lg:p-0 lg:grid-cols-2'>
                <div className='p-10 w-full hidden relative lg:block'>
                    <img className='rounded-xl h-full w-full object-cover object-center' src={loginImg} alt='loginImg' />
                    <img className='absolute top-14 left-14' src={logo} alt="logo" />
                </div>
                <div className='py-8'>
                    <h2 className='text-xl text-gray-500'>Welcome</h2>
                    <h1 className='text-4xl'>Sign up</h1>
                    <form>
                        <div className='w-full grid grid-cols-2'></div>
                        <div className='grid grid-cols-1 gap-5 w-full mt-5 p-2'>
                            <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-2'>
                                <div>
                                    <label htmlFor="fullName" className='text-base text-gray-500'>Full name</label> {errors.fullName && <span className="text-red-500 text-xs">{`*${errors.fullName}`}</span>}
                                    <input className='border w-full p-3 rounded-md' id='fullName' type="text" placeholder='john Doe' name='fullName' onChange={handleChange} required />
                                </div>
                                <div>
                                    <label htmlFor="email" className='text-base text-gray-500'>Email</label> {errors.emailAddress && <span className="text-red-500 text-xs">{`*${errors.emailAddress}`}</span>}
                                    <input className='border w-full p-3 rounded-md' id='email' type="text" placeholder='john.snow@gmail.com' name='emailAddress' onChange={handleChange} />
                                </div>
                            </div>
                            <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-2'>
                                <div>
                                    <label htmlFor="dob" className='text-base text-gray-500'>Date of birth</label> {errors.dateOfBirth && <span className="text-red-500 text-xs">{`*${errors.dateOfBirth}`}</span>}
                                    <input className='border w-full p-3 rounded-md' id='dob' type="date" placeholder='12/12/12' max={validDate} name='dateOfBirth' onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="password" className='text-base text-gray-500'>Password</label> {errors.password && <span className="text-red-500 text-xs">{`*${errors.password}`}</span>}
                                    <input className='border w-full p-3 rounded-md' id='password' type="password" placeholder='*********' name='password' onChange={handleChange} />
                                </div>
                            </div>
                            <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-2'>
                                <div>
                                    <label htmlFor="phoneNumber" className='text-base text-gray-500'>Phone Number</label> {errors.phoneNumber && <span className="text-red-500 text-xs">{`*${errors.phoneNumber}`}</span>}
                                    <input className='border w-full p-3 rounded-md' id='phoneNumber' type="text" placeholder='+91-9876543210' name='phoneNumber' onChange={handleChange} />
                                </div>
                                <div className='relative'>

                                    <label htmlFor="confirmPassword" className='text-base text-gray-500'>Confirm password</label> {errors.confirmPassword && <span className="text-red-500 text-xs">{`*${errors.confirmPassword}`}</span>}
                                    <input className='border w-full p-3 rounded-md' id='confirmPassword' type={`${showPassword ? "password" : "text"}`} placeholder='*********' name='confirmPassword' onChange={handleChange} />
                                    <img className='absolute right-2 top-1/2 cursor-pointer' onClick={() => setShowPassword(!showPassword)} src={eyeSlash} alt="" />
                                </div>
                            </div>
                            <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-2'>
                                <div className='flex flex-col'>
                                    <label htmlFor="securityQuestion" className='text-base text-gray-500'> Security Question</label> {errors.securityAnswer && <span className="text-red-500 text-xs">{`*${errors.securityAnswer}`}</span>}
                                    <h4 className='text-sm text-gray-500 mt-2'>What is your school name?</h4>
                                    <input className='border w-full p-3 rounded-md' id='securityQuestion' type="text" name='securityAnswer' onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col w-full mt-2 p-2'>
                            <label htmlFor="address" className='text-base text-gray-500'>Address</label> {errors.address && <span className="text-red-500 text-xs">{`*${errors.address}`}</span>}
                            <input className='border w-full p-3 rounded-md' id='address' type="text" placeholder='*********' name='address' onChange={handleChange} />
                        </div>
                        <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 p-2 mt-2'>
                            <div>
                                <label htmlFor="city" className='text-base text-gray-500'>City</label> {errors.city && <span className="text-red-500 text-xs">{`*${errors.city}`}</span>}
                                <input className='border w-full p-3 rounded-md' id='city' type="text" placeholder='*********' name='city' onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="state" className='text-base text-gray-500'>State</label> {errors.state && <span className="text-red-500 text-xs">{`*${errors.state}`}</span>}
                                <input className='border p-3 w-full rounded-md' id='state' type="text" placeholder='*********' name='state' onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="zipcode" className='text-base text-gray-500'>ZIP code</label> {errors.zipCode && <span className="text-red-500 text-xs">{`*${errors.zipCode}`}</span>}
                                <input className='border p-3 w-full rounded-md' id='zipcode' type="text" placeholder='*********' name='zipCode' onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="country" className='text-base text-gray-500'>Country</label> {errors.country && <span className="text-red-500 text-xs">{`*${errors.country}`}</span>}
                                <input className='border p-3 w-full rounded-md' id='country' type="text" placeholder='*********' name='country' onChange={handleChange} />
                            </div>
                        </div>
                        <button className='bg-blue-600 text-white px-36 py-4 rounded-md mt-8 hover:bg-white duration-300 border border-blue-500 hover:text-blue-500' onClick={handleSubmit}>Sign up</button>
                    </form>
                    <div className='mt-2'>
                        <span className='text-sm text-gray-400'>Already have an account?</span>
                        <button className='text-blue-600 text-sm ml-2 underline underline-offset-1' onClick={() => navigate('/login')}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup