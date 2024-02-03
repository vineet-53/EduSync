import React from 'react'
import { useConfirmationModalContext } from '../../contexts/ConfirmationModalProvider'
import ConfirmationModalButtons from './ConfirmationModalButtons'
export default function ConfirmationModal() {
    const { confirmationModal: modalData, setConfirmationModal } = useConfirmationModalContext()
    return (
        <div className='w-screen h-full absolute backdrop-blur-sm z-20'>
            <div className='absolute top-0 left-0 -mt-2 w-screen min-h-screen  grid place-items-center '>
                <div className='flex flex-col rounded-md bg-opacity-70 lg:bg-opacity-100 gap-8 bg-custom-primary w-96 -translate-y-8 p-6'>
                    <div className=''>
                        <p className='font-bold text-3xl text-white'>{modalData.text1}</p>
                        <p className='mt-2 text-xl text-pure-greys-200 font-semibold'> {modalData.text2}</p>
                    </div>
                    <div className='flex gap-4'>
                        <ConfirmationModalButtons modalData={modalData} />
                    </div>
                </div>
            </div>
        </div>
    )
}
