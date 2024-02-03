import React, { useRef, useState } from 'react'
import FormTemplate from "./FormTemplate"
import FormInputField from '../../../../../common/form/FormInputField'
import { FormProvider, useForm } from 'react-hook-form'
import { ErrorInputFieldStyle, FormInputFieldStyle, FormSelectFieldStyle } from '../../../../../../styles/constantsStyles'
import { FaRupeeSign } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { AiOutlineCloseCircle } from "react-icons/ai";
export default function CourseInfo() {
    const [tags, setTags] = useState([])
    const { categories } = useSelector(state => state.course)

    const [requirements, setRequirements] = useState([])
    const requirementRef = useRef(null)
    const methods = useForm({
        defaultValues: {
            courseName: "",
            courseDescription: "",
            whatYouWillLearn: "",
            price: "",
            tag: '',
            categoryId: "",
            requirements: '',
        }
    })
    const { register, handleSubmit, formState: { errors }, setError, getValues, setValue , clearErrors } = methods
    const handleKeyDown = async e => {
        if (e.key === "Enter") {
            e.preventDefault()
        }
    }
    const handleAppendTag = async e => {
        // check the tag is not present
        if (e.key === "Enter") {
            if (tags.find(tag => tag.trim() === e.target.value)) {
                console.log("dublicate tag ", e.target.value)
                e.target.value = ""
                return
            }
            await setTags(prev => [...prev, e.target.value])
            e.target.value = ""
        }
    }
    const handleRemoveTag = async (name) => {
        setTags(prev => prev.filter(tag => tag !== name))
    }
    const handleAppendRequirements = async e => {
        if (requirementRef.current.value === "") {
            return
        }
        if (requirements.find(requirement => requirement.trim() === requirementRef.current.value)) {
            requirementRef.current.value = ""
            return
        }
        await setRequirements(prev => [...prev , requirementRef.current.value])
        requirementRef.current.value = ''
    }
    const handleRemoveRequirements = async name => {
        setRequirements(requirements.filter(requirement => requirement !== name))
    }
    const onSubmit = async (data) => {

        if (!tags.length) {
            setError("tag", {
                type: "value",
                message: "Please Enter Tags!"
            })
            return
        }
        if (!requirements.length) {
            console.log(requirements)
            setError("requirements", {
                type: "value",
                message: "Please Enter Requirements!"
            })
            return
        }

    }
    return (
        <FormProvider {...methods}>
            <FormTemplate>
                <form onKeyDown={handleKeyDown} onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
                    <div>
                        <Label htmlFor={"courseTitle"}>
                            Course Title
                        </Label>
                        <FormInputField value="courseName" type="text" errorMsg="Course Title" placeholder="Enter Course Title" />
                        {
                            errors.courseName && <p className={ErrorInputFieldStyle}>{errors.courseName?.message}</p>
                        }
                    </div>
                    <div>
                        <Label htmlFor="courseDescription">
                            Course Short Description
                        </Label>
                        <textarea placeholder='Enter Description' id="courseDescription" className='text-white w-full p-2 px-3 bg-richblack-700 rounded-md' rows={5} {...register("courseDescription", { required: "Please Enter Course Description!" })} >


                        </textarea>
                        {
                            errors.courseDescription && <p className={ErrorInputFieldStyle}>{errors.courseDescription?.message}</p>
                        }
                    </div>
                    <div>
                        <Label htmlFor="price">
                            Price
                        </Label>
                        <div className='flex px-3 py-2 items-center gap-3 rounded-md bg-richblack-700'>
                            <span><FaRupeeSign className='text-pure-greys-200' /></span>
                            <input type="number" {...register("price", {
                                required: "Please Enter Price!", pattern: {
                                    value: /\d{1,}/
                                    , message: "Please Enter Valid Price!"
                                }
                            })}
                                placeholder='Enter Course Price'
                                className='text-white appearance-none w-full '
                            />
                        </div>
                        {
                            errors.price && <p className={ErrorInputFieldStyle}>{errors.price?.message}</p>
                        }
                    </div>
                    <div>
                        <Label>
                            Category
                        </Label>
                        <select name="category" id="category" placeholder="Select Category" {...register("categoryId", { required: "Please Enter Category!", validate: value => value !== "" })} className={FormSelectFieldStyle}>
                            <option disabled value={""} >Select Category</option>
                            {
                                categories?.map(category => <option key={nanoid()} value={category?._id}>{category?.name}</option>)
                            }
                        </select>
                        {
                            errors.categoryId && <p className={ErrorInputFieldStyle}>{errors.categoryId?.message}</p>
                        }
                    </div>
                    <div >
                        <Label htmlFor="tags">
                            Tags
                        </Label>
                        <div className='flex flex-wrap gap-2 py-2'>
                            {
                                tags.length > 0 && tags.map(tag =>
                                    <div key={nanoid()} className='px-2 py-1 rounded-full bg-yellow-400 text-white  flex gap-2'>
                                        {tag}
                                        <button onClick={() => handleRemoveTag(tag)}>
                                            <AiOutlineCloseCircle />
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                        <input type="text" placeholder='Choose a Tag' className={FormInputFieldStyle} onKeyDown={handleAppendTag} />
                        {
                            errors.tag && <p className={ErrorInputFieldStyle}>{errors.tag?.message}</p>
                        }
                    </div>
                    <div>
                        <Label htmlFor="whatYouWillLearn">
                            Benefits of the course
                        </Label>
                        <textarea placeholder='Enter Benefits of the course' id="whatYouWillLearn" className='text-white w-full p-2 px-3 bg-richblack-700 rounded-md' rows={5} {...register("whatYouWillLearn", { required: "Please Enter Benifits of Course!" })} >
                        </textarea>
                        {
                            errors.whatYouWillLearn && <p className={ErrorInputFieldStyle}>{errors.whatYouWillLearn?.message}</p>
                        }
                    </div>
                    <div>
                        <Label htmlFor="requirements">
                            Requirements/Instructions
                        </Label>
                        <input type="text" ref={requirementRef} className={FormInputFieldStyle} placeholder='Enter requirements of the course' />
                        <button type="button" className='w-full py-1 my-2 rounded-md px-2 bg-richblack-900' onClick={handleAppendRequirements} >
                            <span className='text-yellow-200 cursor-pointer font-bold'>Add</span>
                        </button>
                        <div className='flex flex-col gap-1'>
                            {
                                requirements.length > 0 &&
                                requirements.map(requirement =>
                                    <div key={nanoid()} className='w-full py-1 px-2 rounded-md text-white flex gap-2 '>
                                        <span>{requirement}</span>
                                        <button className='text-pure-greys-400 cursor-pointer' onClick={() => handleRemoveRequirements(requirement)}>
                                            clear
                                        </button>
                                    </div>)
                            }
                        </div>

                        {
                            errors.requirements && <p className={ErrorInputFieldStyle}>{errors.requirements?.message}</p>
                        }
                    </div>

                    {/* submit */}
                    <div className='w-full'>
                        <button className='px-3 py-2 bg-yellow-200 rounded-md ml-auto '>
                            Next
                        </button>
                    </div>

                </form>
            </FormTemplate>
        </FormProvider>
    )
}
function Label({ htmlFor, children }) {
    return (
        <label htmlFor={htmlFor} className="text-white">{children}<span className='text-pink-400'> *</span></label>
    )
}