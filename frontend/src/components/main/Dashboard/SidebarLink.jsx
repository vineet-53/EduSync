import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import * as Icons from "react-icons/vsc"
export default function SidebarLink({ icon, text, linkto , isActive}) {
  const Icon = Icons[icon]
  return (
    <Link to={linkto}><li className={`${isActive ? "text-yellow-50 border-l-yellow-50 border-l-2 bg-yellow-600" : ""} py-2 px-4 flex items-center gap-3 hover:bg-pure-greys-400 hover:bg-opacity-30`}>
      <span><Icon /> </span>
      <span className=''>{text}</span>
    </li></Link>
  )
}
