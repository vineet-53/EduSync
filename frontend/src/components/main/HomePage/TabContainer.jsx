import React from 'react';
import { useState } from 'react';
import {HomePageExplore as TabData} from "../../../data/homepage-explore"
import { v4 as uuidv4 } from 'uuid';
import Tab from './Tab';
import Card from "./Card"
import {PrimaryButton} from "../../common/index"
const TabContainer = () => {
    const [isActiveTab , setIsActiveTab]  = useState(TabData[0].tag)
    const [tabData  , setTabData] = useState(TabData[0].courses)
    const handleClickedTab  = (event) => {  
        setIsActiveTab(event.target.innerHTML)

    }
    const handleClickedTabData  = (data) => {  
        // find the tab data
        // console.log(data)
        // set tab data 
        setTabData(data)
    }

    return (
        <>
            <div className='w-max bg-richblack-800 lg:p-1 rounded-full mx-auto flex justify-between gap-4 relative'>
                {TabData.map(tab => { 
                return <Tab 
                    key ={uuidv4()}
                    title = {tab.tag}
                    titlecss ="text-white"
                    tabcss = {isActiveTab === tab.tag ? "text-white bg-richblack-900" : ""} 
                    isActiveTab = {isActiveTab}    
                    handleClickedTab = {handleClickedTab}
                    handleClickedTabData = {handleClickedTabData}
                    data = {tab.courses}
                />
                })}
            </div>
            <div className='flex lg:gap-12 lg:h-[300px] flex-wrap'>
                {
                    tabData.map((data  , index)=> { 
                        return <Card 
                            key ={uuidv4()}
                            isActive ={index==0 ? true : false}
                            title ={data.heading}
                            subTitle ={data.description}
                            footer1 = {data.level}
                            footer2 ={"Lesson"}
                            footer1Quantity =""
                            footer2Quantity ={data.lessionNumber}
                        />
                    })
                }
            </div >

            <div className='w-4/5  mx-auto flex justify-center gap-4'>
                    <PrimaryButton 
                        isActive= {true}
                        hasArrow ={true}
                        linkto={'/signup'}
                    >
                        Explore Full Catalog
                    </PrimaryButton>
                    
                    <PrimaryButton 
                        linkto={'/login'}
                        textColor='text-white'
                    >
                        Learn More
                    </PrimaryButton>
            </div>
        </>
    );
}

export default TabContainer;
