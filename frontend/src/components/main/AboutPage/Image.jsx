import React from 'react'

export default function Image({src , imagecss}) {
  return (
    <img src={src} className={`${imagecss} w-full`}/>
  )
}
