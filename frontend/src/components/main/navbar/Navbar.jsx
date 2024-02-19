import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { nanoid } from "@reduxjs/toolkit";
import { NavbarLinks } from '../../../data/navbar-links';
import { setAllCatalog } from "../../../services/operations/course"
import NavbarButton from './NavbarButton';
import { LogoFullLight } from "../../../assets/index"
import { IoCaretDownCircleSharp, IoCartOutline } from "react-icons/io5";
import { ACCOUNT_TYPE } from '../../../utils/constants';
import ProfileDropDown from './ProfileDropDown';
const Navbar = () => {
    const auth = useSelector(state => state.auth)
    const location = useLocation()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.profile)
    const [accoutDropDown, setAccountDropDown] = useState(false)
    const [profileDropDown, setProfileDropDown] = useState(false)
    const { categories } = useSelector(state => state.course)
    const [catalogs, setCatalogs] = useState([])
    const matchPath = (path) => {
        return path === location.pathname
    }
    const { cartTotal } = useSelector(state => state.cart)
    const handleAccountOptions = e => {
        setAccountDropDown(!accoutDropDown)
    }
    useEffect(() => {
        dispatch(setAllCatalog())
        setCatalogs(categories)
    }, [])
    return (
        <div className='flex items-center bg-custom-primary border-b-[1px] border-solid border-b-richblack-700  h-16'>
            <div className="w-11/12  mx-auto py-4" >
                <nav className='flex  justify-between items-center'>
                    <Link to="/">
                        <img src={LogoFullLight} className='object-contain w-[140px] lg:w-[150px] h-[30px]' alt="" />

                    </Link>
                    {
                        <div className='hidden lg:flex lg:gap-4 text-white list-none'>
                            {
                                NavbarLinks.map(navLink => {
                                    return navLink.title !== "Catalog" ? <Link key={nanoid()} to={navLink.path}>
                                        <li className={`${matchPath(navLink.path) ? "text-yellow-50" : ""} cursor-pointer`} >
                                            {navLink.title}
                                        </li>
                                    </Link>
                                        :
                                        <div key={nanoid()} className='group relative cursor-pointer'>
                                            {navLink.title}
                                            <div className='hidden group-hover:block p-4 rounded-md absolute bottom-0 translate-y-[105%] -translate-x-52 bg-white z-20 w-[280px] h-max'>
                                                {catalogs.length > 0 ? catalogs.map(catalog => (
                                                    <Link key={nanoid()} to={"/catalog/" + catalog._id}>
                                                        <div className='text-base px-2 py-5 rounded-md hover:bg-richblack-100 text-custom-tertiary '>
                                                            {catalog.name}
                                                        </div>
                                                    </Link>
                                                )) : <>
                                                    <div className='px-2 py-5 rounded-md hover:bg-richblack-100 text-custom-tertiary text-xl font-bold'>Loading....</div>
                                                </>}
                                            </div>
                                            {catalogs.length > 0 && <div className='hidden group-hover:block  bg-white w-[50px] h-[50px] absolute top-8 rotate-45 z-10 left-0 '>

                                            </div>}
                                        </div>
                                })
                            }
                        </div>
                    }
                    <div className='hidden sm:flex  gap-4 items-center  '>
                        {/* login signup button */}
                        {
                            auth.token === null && user === null ? (
                                <>
                                    <div className='hidden lg:flex gap-3'>
                                        <NavbarButton linkto="/login">
                                            Log In
                                        </NavbarButton>
                                        <NavbarButton linkto="/signup">
                                            Sign Up
                                        </NavbarButton>
                                    </div>
                                </>
                            )
                                :
                                (
                                    <div className='flex justify-evenly items-center gap-2 md:gap-4 relative'>
                                        {/* search */}
                                        <div>

                                        </div>
                                        <div className='relative'>
                                            {/* cart */}
                                            {ACCOUNT_TYPE.STUDENT === user.accountType &&

                                                <Link to="/dashboard/cart">
                                                    <IoCartOutline className=' text-white cursor-pointer' size={25} >
                                                    </IoCartOutline >
                                                    <span className='text-white text-sm absolute -right-1 -top-2 bg-pink-200 px-1 animate-bounce rounded-full font-bold'>{cartTotal}</span>
                                                </Link>
                                            }
                                        </div>
                                        <div className='flex items-center gap-1'>
                                            <img src={user?.image} className='rounded-full w-[30px] cursor-pointer' onClick={handleAccountOptions} />
                                            <IoCaretDownCircleSharp className='cursor-pointer text-white' onClick={() => setProfileDropDown(!profileDropDown)} />
                                        </div>
                                        {/* profile */}
                                        {
                                            profileDropDown && <ProfileDropDown handleDropDown= {() => setProfileDropDown(false)} />
                                        }
                                    </div>
                                )
                        }
                    </div>
                    <div className='max-sm:flex hidden '>

                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Navbar;
