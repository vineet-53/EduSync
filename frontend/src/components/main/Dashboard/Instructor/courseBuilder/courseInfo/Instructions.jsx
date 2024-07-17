import { useEffect, useRef, useState } from "react";
import { Label } from "../../../../../common/form";
import { useFormContext } from "react-hook-form";
import { FormInputFieldStyle } from "../../../../../../styles/constantsStyles";
import { nanoid } from "@reduxjs/toolkit";

export default function Instructions() {
  const { setValue } = useFormContext();
  const inputRef = useRef(null);
  const [instructionArray, setInstructionArray] = useState([]);
  const handleAddInstruction = (instruction) => {
    if (instruction == "") {
      return;
    }
    const isInstructionPresent = instructionArray.find(
      (value) => value == instruction,
    );
    if (isInstructionPresent) {
      inputRef.current.value = "";
      return;
    }
    setInstructionArray((prev) => [...prev, instruction]);
    setValue("instructions", instructionArray);
    inputRef.current.value = "";
  };
  const handleRemoveInstruction = (ind) => {
    const modifiedInstructionArray = instructionArray.filter((value, index) => {
      if (index != ind) {
        return value;
      }
    });
    setInstructionArray(modifiedInstructionArray);
    setValue("instructions", modifiedInstructionArray);
  };
  useEffect(() => {
    setValue("instructions", instructionArray);
  }, [setValue, instructionArray]);
  return (
    <>
      {/* input data  */}
      <Label htmlFor={"instructions"}>Requirements/Instructions </Label>
      <input
        type="text"
        className={FormInputFieldStyle}
        placeholder="Enter Instructions"
        ref={inputRef}
      />
      {instructionArray?.map((value, index) => {
        return (
          <div key={nanoid()}>
            <p className="text-white text-sm">
              {value}
              <span
                className="text-custom-secondary mx-2 cursor-pointer"
                onClick={() => handleRemoveInstruction(index)}
              >
                clear
              </span>
            </p>
          </div>
        );
      })}
      {/* button to add instruction */}
      <button
        type="button"
        className="text-yellow-200 font-bold my-1"
        onClick={() => handleAddInstruction(inputRef.current.value)}
      >
        Add
      </button>
    </>
  );
}
