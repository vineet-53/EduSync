import React from 'react'
import { useSelector } from 'react-redux'

export default function Stage({ stage, stageText }) {
    const { currentStage, stages } = useSelector(state => state.course)
    return (
        <div className='text-pure-greys-200 grid gap-2 flex-1 py-3 relative'>
            <div className='flex justify-center'>
                <span className={`${currentStage.toString() === stage ? "border-yellow-200 bg-yellow-600 opacity-100" : "opacity-30"} rounded-full  text-base border-2 px-3 py-1 w-max h-max `}>{stage}</span>
            </div>
            <div className='text-center'>
                {stageText}
            </div>
            {
                stage !== stages.toString() && <div className={`${!!(currentStage - 1) && ""} border-[1px] border-dashed border-pure-greys-200 lg:w-[85%] absolute lg:left-[60%] lg:top-[30%] `}>
                </div>
            }
        </div>
    )
}
