import React from 'react'
import { Link } from 'react-router-dom'
export default function ProfileDropDown({handleDropDown}) {
  return (
    <>
      <div className='text-white bg-richblack-600 py-2 px-2 z-[99] rounded-md absolute w-max bg-opacity-90 right-0 top-[140%] flex flex-col h-max'>
        <Link onClick={handleDropDown} to="/dashboard/my-profile">
          <li className='w-full px-6 py-2 rounded-md  hover:bg-custom-primary  list-none'>Profile</li>
        </Link>
        <Link onClick={handleDropDown} to="/dashboard/settings">
          <li className='w-full px-6 py-2  rounded-md  hover:bg-custom-primary list-none'>Settings</li>
        </Link>
      </div>
    </>
  )
}
