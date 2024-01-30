import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import IconButton from '../../common/IconButton';
import InputTemplate from "./form/Input"
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom"
import country_codes from "../../../data/countrycode.json"
import { updateProfile } from "../../../services/operations/profile"
import { nanoid } from '@reduxjs/toolkit';
import { logout } from "../../../services/operations/auth"
export default function UpdateProfile() {
    const { user } = useSelector(state => state.profile)
    const { profile } = user
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const methods = useForm({
        defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            contactNumber: profile?.contactNumber.split(' ')[1],
            countryCode: profile?.contactNumber.split(' ')[0],
            about: profile?.about,
            gender: profile?.gender,
            dob: profile?.dob,
        }
    })
    const { register, setValue, handleSubmit, watch, formState: { errors } } = methods
    const submitProfileForm = (data) => {
        console.log(data)
        dispatch(updateProfile(user.token, data, navigate))
    }
    useEffect(() => {
        // Set default values after form initialization
        setValue("firstName", user?.firstName);
        setValue("lastName", user?.lastName);
        setValue("contactNumber", profile?.contactNumber?.split(' ')[1]);
        setValue("countryCode", profile?.contactNumber?.split(' ')[0] || '');
        setValue("about", profile?.about);
        setValue("gender", profile?.gender);
        setValue("dob", profile?.dob);
    }, [user, profile, setValue]);
    return (<form onSubmit={handleSubmit(submitProfileForm)} className='w-full flex flex-col gap-2 lg:grid lg:grid-cols-2 lg:grid-flow-row lg:gap-3'>

        <InputTemplate>
            <label htmlFor="firstname" className='text-custom-secondary'>First Name </label>
            <input className='bg-richblack-600 text-white  px-4 py-2 rounded-md ' type="text" id='firtName' placeholder='Enter First Name' {...register('firstName', { required: true })} />
            {errors.firstName && <p className='text-yellow-100'>Please Enter First Name</p>}
        </InputTemplate>
        <InputTemplate>
            <label className='text-custom-secondary' htmlFor="lastName">Last Name</label>
            <input className='bg-richblack-600 text-white  px-4 py-2 rounded-md ' type="text" id='lastName' placeholder='Enter Last Name' {...register("lastName", { required: false })} />
            {errors.lastName && <p className='text-yellow-100'>Please Enter Last Name</p>}
        </InputTemplate>

        <InputTemplate>
            <label className='text-custom-secondary' htmlFor="dob">Date of Birth</label>
            <input className='bg-richblack-600 text-white  px-4 py-2 rounded-md ' type="date" id='dob' {...register("dob", { required: true })} />
            {errors.dob && <p className='text-yellow-100'>Please Enter Date of Birth</p>}
        </InputTemplate>
        {/* gender */}
        <InputTemplate>
            <label htmlFor="gender" className='text-custom-secondary'>Gender</label>
            <select className='bg-richblack-600 text-white  px-4 py-2 rounded-md' id="gender" {...register("gender", { required: true })}>
                <option value="Male">
                    Male
                </option>
                <option value="Female">
                    Female
                </option>
                <option value="Other">
                    Other
                </option>
            </select>
        </InputTemplate>
        <InputTemplate>
            <label className='text-custom-secondary' htmlFor="phoneNumber">Contact Number</label>
            <div className='flex flex-col sm:grid grid-cols-5 gap-2'>
                <select className='bg-richblack-600 text-white grid col-span-1  items-center rounded-md max-sm:py-2 px-2' {...register("countryCode", { required: true })} defaultValue={register('countryCode')} >
                    {
                        country_codes.map(code => <option key={nanoid()} value={code.code}>{code.country}</option>)
                    }
                </select>
                <input className='bg-richblack-600 text-white grid col-span-4 px-4 py-2 rounded-md ' type="text" id='phoneNumber' placeholder='Enter Phone Number' maxLength={10} {...register("contactNumber", { required: true, pattern: /\d{10}/ })} />
                {errors.contactNumber && <p className='text-yellow-100'>Please Enter Phone Number</p>}
            </div>
        </InputTemplate>
        <InputTemplate>
            <label className='text-custom-secondary' htmlFor="about">About</label>
            <input className='bg-richblack-600 text-white  px-4 py-2 rounded-md ' type="text" id='about' placeholder='Write Something...' {...register("about", { required: true })} maxLength={100} />
            {errors.about && <p className='text-yellow-100'>Please Enter About</p>}
        </InputTemplate>
        <div className='grid col-span-2 relative'>
            <div className='flex gap-2 md:gap-5 w-full flex-row-reverse absolute bottom-[-5em]'>
                <IconButton isActive={true}>
                    Save
                </IconButton>
                <IconButton onClick={() => navigate('/dashboard/my-profile')} isActive={false}>
                    Cancel
                </IconButton>
            </div>
        </div>
    </form>
    )
}
