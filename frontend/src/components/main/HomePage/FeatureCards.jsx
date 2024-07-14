import React, { useState } from 'react'
import Card from "./Card.jsx"
import { nanoid } from '@reduxjs/toolkit'
import { v4 } from "uuid"
import {HomePageExplore as cardsData} from "../../../data/homepage-explore.js"
import Tab from "./Tab"
function FeatureCards() {
    const [data, setData] = useState(cardsData[0].courses)
    const [activeTab , setActiveTab] = useState("Free")
    return (

        <div className='flex flex-col gap-10'>
            {/* card */}
            <div className='hidden lg:flex text-custom-secondary lg:mx-auto bg-custom-tertiary rounded-full py-1 px-1'>
                {/* tabs */}
                {
                    cardsData.map(card => <Tab 
                        key= {nanoid()}
                        title = {card.tag}
                        activeTab= {activeTab}
                        handleActiveTab = {name => setActiveTab(name)}
                        handleOnclick ={e => setData(card.courses)}
                    />)
                }
            </div>
            <div className='flex  flex-col lg:flex-row gap-10 lg:justify-center'>
                {
                    data.map((course, index) => {
                        return <Card
                            key={v4()}
                            isActive={index === 0 ? true : false}
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