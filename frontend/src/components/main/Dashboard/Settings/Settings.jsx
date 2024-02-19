import React, { useEffect } from 'react'
import { Title, Section } from '../../../common/index.js'
import UpdateProfile from "./UpdateProfile.jsx"
import DeleteAccount from "./DeleteAccount.jsx"
import ChangePassword from "./ChangePassword.jsx"
import UpdateProfilePicture from "./UpdateProfilePicture.jsx"
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
          <DeleteAccount />
        </Section>
      </div>
    </>
  )
}
