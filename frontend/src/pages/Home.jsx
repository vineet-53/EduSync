import React from 'react'
import {  PrimaryButton, Footer } from '../components/common/index'
import {Wrapper, Primary, Secondary} from "../components/common/containers"
 import {Title , SubTitle} from "../components/common"
import {
   CodeBlock, FeatureCards, Feature,
  Line, ExpBanner
} from "../components/main/HomePage"
import { Banner, Logo1, Logo2, Logo3, Logo4, CompareWithOthers as CardImage1, KnowYourProgress as CardImage2, PlanYourLessons as CardImage3, Instructor, TimeLineLogo, } from "../assets/index.js"
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
export default function Home() {
  return (
    <>
      <Primary>
        <Wrapper>
          <div className="intro_section flex flex-col lg:pb-[10rem]">
            <div className="grid my-5 py-4 lg:place-items-center">
              <Link to="/signup">
                <button className="shadow-custom-secondary shadow-[2px_2px_0_0] text-white text-base flex items-center bg-custom-tertiary px-4 rounded-full hover:scale-95 transition-all duration-500 cursor-pointer">
                  Become an instructor <span className="pl-3 py-3">
                    <FaArrowRight />
                  </span>
                </button>
              </Link>
            </div>
            <div className="text-left lg:items-center lg:text-center flex flex-col gap-7 pb-4">
              <Title
                beforeSpanText={"Empower Your Future with "}
                spanText={"Coding Skills"}
                titlecss="text-white"
              />
              <SubTitle
                subTitle={"With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors."}
                subTitlecss="text-md"
              />
              <div className="flex py-5 gap-4">
                <PrimaryButton textColor="text-black " isActive={true} linkto="/login" hasArrow={false}>
                  Learn More
                </PrimaryButton>
                <PrimaryButton textColor="text-white" linkto="/signup" >
                  Book A Demo
                </PrimaryButton>
              </div>
            </div>
            <div className="mt-4 mb-[4rem] lg:mb-[0] w-full ">
              <video width={"90%"} autoPlay className='object-contain shadow-[10px_10px_rgba(250,255,255)] lg:shadow-[20px_20px_rgba(250,255,255)] lg:mx-auto ' loop muted>
                <source src={Banner} type="video/mp4" />
              </video>
            </div>
          </div>
          <div className="code_block_section flex flex-col gap-12 lg:gap-[10rem] lg:py-20">
            <CodeBlock
              beforeSpanText="Unlock your "
              spanText="coding potential "
              afterSpanText="with our online courses."
              titlecss="text-white text-3xl lg:text-4xl"
              subTitle="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
              buttonText1="Try it Yourself"
              buttonText2="Learn More"
              backgroundGradient=""
              animationText={`<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
              animationContainerGradent=""
              reverse={false}
            />
            <CodeBlock
              beforeSpanText="Start "
              afterSpanText=""
              titlecss="text-white"
              spanText="coding in seconds. "
              subTitle="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
              buttonText1="Try it Yourself"
              buttonText2="Learn More"
              backgroundGradient=""
              animationText={`<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
              animationContainerGradent=""
              reverse={true}
            />
            <div className=''>
              <div className='py-[1.2rem] lg:py-[4rem] lg:text-center lg:w-full'>
                <Title
                  beforeSpanText="Unlock the "
                  spanText="Power of Code"
                  titlecss="text-white"
                />
                <SubTitle
                  subTitle="Learn to Build Anything You Can Imagine"
                />
              </div>
              <FeatureCards />
              <div className="flex py-4 gap-3 lg:w-max lg:mx-auto lg:py-12 lg:gap-3 ">
                <PrimaryButton
                  isActive={true}
                  hasArrow={true}
                  linkto={'/signup'}

                >
                  Explore Full Catalog
                </PrimaryButton>

                <PrimaryButton
                  linkto={'/login'}
                  textColor='text-white'

                >
                  Learn More
                </PrimaryButton>
              </div>
            </div>
          </div>
        </Wrapper>
      </Primary>
      <Secondary>
        <Wrapper>
          <div>
            <div className='flex flex-col lg:flex-row  mt-10 gap-4 mb-4'>
              <Title
                beforeSpanText="Get the skills you need for a "
                spanText="job that is in demand.    "
                titlecss={"text-black"}
              />
              <div className="lg:flex lg:flex-col lg:gap-10">
                <SubTitle
                  subTitle="The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills."
                  subTitlecss={"text-richblack-700"}
                />
                <div className="pt-4 lg:py-0">
                  <PrimaryButton
                    isActive={true}
                    linkto={'/login'}
                  >
                    Learn More
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
          <div className="my-12 flex flex-col gap-12 lg:flex-row lg:mt-[6rem]">
            <div className="lg:w-3/6">
              <Feature
                logoImage={Logo1}
                title="Leadership"
                subTitle="Fully committed to the success company"
              />
              <Line />

              <Feature
                logoImage={Logo2}
                title="Responsibility"
                subTitle="Students will always be our top priority"
              />
              <Line />
              <Feature
                logoImage={Logo3}
                title="Flexibility"
                subTitle="The ability to switch is an important skills"
              />
              <Line />
              <Feature
                logoImage={Logo4}
                title="Solve the problem"
                subTitle="Code your way to a solution"
              />
            </div>
            <div className='relative overflow-hidden lg:overflow-visible'>
              <div className=" w-max">
                <img className="h-screen  max-md:w-11/12 lg:w-[714px ] lg:h-[545px] lg:shadow-richblack-25 lg:shadow-[20px_20px_0_0] "
                  src={TimeLineLogo} />
              </div>
                <div className='absolute max-md:top-0 left-0 bg-caribbeangreen-700 p-4 lg:w-4/5 lg:left-[50%] lg:translate-x-[-50%] lg:bottom-[-10%] lg:flex lg:justify-evenly lg:items-center lg:h-24'>
                  <ExpBanner />
                </div>
            </div>
          </div>
          <div className="flex flex-col  lg:mt-44">
            <div className="text-left flex flex-col  gap-5">
              {/* title */}
              <Title
                titlecss="lg:text-center text-black max-md:text-2xl"
                beforeSpanText="Your swiss knife for "
                afterSpanText=""
                spanText="learning any language"
              />
              <SubTitle
                subTitle="Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more."
                subTitlecss="max-md:text-base lg:text-center"
              />
            </div>

            <div className="pt-5 lg:flex">
              {/* cards  */}
              <div className=''>
                <img className='max-md:scale-95 lg:translate-x-20 ' src={CardImage2} alt="" />
              </div>
              <div>
                <img className='max-md:translate-y-[-50px] max-md:scale-105 lg:z-20' src={CardImage1} alt="" />
              </div>
              <div>
                <img className='max-md:translate-y-[-100px] max-md:scale-105 lg:translate-x-[-100px]' src={CardImage3} alt="" />
              </div>


            </div>

            <div className="flex justify-center lg:py-10">
              {/* button */}
              <PrimaryButton
                linkto="/login"
                textColor='text-black font-bold'
                isActive={true}
              >
                Learn More
              </PrimaryButton>
            </div>
          </div>
        </Wrapper>
      </Secondary>
      <Primary>
        <Wrapper>
          <div className="flex flex-col py-10 gap-4 lg:py-[4rem]">

            <div className="flex flex-col-reverse lg:flex-row gap-10 justify-between items-center  lg:gap-20">
              <div className="overflow-hidden lg:overflow-visible">
                <img className=" shadow-[-12px_-12px_0_0] shadow-white max-h-[300px] lg:max-h-[700px]  " src={Instructor} alt="" />
              </div>
              <div className="flex flex-col gap-4 lg:w-3/6">
                <Title
                  titlecss="text-white"
                  beforeSpanText="Become an "
                  spanText="instructor"
                />
                <SubTitle
                  subTitle="Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                            "
                  subTitlecss=""
                />
                <div className='lg:py-5'>
                  <PrimaryButton isActive={true} hasArrow={true} linkto={"/signup"}>
                    Start Teaching Today
                  </PrimaryButton>
                </div>

              </div>

            </div>
            {/* button */}

          </div>
          <div>
            {/* review testimonials  */}
          </div>
        </Wrapper>
        <Footer />
      </Primary>
    </>
  )
}
