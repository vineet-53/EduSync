import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Primary } from '../components/common'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/main/Dashboard/Sidebar'
import ConfirmationModalProvider from "../contexts/ConfirmationModalProvider"
import { FiMenu } from "react-icons/fi";
import MobileDashboard from '../components/main/Dashboard/MobileDashboard'
import { getAndSetUserDetails } from "../services/operations/profile"
export default function Dashboard() {
  const { user, loading: profileLoading } = useSelector(state => state.profile)
  const dispatch = useDispatch()
  const { loading: authLoading } = useSelector(state => state.auth)
  const [nav, setNav] = useState(false)

  if (authLoading || profileLoading) {
    return <div>Loading...</div>
  }
  else {
    window.addEventListener("resize", e => {
      if (window.innerWidth > 638 && nav == true) {
        setNav(false)
      }
    })
    return (
      <>
        <Primary >
          <div className='md:grid grid-rows-1  grid-cols-10  min-h-screen relative'>
            <ConfirmationModalProvider>
              <div className='grid col-span-2'>
                <Sidebar />
              </div>
              <button onClick={() => setNav(true)} className='max-sm:block hidden text-white w-7 h-7 cursor-pointer absolute top-1 left-3'>
                <FiMenu className='w-full h-full' />
              </button>
              {
                nav && <MobileDashboard handleNav={() => setNav(!nav)} />
              }
            </ConfirmationModalProvider>
            <div className='grid col-span-8 px-2 py-2'>
              <Outlet />
            </div>
          </div>
        </Primary>
      </>
    )
  }
}
