import React, { useState } from 'react'
import {Card} from "../../main/index"
import {HomePageExplore as cardsData} from "../../../data/homepage-explore"
import {v4 } from "uuid"
function FeatureCards() {
    const [data , setData] = useState(cardsData[0].courses)
  return (

    <div className='flex flex-col gap-5'>
        {/* card */}
        <div className='hidden lg:flex'>
            {/* tabs */}
        </div>
        <div className='flex  flex-col lg:flex-row gap-10 lg:justify-center'>
        {
            data.map((course , index) => {
                return <Card 
                    key ={v4()}
                    isActive={index === 0? true :false}
                    title={course.heading}
                    subTitle={course.description}
                    footer1={course.level}
                    footer2={"Lesson"}
                    footer1Quantity={course.lessionNumber}
                />
            })
        }
        </div>

    </div>
  )
}

export default FeatureCards