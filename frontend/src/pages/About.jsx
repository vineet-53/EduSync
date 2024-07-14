import React from 'react'
import { Primary, Wrapper } from "../components/common/containers"
import { Footer, PrimaryButton } from "../components/common"
import { Title, SubTitle } from "../components/common"
import Image from "../components/main/AboutPage/Image"
import { Aboutus1, Aboutus2, Aboutus3, FoundingStory } from '../assets'
import { PlanTemplate, Achievement, LearningCard } from '../components/main/AboutPage'
import ContactForm from '../components/main/AboutPage/ContactusForm'
import learning_data from '../data/learning_data'
import { nanoid } from '@reduxjs/toolkit'
export default function About() {
  return (
    <Primary>
      <Wrapper>
        <section className='flex flex-col gap-6 lg:pt-[5rem] lg:pb-[3rem]'>
          <div className='flex flex-col gap-3 py-4 lg:gap-4 lg:items-center lg:text-center lg:w-3/5 lg:mx-auto '>
            <h6 className='text-custom-secondary'> About us </h6>
            <div className='text-white '>
              <Title
                beforeSpanText="Driving Innovation in Online Education for a "
                spanText="Brighter Future"
                titlecss="text-xl lg:text-3xl"
              />
            </div>
            <SubTitle
              subTitle="Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community."
              subTitlecss="text-sm lg:text-base"
            />
          </div>
          <div className='grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-1'>
            <div>
              <Image
                src={Aboutus1}
                imagecss=""
              />
            </div>
            <div>
              <Image
                src={Aboutus2}
                imagecss=""
              />
            </div>
            <div className='block md:hidden lg:block'>
              <Image
                src={Aboutus3}
                imagecss=""
              />
            </div>

          </div>

        </section>
        <section className='lg:w-4/5 lg:mx-auto py-[3rem]'>
          <div className='text-xl text-custom-secondary lg:text-center lg:text-3xl'>
            <div className='relative flex w-full justify-center items-center p-3 lg:justify-start'>
              <svg className='' width="25" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.644531 15.9998V11.3975C0.644531 10.0907 0.900213 8.7555 1.41158 7.39187C1.92294 6.02823 2.59766 4.74272 3.43572 3.53533C4.27379 2.32795 5.18288 1.31942 6.163 0.509766L10.1687 2.87482C9.37322 4.12482 8.71982 5.43164 8.20845 6.79528C7.71129 8.15891 7.46271 9.6788 7.46271 11.3549V15.9998H0.644531ZM11.4045 15.9998V11.3975C11.4045 10.0907 11.6602 8.7555 12.1715 7.39187C12.6829 6.02823 13.3576 4.74272 14.1957 3.53533C15.0337 2.32795 15.9428 1.31942 16.9229 0.509766L20.9286 2.87482C20.1332 4.12482 19.4798 5.43164 18.9684 6.79528C18.4712 8.15891 18.2227 9.6788 18.2227 11.3549V15.9998H11.4045Z" fill="#424854" />
              </svg>
            </div>
            <span>We are passionate about revolutionizing the way we learn. Our innovative platform <span className='font-bold bg-clip-text text-transparent bg-gradient-to-tr from-blue-400 from-10% to-100% via-blue-200 to-blue-100 '>combines technology</span>, <span className="font-bold bg-clip-text text-transparent bg-gradient-to-tr from-[#FF512F] from-20% to-100% to-[#F09819]"
            >expertise</span>, and community to create an <span className="font-bold bg-clip-text text-transparent bg-gradient-to-tr from-[#E65C00] from-20% to-100% to-[#F9D423] "
            >unparalleled educational experience.</span></span>
            <div className='relative flex w-full justify-center items-center p-3 lg:justify-end'><svg width="25" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.3544 1.53673e-06V4.60228C20.3544 5.90909 20.0987 7.24432 19.5874 8.60796C19.076 9.97159 18.4013 11.2571 17.5632 12.4645C16.7251 13.6719 15.8161 14.6804 14.8359 15.4901L10.8303 13.125C11.6257 11.875 12.2791 10.5682 12.7905 9.20455C13.2876 7.84091 13.5362 6.32102 13.5362 4.64489L13.5362 9.40664e-07L20.3544 1.53673e-06ZM9.59446 5.96065e-07V4.60227C9.59446 5.90909 9.33878 7.24432 8.82742 8.60796C8.31605 9.97159 7.64134 11.2571 6.80327 12.4645C5.9652 13.6719 5.05611 14.6804 4.07599 15.4901L0.0703125 13.125C0.865768 11.875 1.51918 10.5682 2.03054 9.20455C2.5277 7.84091 2.77628 6.32102 2.77628 4.64489L2.77628 0L9.59446 5.96065e-07Z" fill="#424854" />
            </svg>
            </div>
          </div>
        </section>
        <section className='grid gap-10 lg:grid-cols-2 lg:gap-y-7 lg:grid-rows-2 lg:w-4/5 lg:mx-auto'>
          <div>
            <PlanTemplate
              tilte="Our Founding Story "
              tilteGradient="from-[#833AB4] via-[#FD1D1D] to-[#FCB045]"
              body={["Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.", "As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential."]}
            />
          </div>
          <div className='flex justify-center items-center'>
            <img src={FoundingStory} className='w-full md:max-w-[350px]' />
          </div>
          <div>
            <PlanTemplate
              tilte="Our Vision"
              tilteGradient="from-[#E65C00] to-[#F9D423]"
              body={["With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience."]}
            />
          </div>
          <div>
            <PlanTemplate
              tilte="Our Mission"
              tilteGradient="from-[#1FA2FF] via-[#A6FFCB] from-100% via-30% to-100% to-[#A6FFCB]"
              body={["our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities."]}
            />
          </div>
        </section>
      </Wrapper>
      <div className='bg-custom-tertiary'>
        <section className='grid grid-cols-2 grid-rows-2 gap-10 text-center mt-[2rem] py-[2em] lg:py-[3.5em] bg-custom-tertiary lg:grid-cols-4 lg:grid-rows-1 w-11/12 lg:w-4/5 mx-auto'>
          <Achievement
            count="5K"
            text="Active Students"
          />
          <Achievement
            count="10+"
            text="Members"
          />
          <Achievement
            count="200+"
            text="Courses"
          />
          <Achievement
            count="5K"
            text="Awards"
          />
        </section>
      </div>
      <Wrapper>
        <section className='grid py-[3rem] lg:grid-cols-4 lg:grid-rows-2 lg:py-[5rem] lg:px-[2.5rem] gap-y-5 lg:gap-y-0'>
          <div className='grid lg:col-span-2 gap-5 py-[1rem] lg:px-[1.8rem] lg:py-[.8rem]'>
            <Title
              beforeSpanText="World-Class Learning for "
              spanText="Anyone, Anywhere"
              titlecss="text-white"
            />
            <SubTitle
              subTitle="Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide."
            />
            <PrimaryButton isActive={true} linkto={"/login"}>
              Learn More
            </PrimaryButton>
          </div>
          {
            learning_data.map((card, index) => <LearningCard
              key={nanoid()}
              title={card.title}
              body={card.body}
              cardcss={index % 2 ? "bg-custom-secondary" : "bg-custom-tertiary"}
            />
            )
          }
        </section>


        <section className='flex justify-center lg:pb-[5rem]'>
          <div className='flex flex-col gap-8 lg:w-2/5'>

            <ContactForm
              details={
                {
                  title: "Get in Touch",
                  subTitle:"We’d love to here for you, Please fill out this form.",  
                  titlecss : "text-center"
                }
              }
            />
          </div>
        </section>
      </Wrapper>
      <Footer />
    </Primary>
  )
}
