import React from 'react'
import { ActiveIconButtonStyle } from '../../styles/constantsStyles'

export default function ActiveIconButton({ type , children , buttoncss }) {
    return (
        <button type={type} className={`${ActiveIconButtonStyle} ${buttoncss}` }>
            {children}
        </button>
    )
}
