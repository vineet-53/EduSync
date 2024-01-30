import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { changePassword } from '../../../../services/operations/profile'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import {IconButton }from '../../../common'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
export default function ChangePassword() {
    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        defaultValues: {
            password: "",
            confirmPassword: "",
        }
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfrimPassword] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.profile)
    const handleChangePasswordForm = (data) => {
        const { password, confirmPassword } = data
        if (password !== confirmPassword) {
            setError('confirmPassword', {
                type: 'manual',
                message: 'Passwords do not match',
            });
        } else {
            dispatch(changePassword(password, confirmPassword, user.token, navigate))
        }
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleShowConfirmPassword = () => {
        setShowConfrimPassword(!showConfirmPassword)
    }
    return (
        <>
            <div className=''>
                <form onSubmit={handleSubmit(handleChangePasswordForm)} className='md:grid md:grid-cols-2 md:grid-rows-1 md:gap-2' >
                    <div>
                        <div className='relative'>
                            <label className='text-custom-secondary' htmlFor="password"> Password
                            </label>
                            <input className='w-full  bg-richblack-600 text-white  px-4 py-2 rounded-md ' type={showPassword ? "text" : "password"} id='password' placeholder='Enter Password' {...register
                                ("password", { required: "Password is required" })} />
                            {/* {errors.password && <p className='text-yellow-100'>Please Enter New Password</p>} */}

                            <div className='w-6 h-6 absolute right-2 top-[50%] '>
                                {
                                    !showPassword ?
                                        <IoMdEye onClick={handleShowPassword} className='w-full h-full text-custom-secondary' />
                                        :
                                        <IoMdEyeOff onClick={handleShowPassword} className='w-full h-full text-custom-secondary' />
                                }
                            </div>
                        </div>
                        {errors.password && <p className='text-yellow-200'>{errors.password.message}</p>}
                    </div>
                    <div>
                        <div className='relative'>
                            <label className='text-custom-secondary' htmlFor="confirmPassword"> Confirm Password
                            </label>
                            <input className='w-full bg-richblack-600 text-white  px-4 py-2 rounded-md ' type={showConfirmPassword ? "text" : "password"} id='confirmPassword' placeholder='Enter Confirm Password' {...register("confirmPassword", { required: "Confirm password is required" })} />
                            {/* {errors.confirmPassword && <p className='text-yellow-100'>Please Enter Confrim New Password</p>} */}

                            <div className='w-6 h-6 absolute right-2 top-[50%] '>
                                {
                                    !showConfirmPassword ?
                                        <IoMdEye onClick={handleShowConfirmPassword} className='w-full h-full text-custom-secondary' />
                                        :
                                        <IoMdEyeOff onClick={handleShowConfirmPassword} className='w-full h-full text-custom-secondary' />

                                }
                            </div>
                        </div>
                        {errors.confirmPassword && <p className='text-yellow-200'>{errors.confirmPassword.message}</p>}
                    </div>
                    <div className='grid col-span-2 relative'>
                        <div className='flex gap-2 md:gap-5 w-full flex-row-reverse absolute bottom-[-5em]'>
                            <IconButton type="submit" onClick={handleSubmit} isActive={true}>
                                Save
                            </IconButton>
                            <IconButton onClick={() => navigate('/dashboard/my-profile')} isActive={false}>
                                Cancel
                            </IconButton>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
