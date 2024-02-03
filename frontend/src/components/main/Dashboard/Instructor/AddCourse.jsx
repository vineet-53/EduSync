import React from 'react'
import { useSelector } from 'react-redux'
import Stage from './CourseBuilder/Stage'
import CourseInfo from './CourseBuilder/Form/CourseInfo'

export default function AddCourse() {
  const { currentStage ,stages } = useSelector(state => state.course)
  return (
    <div className='flex w-full gap-3 px-10'>
      <div className='lg:w-[55%] flex flex-col gap-3'>
        <div className='flex gap-2 w-full lg:mx-auto lg:my-3'>
          {/* stages */}
          <Stage stage="1" stageText="Course Information" />
          <Stage stage="2" stageText="Course Builder" />
          <Stage stage="3" stageText="Publish" />

        </div>
        <div>
          {
            currentStage == 1 && <CourseInfo />
          }
          {
            currentStage == 2 && <CourseBuilder />
          }
          { 
            currentStage == 3 && <CoursePublish />
          }
        </div>
      </div>
      <div className='lg:w-[45%]'>

      </div>
    </div>
  )
}
