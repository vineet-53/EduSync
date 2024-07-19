import { FormInputFieldStyle } from "../../../../../styles/constantsStyles";
import { IoMdAddCircleOutline } from "react-icons/io";
import LectureForm from "./courseBuilder/LectureForm.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  createSection,
  setCurrentCourse,
} from "../../../../../services/operations/course";
import { useEffect, useRef } from "react";
import SectionsList from "./courseBuilder/SectionsList";
function CourseBuilder() {
  const { course, showAddLectureForm } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const sections = course?.sections.length > 0 ? course.sections : [];
  const sectionInput = useRef(null);
  const submit = (e) => {
    e.preventDefault();
    if (sectionInput.current.value == "") {
      return;
    }
    let data = {
      courseId: course._id,
      sectionName: sectionInput.current.value,
    };
    dispatch(createSection(data, token));
    sectionInput.current.value = "";
  };
  useEffect(() => {
    course?._id && dispatch(setCurrentCourse(course._id, token));
  }, []);
  return (
    <>
      <div className="bg-[#161D29] grid gap-4 rounded-md py-4 px-5 w-9/12 mx-auto">
        <h2 className="text-white pl-1 font-bold text-2xl">Course Builder</h2>
        <form onSubmit={(e) => submit(e)}>
          <label htmlFor="section_name">
            <p className="text-white pl-1 text-lg my-3">Section Name:</p>
            <input
              ref={sectionInput}
              id="section_name"
              type="text "
              placeholder="Enter Secton name"
              className={FormInputFieldStyle}
            />
          </label>
          <button
            type="submit"
            className="px-4 hover:border-yellow-100 hover:text-yellow-100 my-3 flex gap-3 items-center py-2 rounded-md cursor-pointer text-yellow-200 border-2 border-yellow-200 "
          >
            Create Section{" "}
            <IoMdAddCircleOutline size={20}></IoMdAddCircleOutline>
          </button>
        </form>
        {sections.length > 0 && <SectionsList />}
      </div>
      {showAddLectureForm && <LectureForm />}
    </>
  );
}

export default CourseBuilder;
