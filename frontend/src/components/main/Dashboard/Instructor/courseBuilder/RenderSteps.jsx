import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseInformation from "./courseInfo/CourseInformation";
import CoursePublish from "./CoursePublish";
import CourseBuilder from "./CourseBuilder";
import { nanoid } from "@reduxjs/toolkit";
function RenderSteps() {
  const { currentStep } = useSelector((state) => state.course);
  const stepsList = [
    {
      title: "Course Information",
      id: 1,
    },
    {
      title: "Course Builder",
      id: 2,
    },
    {
      title: "Course Publish",
      id: 3,
    },
  ];
  return (
    <div className="w-full ">
      {/* steps */}
      <div className={"flex py-10 justify-evenly items-center"}>
        {stepsList?.map((step) => {
          return (
            <div
              key={nanoid()}
              className={
                "relative flex-col w-2/6 flex gap-3 items-center text-center justify-between"
              }
            >
              {currentStep > step.id ? (
                <>
                  <div
                    className={`bg-yellow-100 font-bold border-2 rounded-full w-10 h-10 flex text-center items-center justify-center`}
                  >
                    <FaCheck />
                  </div>
                </>
              ) : (
                <div
                  className={`${
                    currentStep == step.id
                      ? " bg-yellow-400 border-yellow-100 text-yellow-100 "
                      : "border-custom-secondary bg-custom-tertiary text-custom-secondary "
                  } border-2 rounded-full w-10 h-10 flex text-center items-center justify-center`}
                >
                  {step.id}
                </div>
              )}
              <div
                className={`${currentStep == step.id ? "  text-white rounded-full " : " text-custom-secondary"}`}
                key={nanoid()}
              >
                {step.title}
              </div>
              {step.id != 3 && (
                <div
                  className={`${currentStep > step.id ? "border-yellow-100" : "border-custom-secondary"}
w-[80%] border-dashed border-b-2 absolute top-[30%] left-[60%]`}
                ></div>
              )}
            </div>
          );
        })}
      </div>
      {/* course forms */}
      <div className="w-full ">
        {currentStep == 1 && <CourseInformation />}
        {currentStep == 2 && <CourseBuilder />}
        {currentStep == 3 && <CoursePublish />}
      </div>
    </div>
  );
}
export default RenderSteps;
