import React, { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Label } from '../../../../../common/form'
import { ErrorInputFieldStyle, FormInputFieldStyle } from '../../../../../../styles/constantsStyles'
import { MdOutlineClose } from "react-icons/md";
import { nanoid } from '@reduxjs/toolkit'
function Tags() {
    const { register, formState: { errors }, setValue } = useFormContext()
    const [tags, setTags] = useState([])
    const handleAddTag = async (e) => {
        if (e.key === "Enter") {
            if (e.target.value === "") {
                return
            }
            // check the tag in tags array 
            const isTagPresent = tags?.find(value => value.replace(" ", "") === e.target.value.replace(" ", ""))
            if (isTagPresent) {
                console.log("Dublicate Tag")
                return
            }
            // push the tag in tag array 
            await setTags(prev => [...prev , e.target.value])
            e.target.value = ""
        }
    }
    // set the value of tags if tag changes
    const handleRemoveTag = (index) => {
        // remove the tag from array on the basis of index
        setTags(prev => prev.filter((value, ind) => ind !== index))
        // 
    }
    useEffect(()=> { 
        setValue("tag", tags)
    } , [tags])
    return (
        <>
            <Label htmlFor="tags">Tags</Label>
            <input  type="text" onKeyDown={handleAddTag} className={FormInputFieldStyle} placeholder='Enter Tags' />
            {
                tags?.map((tag, index) => <div key={nanoid()} className='flex gap-2 text-white'>
                    <p>{tag}</p>
                    <MdOutlineClose onClick={() => handleRemoveTag(index)} className='my-auto' />
                </div>)
            }
            {errors.tag && <p className={ErrorInputFieldStyle}>{errors.tag.message}</p>}
        </>
    )
}

export default Tags