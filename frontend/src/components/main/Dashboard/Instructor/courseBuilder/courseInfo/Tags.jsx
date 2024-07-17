import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "../../../../../common/form";
import {
  ErrorInputFieldStyle,
  FormInputFieldStyle,
} from "../../../../../../styles/constantsStyles";
import { MdOutlineClose } from "react-icons/md";
import { nanoid } from "@reduxjs/toolkit";
function Tags() {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const inputRef = useRef(null);
  const [tags, setTags] = useState([]);
  const handleAdd = (tag) => {
    const isTagPresent = tags.find((value) => value == tag);
    if (isTagPresent) {
      inputRef.current.value = "";
      return;
    }
    setTags((prev) => [...prev, tag]);
    setValue("tag", tags);
    inputRef.current.value = "";
  };
  const handleRemove = (ind) => {
    const modifiedTagsArray = tags.filter((value, index) => {
      if (index != ind) {
        return value;
      }
    });
    setTags(modifiedTagsArray);
    setValue("tag", tags);
  };

  useEffect(() => {
    setValue("tag", tags);
  }, [setValue, tags]);
  return (
    <>
      <Label htmlFor="tags">Tags</Label>
      <input
        ref={inputRef}
        type="text"
        onKeyDown={(e) => {
          if (e.code == "Enter") {
            handleAdd(inputRef.current.value);
          }
        }}
        className={FormInputFieldStyle}
        placeholder="Enter Tags"
      />
      {tags?.map((tag, index) => (
        <div key={nanoid()} className="flex gap-2 text-white">
          <p>{tag}</p>
          <MdOutlineClose
            onClick={() => handleRemove(index)}
            className="my-auto"
          />
        </div>
      ))}
      {errors.tag && (
        <p className={ErrorInputFieldStyle}>{errors.tag.message}</p>
      )}
    </>
  );
}

export default Tags;
