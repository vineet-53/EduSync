import React from 'react'
import {useSelector} from "react-redux"
import { Primary, Wrapper } from '../components/common'
import SubSection from "../components/main/Dashboard/SubSection.jsx"
export default function Dashboard() {
  const { user } = useSelector(state => state.profile)

  return (
    <>
      <Primary >
          <div className='grid '>
            <aside className='bg-custom-tertiary'></aside>
            <div>
              <section className='grid grid-cols-1 grid-flow-row max-w-[800px] gap-5'>
                <h1>My Profile</h1>
                <SubSection>
                    <div className='flex justify-between items-center '>
                        <div className='flex gap-2 text-pure-greys-50 '>
                          <img src={user.image} className='rounded-full w-[50px] h-[50px]'/>
                          <div className='flex flex-col justify-center'>
                            <p className='font-bold'>{user.firstName + " " + user.lastName}</p>
                            <p className='text-pure-greys-200'>  {user.email}</p>
                          </div>
                        </div>


                        <button className=' rounded-md bg-yellow-25 text-black text-center w-max px-3 py-2 font-bold'>Edit <span></span></button>
                    </div>  

                </SubSection>
                <SubSection></SubSection>
                <SubSection></SubSection>
              </section>
            </div>
          </div>
      </Primary>
    </>
  )
}
