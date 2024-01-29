import React, {  useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import SidebarLink from './SidebarLink'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { useLocation, useNavigate } from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'
import { useConfirmationModalContext } from '../../../contexts/ConfirmationModalProvider'
import ConfirmationModal from "../../common/ConfirmationModal"
import { logout } from '../../../services/operations/auth'
export default function Sidebar() {
    const {user}  = useSelector(state => state.profile)
    const location = useLocation()
    const navigate = useNavigate() 
    const dispatch = useDispatch()
    
    const {confirmationModal , setConfirmationModal} = useConfirmationModalContext()
  return (
    <aside className='relative hidden sm:grid bg-custom-tertiary text-pure-greys-200 h-full '>
        <ul>
            {
                sidebarLinks.map(link => {
                    if( link?.type === user.accountType || link?.type === "") { 
                        return <SidebarLink key={nanoid()} icon={link.icon} text={link.name} linkto={link.path} isActive={location.pathname === link.path} />
                    }
                })
            }
            <div className = "border-b-2 border-b-pure-greys-200 border-opacity-30 w-11/12 mx-auto my-2">
            </div>
            <div>
                <SidebarLink icon={"VscSettingsGear"} text ="Settings" linkto="settings"
                isActive={location.pathname === "/dashboard/settings"}/>
                
            </div>
            <div>
                <button onClick={() => { 
                    setConfirmationModal({ 
                        text1 :"Are You Sure ?"
                        ,text2 :"You will be Logged Out Of Your Account."
                        ,button1Text : "Logout"
                        ,button2Text : "Cancel"
                        ,button1Handler : e => dispatch(logout(user.email , navigate))
                        ,button2Handler : e => setConfirmationModal(null)
                    })
                }} className={`py-2 px-4 flex items-center gap-3 w-full`}>
                    <span><VscSignOut /></span>
                    <span>Logout</span>
                </button>
            </div>
        </ul>
        { 
            confirmationModal && <ConfirmationModal />
        }
    </aside>
    
  )
}
