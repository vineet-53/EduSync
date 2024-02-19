import React, { useState } from 'react'
import { useSelector } from "react-redux"
import CourseInformation from './courseInfo/CourseInformation'
import CoursePublish from "./CoursePublish"
import CourseBuilder from "./CourseBuilder"
import { nanoid } from "@reduxjs/toolkit"
function RenderSteps() {
  const { currentStep } = useSelector(state => state.course)
  const stepsList = [
    {
      title: "Course Information",
      id: 1,
    },
    {
      title: "Course Builder",
      id: 2,
    },
    {
      title: "Course Publish",
      id: 3,
    },
  ]
  return (
    <div className='w-full '>
      {/* steps */}
      <div>
        {
          stepsList?.map(steps => {
            return <div key={nanoid()}>

            </div>
          })
        }
      </div>
      {/* course forms */}
      <div className='w-full '>
        {/* display form according to the steps  */}
        {currentStep == 1 && <CourseInformation />}
        {currentStep == 2 && <CourseBuilder />}
        {currentStep == 3 && <CoursePublish />}
      </div>
    </div>
  )
}
export default RenderSteps