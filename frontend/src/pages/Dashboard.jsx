import React from 'react'
import {useSelector} from "react-redux"
export default function Dashboard() {
  const { user } = useSelector(state => state.profile)

  return (
    <></>
  )
}
