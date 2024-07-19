import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import EditSection from "./EditSection.jsx";
import {
  setEditSection,
  setEditSectionId,
  setShowAddLectureForm,
} from "../../../../../../slices/courseSlice.js";
import { deleteSection } from "../../../../../../services/operations/course.js";
import { nanoid } from "@reduxjs/toolkit";
export default function Section({ section }) {
  const [addLectureButtonState, setAddLectureButtonState] = useState(true);
  const sectionId = section._id;
  const { course, editSection, editSectionId, showAddLectureForm } =
    useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  let data = {
    courseId: course._id,
    sectionId,
  };
  function handleAddLecture() {
    dispatch(setShowAddLectureForm(true));
    dispatch(setEditSectionId(sectionId));
  }
  function handleDeleteSection() {
    dispatch(deleteSection(data, token));
  }
  function handleEditSection() {
    dispatch(setEditSection(true));
    dispatch(setEditSectionId(sectionId));
  }
  if (editSection && editSectionId && sectionId == editSectionId) {
    return <EditSection section={section} key={nanoid()} />;
  } else {
    return (
      <div>
        <div className="flex justify-between px-2 py-2">
          <div>
            <span className="capitalize text-xl text-custom-secondary">
              {section?.sectionName}
            </span>
          </div>
          <div className="text-pure-greys-300 items-center flex gap-3 text-sm font-bold">
            <span>
              <FaEdit
                onClick={handleEditSection}
                className={"text-yellow-200 cursor-pointer"}
                size={25}
              />
            </span>
            <span
              onClick={() => {
                handleDeleteSection(sectionId);
              }}
            >
              <MdDelete
                className={"text-yellow-200 cursor-pointer"}
                size={25}
                color={"red"}
              />
            </span>
            <span
              onClick={() => {
                setAddLectureButtonState((prev) => !prev);
              }}
            >
              {addLectureButtonState ? (
                <IoEyeOff
                  className={"text-blue-300 cursor-pointer"}
                  size={24}
                />
              ) : (
                <IoEye size={24} />
              )}
            </span>
          </div>{" "}
        </div>
        <div className="border-[1px] border-pure-greys-100 opacity-15 "></div>
        {addLectureButtonState && (
          <button
            onClick={handleAddLecture}
            className="text-yellow-100 pl-2 my-2 flex gap-2 items-center"
          >
            <IoMdAddCircleOutline> </IoMdAddCircleOutline>
            Add Lecture
          </button>
        )}
      </div>
    );
  }
}
