import React from 'react'
import { MdEdit } from "react-icons/md";
export default function IconButton({children , onClick, isActive ,buttoncss , icon , type}) {
    return (
        <button
            onClick={onClick}
            type = {type}
            className={`${isActive ? "bg-yellow-100" : "bg-custom-secondary" }  ${buttoncss}`}
        >
            {children}
            {icon == "Edit" && <span><MdEdit /></span>}
        </button>
    )
}
