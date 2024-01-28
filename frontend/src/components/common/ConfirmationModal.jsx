import React from 'react'
import IconButton from "./IconButton"
import { useConfirmationModalContext } from '../../contexts/ConfirmationModalProvider'
export default function ConfirmationModal() {
    const { confirmationModal: modalData, setConfirmationModal} = useConfirmationModalContext()
    const modalRef = React.useRef() 
    const handleClickedOutsideModal = (e) => { 
        if(modalRef.current && !modalRef.current.contains(e.target)) { 
            setConfirmationModal(null)
        }
    }
    document.addEventListener('mousedown' , handleClickedOutsideModal)
    return (
        <div className='absolute top-0 left-0 -mt-2 w-screen h-full backdrop-blur-sm grid place-items-center '>
            <div ref={modalRef} className='flex flex-col rounded-md bg-opacity-70 lg:bg-opacity-100 gap-8 bg-custom-primary w-96 -translate-y-8 p-6'>
                <div className=''>
                    <p className='font-bold text-3xl text-white'>{modalData.text1}</p>
                    <p className='mt-2 text-xl text-pure-greys-200 font-semibold'> {modalData.text2}</p>
                </div>
                <div className='flex gap-4'>
                    <IconButton onClick={modalData.button1Handler} isActive={true} >
                        {modalData.button1Text}
                    </IconButton>

                    <IconButton onClick={modalData.button2Handler} isActive={false}>
                        {modalData.button2Text}
                    </IconButton>

                </div>
            </div>
        </div>
    )
}
