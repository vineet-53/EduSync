import { useEffect } from "react";
import RenderSteps from "./courseBuilder/RenderSteps";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep } from "../../../../slices/courseSlice";
import { getItemFromLocalStorage } from "../../../../utils/localStorage";
export default function AddCourse() {
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  useEffect(() => {
    if (course == null || !course) {
      if (getItemFromLocalStorage("currentStep")) {
        localStorage.removeItem("currentStep");
      }
      dispatch(setCurrentStep(1));
    }
  }, []);
  return (
    <div className=" flex flex-col lg:flex-row gap-2">
      <RenderSteps />
      <div className="rounded-md">
        <div className="sticky top-10 h-max text-white py-5 px-8 bg-[#2C333F] rounded-md w-11/12 mx-auto">
          <h3 className="text-xl font-bold py-2 px-0">
            <span>⚡</span>Course Upload Tips
          </h3>
          <li>Set the Course Price option or make it free.</li>
          <li>Standard size for the course thumbnail is 1024x576.</li>
          <li>Video section controls the course overview video.</li>
          <li>Course Builder is where you create & organize a course.</li>
          <li>
            Add Topics in the Course Builder section to create lessons, quizzes,
            and assignments.
          </li>
          <li>
            Information from the Additional Data section shows up on the course
            single page.
          </li>
          <li>Make Announcements to notify any important</li>
          <li>Notes to all enrolled students at once.</li>
        </div>
      </div>
    </div>
  );
}
