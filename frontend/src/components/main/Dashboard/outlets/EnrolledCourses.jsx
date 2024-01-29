import React from 'react'
import Title from '../Title'
import { useSelector } from 'react-redux'
import EnrolledCourse from "../../../common/EnrolledCourse.jsx"
import { nanoid } from '@reduxjs/toolkit'

export default function EnrolledCourses() {
  const { enrolledCourses } = useSelector(state => state.profile)

  return (
    <div className='px-4'>
      <Title>Enrolled Courses</Title>
      {
        enrolledCourses?.length > 0 ?
          <div className='flex flex-col gap-3'>
            {
              enrolledCourses.map(course => <EnrolledCourse course={course} key={nanoid()} />)
            }
          </div>
          :
          <div className='grid w-full h-full place-self-center'>
            <div className="text-2xl font-bold text-white">
              Courses are not Enrolled
            </div>

          </div>
      }
    </div>
  )
}