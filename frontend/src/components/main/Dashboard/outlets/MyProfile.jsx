import React, { useEffect, useState } from 'react'
import Section from '../../../common/Section'
import { useSelector } from 'react-redux'
import IconButton from "../../../common/IconButton"
import PersonalDiv from '../PersonalDiv'
import Title from '../Title'
import { useNavigate } from 'react-router-dom'
export default function MyProfile() {
  const { user } = useSelector(state => state.profile)
  const { profile } = user;
  const navigate = useNavigate()
  return (
    <>
      {
        <div className='w-11/12 mx-auto'>
          <Title>
            My Profile
          </Title>
          <div className='grid grid-cols-1 grid-flow-row gap-5'>
            <Section>
              <div className='flex max-sm:gap-2  flex-row justify-between items-center'>
                <div className='flex max-sm:gap-2 gap-3 lg:gap-4 items-center'>
                  <div className='hidden md:block'>
                    <img src={user?.image} className='rounded-full w-16 h-16' alt="" />
                  </div>
                  <div className=''>
                    <p className='text-sm lg:text-base text-white'>{user?.firstName + " " + user?.lastName}</p>
                    <p className='text-sm lg:text-base text-pure-greys-100'>{user?.email}</p>
                  </div>
                </div>
                <div className=''>
                  <IconButton icon="Edit" isActive={true} onClick={() => {
                    navigate("/dashboard/settings")
                  }} >
                    <span className='hidden md:block'>Edit</span>
                  </IconButton>
                </div>
              </div>
            </Section>
            <Section>
              <div className='flex justify-between  items-center '>
                <div className='font-semibold text-xl text-white'>
                  About
                </div>
                <IconButton icon="Edit" isActive={true} onClick={() => {
                  navigate("/dashboard/settings")
                }} >
                  <span className='hidden md:block'>Edit</span>
                </IconButton>
              </div>
              <div className='text-pure-greys-200' >
                {profile?.about == "" ? <p>"Write something about Yourself"</p> : profile?.about}
              </div>
            </Section>
            <Section sectioncss="flex flex-col gap-4">
              <div className='flex justify-between  items-center  '>
                <div className='font-semibold text-xl text-white'>
                  Personal Details
                </div>
                <IconButton icon="Edit" isActive={true} onClick={() => {
                  navigate("/dashboard/settings")
                }} >
                  <span className='hidden md:block'>Edit</span>
                </IconButton>
              </div>
              <div className='text-pure-greys-200 grid md:grid-cols-2' >
                <PersonalDiv
                  label="First Name"
                  text={user?.firstName}
                />
                <PersonalDiv
                  label="Last Name"
                  text={user?.lastName}
                />
                <PersonalDiv
                  label="Email"
                  text={user?.email}
                />
                <PersonalDiv
                  label="Phone Number"
                  text={profile?.contactNumber}
                />
                <PersonalDiv
                  label="Gender"
                  text={profile?.gender}
                />
                <PersonalDiv
                  label="Date of Birth"
                  text={profile?.dob}
                />
              </div>
            </Section>
          </div>
        </div>
      }
    </>
  )
}
