import React from 'react'
import { ActiveIconButtonStyle } from '../../styles/constantsStyles'

export default function ActiveIconButton({ children, icon }) {
    return (
        <button className={ActiveIconButtonStyle}>
            {children}
        </button>
    )
}
