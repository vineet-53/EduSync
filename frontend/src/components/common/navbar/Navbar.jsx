import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {useSelector} from "react-redux"
import { nanoid } from "@reduxjs/toolkit";
import { NavbarLinks } from '../../../data/navbar-links';
import {fetchALlCatalogs} from "../../../services/operations/course"
import NavbarButton from './NavbarButton';
import {LogoFullLight} from "../../../assets/index"
const Navbar = () => {
    const auth = useSelector(state => state.auth)
    const location = useLocation()
    const [catalogs , setCatalogs] = useState([])
    const matchPath  = (path) => { 
        return path === location.pathname
    }
    const getAllCatalog = async ()  => { 
        const data = await fetchALlCatalogs()
        console.log(data)
        if(data.status === 200)
            setCatalogs(data.data.categoryDetails)
    }
    useEffect(()=> { 
        getAllCatalog()
    },  [])
    return (
        <div className='flex items-center bg-custom-primary border-b-[1px] border-solid border-b-richblack-700  '>
            <div className="w-11/12  mx-auto py-4" >
                <nav className='flex  justify-between  items-center'>
                    <Link to="/">
                        <img src={LogoFullLight} className='object-contain w-[160px] h-[30px]' alt="" />
                    
                    </Link>
                    <div className='hidden lg:flex lg:gap-4 text-white list-none'>
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
                                    <div className='hidden group-hover:block  p-4 rounded-md absolute bottom-0 translate-y-[105%] -translate-x-52 bg-white z-20 w-[280px] h-max'>
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
                    <div className='hidden lg:flex lg:w-[160px] gap-3'>
                        {/* login signup button */}
                        { 
                            auth.token === null ? (
                            <>
                                <NavbarButton linkto="/login">
                                    Log In
                                </NavbarButton>
                                <NavbarButton linkto="/signup">
                                    Sign Up
                                </NavbarButton>
                            </>
                            ) 
                            :
                            (
                            <>
                                {/* search */}
                                <div>

                                </div>
                                {/* cart */}
                                <div>

                                </div>
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
