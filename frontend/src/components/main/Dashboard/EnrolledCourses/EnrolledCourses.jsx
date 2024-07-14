import React, { useEffect } from 'react'
import {Title} from '../../../common/index.js'
import { useDispatch, useSelector } from 'react-redux'
import EnrolledCourse from "./EnrolledCourse.jsx"
import { nanoid } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'
import { getEnrolledCourses } from "../../../../services/operations/profile.js"

export default function EnrolledCourses() {
  const { enrolledCourses } = useSelector(state => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    let isCancelled = false
    const getCourses = () => {
      !isCancelled &&
        dispatch(getEnrolledCourses(user.token, navigate))
    }
    return () => {
      isCancelled = true
      getCourses()
    }
  })
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