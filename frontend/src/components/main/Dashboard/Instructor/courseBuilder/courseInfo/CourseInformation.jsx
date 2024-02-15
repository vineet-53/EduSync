import React, { useState } from 'react'
import { useForm, FormProvider } from "react-hook-form"
import { FormSubmitButton, Label } from "../../../../../common/form"
import { ErrorInputFieldStyle, FormInputFieldStyle } from '../../../../../../styles/constantsStyles'
import { IoCloudUploadSharp } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import { useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit';
import Instructions from './Instructions.jsx';
import Tags from "./Tags"

import ThumbnailUpload from "./ThumbnailUpload.jsx"
function CourseInformation() {
  const { categories } = useSelector(state => state.course)
  const methods = useForm({
    defaultValues: {
      courseName: "",
      courseDescription: "",
      whatYouWillLearn: "",
      price: "",
      tag: [],
      categoryId: "",
      instructions: [],
      thumbnail: "",
    }
  })
  const { register  , setValue , getValues, handleSubmit, formState: { errors }, setError } = methods;
  const onSubmit = (data) => {
    const {tag , instructions} = data
    console.log(data)
    if(tag?.length === 0 ) { 
      setError("tag" , { 
        type  : "validate" , 
        message:  "Please Enter tags"
      })
      return 
    }
    if(instructions?.length === 0 ) { 
      setError("instructions" , { 
        type : "validate" , 
        message: "Please Enter Instructions"

      })
      return 
    }
    console.log("data 2 ---> " , data )
  }
  return (
    <FormProvider {...methods}>
      <form onKeyDown={e => { 
        if(e.key === "Enter") { 
          e.preventDefault() 
          return 
        }
      }} onSubmit={handleSubmit(onSubmit)} className='bg-[#161D29] grid gap-4 rounded-md p-4 w-11/12 lg:w-10/12 mx-auto' >
        {
          errors.general && <p className={ErrorInputFieldStyle}>{errors.general.message}</p>
        }
        <div>
          <Label htmlFor={"courseName"}> Course Title</Label>
          <input id="courseName" type="text " {...register("courseName", { required: "Please Enter Course Title" })} placeholder='Enter Course Title' className={FormInputFieldStyle} />
          {
            errors.courseName && <p className={ErrorInputFieldStyle}>{errors.courseDescription.message}</p>
          }
        </div>
        <div>
          <Label htmlFor={"courseDescription"}> Course Description</Label>
          <input id="courseDescription" type="text " {...register("courseDescription", {
            required: "Please Enter Course Description"
          })} placeholder='Enter Course Description' className={FormInputFieldStyle} />
          {
            errors.courseDescription && <p className={ErrorInputFieldStyle}>{errors.courseDescription.message}</p>
          }
        </div>
        <div >
          <Label htmlFor={"price"}> Price </Label>
          <div className="relative">
            <input id="price" type="number" {...register("price", {
              required: "Enter Price"
            })} placeholder='Enter Price' className={FormInputFieldStyle + " pl-12"} />
            <div className='absolute top-2 left-3 rounded-full border-2 border-custom-secondary p-[3px]'>
              <FaRupeeSign className='text-custom-secondary' />
            </div>
          </div>
          {
            errors.price && <p className={ErrorInputFieldStyle}>{errors.price.message}</p>
          }
        </div>
        <div className='w-full'>
          <Label htmlFor={"category"}> Category </Label>
          <select {...register("categoryId", {
            required: "Please Select Category"
          })} id="category" className='text-pure-greys-100 bg-custom-tertiary w-full p-2 rounded-md my-1 px-2'>
            <option value="" disabled defaultChecked={true} className='text-custom-secondary' >Select Category</option>
            {
              categories?.map(category => <option key={nanoid()} value={category._id}>{category.name}</option>)
            }
          </select>
          {
            errors.categoryId && <p className={ErrorInputFieldStyle}>{errors.categoryId.message}</p>
          }

        </div>
        {/* tags */}
        <div>
          <Tags />
        </div>
        <div>
          <ThumbnailUpload />
          {errors.thumbnail && <p className={ErrorInputFieldStyle}>{errors.thumbnail.message}</p>}
        </div>
        <div >
          <Label>Benefits of the Course</Label>
          <textarea rows={7} type="text" placeholder='Enter Benefits of the course' {...register("whatYouWillLearn", {
            required: "Please Enter Benefits of the course",
            maxLength: 250
          })} className={FormInputFieldStyle} />
          {errors.whatYouWillLearn && <p className={ErrorInputFieldStyle}>{errors.whatYouWillLearn.message}</p>}
        </div>
        <div>
          {/* Instructions */}
          <Instructions />
        </div>
        <FormSubmitButton > Next </FormSubmitButton>
      </form>
    </FormProvider>
  )
}

export default CourseInformation