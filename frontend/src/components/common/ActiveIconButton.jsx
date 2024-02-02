import React from 'react'
import { ActiveIconButtonStyle } from '../../styles/constantsStyles'

export default function ActiveIconButton({ children , buttoncss }) {
    return (
        <button className={`${ActiveIconButtonStyle} ${buttoncss}` }>
            {children}
        </button>
    )
}
