import React from 'react'
import { MdEdit } from "react-icons/md";
export default function IconButton({children , onClick, isActive ,buttoncss , icon , type}) {
    return (
        <button
            onClick={onClick}
            type = {type}
            className={`${isActive ? "bg-yellow-100" : "bg-custom-secondary" } p-2 rounded-md md:px-4 md:py-2 text-black font-semibold flex items-center gap-2 text-sm lg:text-base ${buttoncss}`}
        >
            {children}
            {
                icon == "Edit" && <span><MdEdit /></span>
            }
        </button>
    )
}
