import React from 'react'
import { ActiveIconButtonStyle, InActiveIconButtonStyles } from '../../styles/constantsStyles'
export default function ConfirmationModalButtons({ modalData }) {
    return (
        <>
            <button onClick={modalData.button1Handler} className={ActiveIconButtonStyle}>
                <span>{modalData.button1Text}</span>
            </button>
            <button onClick={modalData.button2Handler} className={InActiveIconButtonStyles}>
                <span>{modalData.button2Text}</span>
            </button></>
    )
}
