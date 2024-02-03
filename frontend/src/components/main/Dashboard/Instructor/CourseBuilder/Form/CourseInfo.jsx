import React from 'react'
import FormTemplate from "./FormTemplate"
import FormInputField from '../../../../../common/form/FormInputField'
import { FormProvider, useForm } from 'react-hook-form'
import { FormLabelStyle } from '../../../../../../styles/constantsStyles'
import { FaRupeeSign } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'

export default function CourseInfo() {
    const {categories}  = useSelector(state => state.course)
    const methods = useForm({
        defaultValues: {
            courseName: "",
            courseDescription: "",
            whatYouWillLearn: "",
            price: "",
            tag: "",
            categoryId: "",
        }
    })
    const { register, handleSubmit, formState: { errors }, setError, getValues } = methods

    function onSubmit(data) {
        console.log(data)
    }
    return (
        <FormProvider {...methods}>
            <FormTemplate>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Label htmlFor={"courseTitle"}>
                            Course Title
                        </Label>
                        <FormInputField value="courseName" type="text" errorMsg="Course Title" placeholder="Enter Course Title" />
                    </div>
                    <div>
                        <Label htmlFor="courseDescription">
                            Course Short Description
                        </Label>
                        <textarea placeholder='Enter Description' id="courseDescription" className='text-white w-full p-2 px-3 bg-richblack-700 rounded-md' rows={5} {...register("courseDescription", { required: "Please Enter Course Description!" })} >

                        </textarea>

                    </div>
                    <div>
                        <Label htmlFor="price">
                            Price
                        </Label>
                        <div className='flex px-3 py-2 items-center gap-3 rounded-md bg-richblack-700'>
                            <span><FaRupeeSign className='text-pure-greys-200'/></span>
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
                        <div>
                            <Label>
                                Category 
                            </Label>
                            <select name="category" id="category" placeholder="Select Category">
                                { 
                                    categories?.map(category => <option key={nanoid()} value={category?._id}>{category?.name}</option>)
                                }
                            </select>
                        </div>
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