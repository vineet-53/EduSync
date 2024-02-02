import React from 'react'
import ContactForm from '../components/main/AboutPage/ContactusForm'
import Footer from "../components/common/Footer"
export default function Contactus() {
    return (
        <>
            <div className='lg:gap-4 flex-col-reverse lg:flex-row flex min-h-screen bg-custom-primary lg:p-20 sm:p-10 p-5 gap-5'>
                <div className='lg:w-[40%]'>
                    <div className='rounded-md p-4 lg:w-full bg-richblack-700 flex flex-col gap-2 text-pure-greys-200'>
                        <div className='flex gap-2'>
                            <div>
                                {/* logo */}

                            </div>
                            <div>
                                <h4 className='text-white font-bold'> Chat with us </h4>
                                <div className='flex flex-col'>
                                    <p>something with us </p>
                                    <p>something with us </p>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div>
                                {/* logo */}

                            </div>
                            <div>
                                <h4 className='text-white font-bold'> Chat with us </h4>
                                <div className='flex flex-col'>
                                    <p>something with us </p>
                                    <p>something with us </p>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div>
                                {/* logo */}
                            </div>
                            <div>
                                <h4 className='text-white font-bold'> Chat with us </h4>
                                <div className='flex flex-col'>
                                    <p>something with us </p>
                                    <p>something with us </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <form action="" className='border-2 border-pure-greys-200  border-opacity-65 p-4 rounded-md lg:w-[60%]'>

            </form> */}
                <div className='border-2 border-pure-greys-200  border-opacity-65 p-4 rounded-md lg:w-[60%]'>
                    <div className='p-4'>
                        <ContactForm
                            details={
                                {
                                    title: "Got a Idea? We’ve got the skills.Let’s team up",
                                    subTitle: "Tall us more about yourself and what you’re got in mind.",
                                    tilte: "text-xl"
                                }
                            }
                        />
                    </div>
                </div>
            </div>
            {/* review slider from components */}
            <Footer />
        </>
    )
}
