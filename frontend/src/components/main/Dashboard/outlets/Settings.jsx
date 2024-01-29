import React from 'react'
import Title from '../Title'
import Section from "../../../common/Section"
import UpdateProfilePicture from '../UpdateProfilePicture'
import ChangePassword from '../ChangePassword'
import UpdateProfile from "../UpdateProfile.jsx"
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
      </div>
    </>
  )
}
