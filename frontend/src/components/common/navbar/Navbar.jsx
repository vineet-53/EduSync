import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import { nanoid } from "@reduxjs/toolkit";
import { NavbarLinks } from '../../../data/navbar-links';
import {fetchALLCatalogs} from "../../../services/operations/course"
import NavbarButton from './NavbarButton';
import {LogoFullLight} from "../../../assets/index"
import { IoCartOutline } from "react-icons/io5";
const Navbar = () => {
    const auth = useSelector(state => state.auth)
    const location = useLocation()
    const [catalogs , setCatalogs] = useState([])
    const {user} =useSelector(state => state.profile)
    const [accoutDropDown , setAccountDropDown] = useState(false)
    const matchPath  = (path) => { 
        return path === location.pathname
    }
    const getAllCatalog = async ()  => { 
        const data = await fetchALLCatalogs()
        if(!data.data.success)
            return
        setCatalogs(data.data.categoryDetails)
    }
   const handleAccountOptions = e => { 
    setAccountDropDown(!accoutDropDown)
   }
    useEffect(()=> { 
        getAllCatalog()
    },  [])
    return (
        <div className='flex items-center bg-custom-primary border-b-[1px] border-solid border-b-richblack-700  '>
            <div className="w-11/12  mx-auto py-4" >
                <nav className='flex  justify-between items-center'>
                    <Link to="/">
                        <img src={LogoFullLight} className='object-contain w-[140px] lg:w-[150px] h-[30px]' alt="" />
                    
                    </Link>
                    {
                        auth.token === null && <div className='hidden lg:flex lg:gap-4 text-white list-none'>
                        {
                            NavbarLinks.map(navLink => { 
                                return navLink.title !== "Catalog" ? <Link key={nanoid()} to={navLink.path}>
                                    <li className={`${matchPath(navLink.path) ?  "text-yellow-50" : ""} cursor-pointer` } >
                                        {navLink.title}
                                    </li>
                                </Link> 
                                : 
                                <div key={nanoid()} className='group relative cursor-pointer'> 
                                    {navLink.title}
                                    <div className='hidden group-hover:block p-4 rounded-md absolute bottom-0 translate-y-[105%] -translate-x-52 bg-white z-20 w-[280px] h-max'>
                                        {catalogs.length > 0 ? catalogs.map(catalog => (
                                            <Link key={nanoid()} to={"/catalog/" + catalog._id}>
                                            <div  className='text-base px-2 py-5 rounded-md hover:bg-richblack-100 text-custom-tertiary '>
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

                    {
                        auth.token !== null && <div> 
                            <p className='hidden lg:flex text-white font-bold text-xl'>Logged in Navbar</p>
                        </div> 
                    }
                    <div className='flex  gap-4 items-center '>
                        {/* login signup button */}
                        { 
                            auth.token === null ? (
                            <>
                                <div className='hidden lg:flex gap-1'>
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
                            <>
                                {/* search */}
                                <div>

                                </div>
                                {/* cart */}
                                <Link to ="/dashboard/cart">
                                    <IoCartOutline className='text-white cursor-pointer' size={20}/>
                                </Link>
                                <Link to="/dashboard/my-profile">
                                    <img src={user.image} className='rounded-full w-[30px] cursor-pointer' onClick={handleAccountOptions} />
                                </Link>
                                {/* profile */}
                                    
                            </>
                            ) 
                        }
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Navbar;
