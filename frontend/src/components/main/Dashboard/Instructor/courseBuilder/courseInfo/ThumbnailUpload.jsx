import React, { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Label } from '../../../../../common/form'
import { IoCloudUploadSharp } from 'react-icons/io5'
function ThumbnailUpload() {
    const imageInputRef = useRef()
    const { register, getValues, setValue } = useFormContext()
    const [thumbnailFile , setThumbnailFile] = useState("")
    const [thumbnailImage, setThumbnailImage] = useState("")
    const handleThumbnailUpload = async (e) => {
        const file = e.target.files[0]
        if (file) {
            let reader = new FileReader()
            reader.onload = () => {
                setThumbnailImage(reader.result);
            };
            reader.readAsDataURL(file);
            setThumbnailFile(file)
        }
    }
    //update the value to the use form hook form
    useEffect(()=> { 
        setValue("thumbnail" , thumbnailFile)
    }, [thumbnailFile])

    return (
        <>
            <Label htmlFor={"thumbnail"}> Thumbnail </Label>
            <label className='w-full h-max overflow-hidden bg-custom-tertiary rounded-md my-1 grid place-items-center grid-cols-1 text-custom-secondary p-4'>
                <input type="file" id='thumbnail' className='hidden w-full h-full' onChange={handleThumbnailUpload} ref={imageInputRef} />
                {
                    thumbnailImage === "" ? <>
                        <div className='w-max h-max p-2 border-2 border-yellow-100 rounded-full'>
                            <IoCloudUploadSharp className='text-xl text-yellow-100' />
                        </div>
                        <div className='text-center'>
                            <p>Drag and drop an image, or <span className='text-yellow-100'>Browse</span></p>
                            <p>Max 6MB each (12MB for videos)</p>
                        </div>
                        <ul className='text-center lg:list-disc md:flex w-full justify-evenly'>
                            <li>Aspect ratio 16:9</li>
                            <li>Recommended size 1024x576</li>
                        </ul>
                    </> : <>
                        <img src={thumbnailImage} alt="course thumbnail image" className='w-[400px] max-h-[300px] rounded-md ' />
                    </>
                }
            </label>
        </>
    )
}

export default ThumbnailUpload