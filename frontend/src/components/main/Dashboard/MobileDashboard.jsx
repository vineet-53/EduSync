import React, { useRef, useState } from 'react'
import SidebarLink from './SidebarLink'
import { sidebarLinks } from '../../../data/dashboard-links';
import { nanoid } from '@reduxjs/toolkit'
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../../services/operations/auth"
import { VscSettingsGear, VscSignOut } from 'react-icons/vsc';
import { useConfirmationModalContext } from '../../../contexts/ConfirmationModalProvider';
import ConfirmationModalButtons from '../../common/ConfirmationModalButtons';
export default function MobileDashboard({ handleNav }) {
    const { confirmationModal: modalData, setConfirmationModal } = useConfirmationModalContext()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.profile)

    return (
        <div>
            <nav className='absolute w-full bg-custom-tertiary text-custom-secondary backdrop-blur h-full pt-10'>
                <button onClick={handleNav} className='max-sm:flex text-white hidden w-7 h-7 cursor-pointer absolute top-2 right-6 hover:animate-pulse duration-700'>
                    <MdClose className='w-full h-full' />
                </button>
                <ul className=''>
                    <button className='w-full' onClick={handleNav}>
                        {sidebarLinks.map(link => {
                            if (link?.type === user.accountType || link?.type === "") {
                                return <SidebarLink key={nanoid()} icon={link.icon} text={link.name} linkto={link.path} isActive={location.pathname === link.path} />
                            }
                        })}
                    </button>

                </ul>
                <div className='w-full'>
                    <button className={`${location.pathname === "/dashboard/settings" ? "text-yellow-50 border-l-yellow-50 border-l-2 bg-yellow-600" : ""} py-2 px-4 flex items-center gap-3 hover:bg-pure-greys-400 hover:bg-opacity-30 w-full`}
                        onClick={() => {
                            navigate('/dashboard/settings')
                            handleNav()
                        }}
                    >
                        <span><VscSettingsGear /></span>
                        Settings
                    </button>
                </div>
                <div>
                    <button onClick={() => {
                        setConfirmationModal({
                            text1: "Are You Sure",
                            text2: "This will Logout You from Account."
                            , button1Text: "Logout"
                            , button2Text: "Cancel",
                            button1Handler: () => {
                                dispatch(logout(user.email, navigate))

                            },
                            button2Handler: () => {
                                setConfirmationModal(null)
                            }
                        })
                    }} className={`py-2 px-4 flex items-center gap-3 w-full`}>
                        <span><VscSignOut /></span>
                        <span>Logout</span>
                    </button>
                </div>
                {
                    modalData && <div className='w-full grid place-content-center absolute top-0 min-h-screen backdrop-blur'>
                        <div className='flex gap-4 flex-col bg-custom-primary py-5 px-4 rounded-md'>
                            <div className=''>
                                <p className='font-bold text-2xl text-white'>{modalData.text1}</p>
                                <p className=' text-base text-pure-greys-200 font-semibold'> {modalData.text2}</p>
                            </div>
                            <div className='flex gap-4'>
                                <ConfirmationModalButtons modalData={modalData} />
                            </div>
                        </div>
                    </div>
                }
            </nav >
        </div>
    )
}
