import React from 'react'
import { InActiveIconButtonStyles } from '../../styles/constantsStyles'
import { useNavigate } from 'react-router-dom'

export default function InActiveIconButton({ navigateTo, children }) {
    const navigate = useNavigate()
    return (
        <button onClick={() => navigate(navigateTo)} className={InActiveIconButtonStyles}>
            {children}
        </button>
    )
}
