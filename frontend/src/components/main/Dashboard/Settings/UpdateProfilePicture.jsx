import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HiOutlineUpload } from "react-icons/hi";
import {IconButton} from "../../../common"
import { useForm } from 'react-hook-form';
import { updateProfilePicture } from '../../../../services/operations/profile';

export default function UpdateProfilePicture() {
    const { user } = useSelector(state => state.profile)
    const dispatch = useDispatch()
    const [imageName, setImageName] = useState("Select")
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            image: ""
        }, 
    })
    function updateProfilePictureForm(data) {
        dispatch(updateProfilePicture(user.token, data.image))
    }
    return (
        <div className='flex items-center gap-2' >
            <img src={user?.image} className='rounded-full w-16 h-16' alt={`user image`} />
            <div className='flex flex-col gap-1'>
                <p className='text-base md:text-xl text-white'>Change Profile Picture</p>
                <form onSubmit={handleSubmit(updateProfilePictureForm)} className='flex gap-2'>
                    <label className='bg-richblack-600 px-4 py-2 rounded-md text-richblack-100 cursor-pointer ' htmlFor="file-upload" >
                        <input type="file" id="file-upload" {...register("image", { required: true , onChange : e => setImageName(e.target.files[0].name) })} className='hidden' />
                        {imageName}
                        {errors.image && <p className='text-yellow-200 text-base'>Please Select An Image</p>}
                    </label>
                    <IconButton isActive={true} >
                        <span className=''>Upload</span>
                        <span><HiOutlineUpload /></span>
                    </IconButton>
                </form>
            </div>
        </div>
    )
}
