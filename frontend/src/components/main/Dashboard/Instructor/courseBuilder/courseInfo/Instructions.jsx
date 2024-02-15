import React, { useEffect, useState } from 'react'
import { Label } from '../../../../../common/form'
import { ActiveIconButtonStyle, ErrorInputFieldStyle, FormInputFieldStyle } from '../../../../../../styles/constantsStyles'
import { nanoid } from '@reduxjs/toolkit'
import { useFormContext } from 'react-hook-form'

function instructions() {

  const {setValue ,register , formState: { errors }, setError } = useFormContext()
  const [instructions, setInstructions] = useState([])
  const [instruction, setInstruction] = useState("")
  const handleRemoveInstruction = (instruction) => {
    if (instruction === "") {
      console.log("invalid input")
      return
    }
    setInstructions(prev => {
      return prev.filter(value => value !== instruction)
    })
  }
  const handleAddInstruction = async (instruction) => {
    // check instruction in the prev array
    const isInstructionPresent = instructions.find(value => value.replace(" "  , 
  "") === instruction.replace(" ",  ""))
    if (isInstructionPresent) {
      console.log("dublicate instruction")
      return
    }
    await setInstructions(prev => [...prev, instruction])
  }
  // update the value of instructions when instructions changes
  useEffect(()=> { 
     setValue("instructions" , instructions)
  } , [instructions])
  return (
    <>
      {/* input data  */}
      <Label htmlFor={"instructions"}>Requirements/Instructions </Label>
      <input type="text" className={FormInputFieldStyle} placeholder='Enter Instructions' />
      {
        instructions?.map(value => {
          return <div key={nanoid()}>
            <p className='text-white text-xl'>{value} <span className='text-custom-secondary mx-2 cursor-pointer' onClick={() => handleRemoveInstruction(value)}>clear</span></p>
          </div>
        })
      }
      {/* button to add instruction */}
      <button type='button' className="text-yellow-200 font-bold my-1" onClick={() => handleAddInstruction(instruction)}>Add</button>
      
    </>
  )
}

export default instructions