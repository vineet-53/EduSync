import React, { useEffect } from 'react'
import Title from '../Title'
import Section from "../../../common/Section"
import UpdateProfilePicture from '../UpdateProfilePicture'
import ChangePassword from '../ChangePassword'
import UpdateProfile from "../UpdateProfile.jsx"
import { IoIosTrash } from 'react-icons/io'
export default function Settings() {
  return (
    <>
      <Title>Edit Profile</Title>

      <div className="w-11/12 mx-auto flex flex-col gap-4">
        <Section>
          <UpdateProfilePicture />
        </Section>
        <Section sectioncss="mb-[4rem]">
          <UpdateProfile />
        </Section>
        <Section sectioncss="mb-20">
          <ChangePassword />
        </Section>
        <Section sectioncss="bg-pink-800">
          <div className='flex gap-2'>
            <div>
              <IoIosTrash size={50} className='bg-pink-500 p-2 rounded-full' />
            </div>
            <div>

            </div>
          </div>
        </Section>
      </div>
    </>
  )
}
