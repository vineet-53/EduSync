import { useForm } from "react-hook-form";
import { FormInputFieldStyle } from "../../../../../../styles/constantsStyles";
import { useDispatch, useSelector } from "react-redux";
import { updateSection } from "../../../../../../services/operations/course";
import {
  setEditSection,
  setEditSectionId,
} from "../../../../../../slices/courseSlice";

export default function EditSection({ section }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      sectionName: section.sectionName ? section.sectionName : "",
    },
  });
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  function cancelForm() {
    dispatch(setEditSection(false));
    dispatch(setEditSectionId(null));
  }
  function submit(data) {
    data.sectionId = section._id;
    data.courseId = course._id;
    dispatch(updateSection(data, token));
    cancelForm();
  }
  return (
    <form
      className="flex justify-between gap-3 items-center"
      onSubmit={handleSubmit(submit)}
    >
      <input
        {...register("sectionName", { required: "Enter Details" })}
        id="section_name"
        type="text "
        placeholder="Enter new section name"
        className={FormInputFieldStyle + "  py-2"}
      />
      {errors?.sectionName && (
        <p className={ErrorInputFieldStyle}>{errors.sectionName?.message} </p>
      )}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={cancelForm}
          className="bg-pure-greys-100 hover:bg-pure-greys-50 py-2 text-black font-bold px-2 rounded-md "
        >
          cancel
        </button>
        <button
          type="submit"
          className="bg-yellow-200 hover:bg-yellow-100 text-black font-bold px-2 py-2 rounded-md "
        >
          save
        </button>
      </div>
    </form>
  );
}
