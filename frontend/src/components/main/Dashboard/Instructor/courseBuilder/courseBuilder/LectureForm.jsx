import { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import {
  setEditSectionId,
  setShowAddLectureForm,
} from "../../../../../../slices/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  ErrorInputFieldStyle,
  FormInputFieldStyle,
} from "../../../../../../styles/constantsStyles";
import { useForm } from "react-hook-form";
import { IoCloudUploadSharp } from "react-icons/io5";
import { createLecture } from "../../../../../../services/operations/course";
export default function LectureForm() {
  const hourInputRef = useRef(null);
  const { course, editSectionId } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const minuteInputRef = useRef(null);
  const secondInputRef = useRef(null);
  const [file, setFile] = useState(false);
  const methods = useForm({
    defaultValues: {
      title: "",
      description: "",
      lecture: "",
    },
  });
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  function getNumber(string) {
    return parseInt(string) || null;
  }
  function submit(data) {
    let hours = getNumber(hourInputRef.current.value);
    let min = getNumber(minuteInputRef.current.value);
    let sec = getNumber(secondInputRef.current.value);
    if (!hours || !min || !sec) {
      console.log("missing details");
      return;
    }
    if (min >= 60 || min < 0 || sec >= 60 || sec < 0) {
      console.log("not valid time format");
      return;
    }

    const time = `${hours}hrs ${min}min ${sec}sec`;
    data.timeDuration = time;
    data.videoFile = data.lecture[0];
    data = {
      ...data,
      courseId: course._id,
      sectionId: editSectionId,
    };
    dispatch(createLecture(data, token));
    handleCloseForm();
  }
  function handleCloseForm() {
    dispatch(setShowAddLectureForm(false));
    dispatch(setEditSectionId(null));
  }
  return (
    <div
      className={
        "absolute  top-0 left-0 z-50 bg-custom-tertiary bg-opacity-80 drop-shadow-md flex justify-center w-full h-full"
      }
    >
      <form
        onSubmit={handleSubmit(submit)}
        className="rounded-md w-9/12 lg:w-6/12 mt-8"
      >
        <div
          className={
            "bg-custom-secondary rounded-md  flex justify-between w-full px-4 py-4 text-white font-bold "
          }
        >
          <h3 className="text-2xl">Editing Lecture</h3>
          <span className="text-white cursor-pointer">
            <IoMdClose onClick={handleCloseForm} size={24} />
          </span>
        </div>
        <div className="bg-custom-tertiary py-4 px-4 flex flex-col gap-2">
          <label
            htmlFor="lecture"
            className="text-xl text-custom-secondary flex flex-col gap-3 font-light"
          >
            <span className="text-white">
              Lecture <span className="text-pink-300">*</span>
            </span>
            <input
              id="lecture"
              type="file"
              accept={"video/mp4,video/x-m4v,video/*"}
              className="hidden h-full w-full cursor-pointer"
              {...register("lecture", { required: "File is missing " })}
            />
            {!file ? (
              <div className="cursor-pointer py-7 flex flex-col w-full bg-opacity-30 bg-custom-primary border-2 border-dashed border-white rounded-lg py-5 items-center gap-3">
                <div className=" w-max h-max p-2 border-2 border-yellow-100 rounded-full">
                  <IoCloudUploadSharp
                    size={30}
                    className="text-sm text-yellow-100"
                  />
                </div>
                <div className="text-center">
                  <p className="">
                    Drag and drop an Video Lecture, or{" "}
                    <span className="text-yellow-100">Browse</span>
                  </p>
                </div>
              </div>
            ) : (
              <></>
            )}
            {errors.lecture && (
              <p className={ErrorInputFieldStyle}>{errors.lecture.message}</p>
            )}
          </label>
          <label
            htmlFor="title"
            className="text-xl text-custom-secondary flex flex-col gap-1"
          >
            <span className="text-white">
              Title <span className="text-pink-300">*</span>
            </span>
            <input
              type="text"
              {...register("title", { required: true })}
              className={
                FormInputFieldStyle +
                " text-lg " +
                " border-custom-secondary border-2 my-2"
              }
              placeholder="Enter Lecture Title"
            />
            {errors.title && (
              <p className={ErrorInputFieldStyle}>{errors.title.message}</p>
            )}
          </label>

          <div className="flex gap-3 justify-between my-2 text-custom-secondary text-xl">
            <label htmlFor="hour">
              <span className="text-white">
                Hours <span className="text-pink-300">*</span>
              </span>
              <input
                ref={hourInputRef}
                placeholder="Enter Hours"
                type="number"
                id="hour"
                className={
                  FormInputFieldStyle + " border-custom-secondary border-2 my-2"
                }
              />
            </label>
            <label htmlFor="min">
              <span className="text-white">
                Minutes <span className="text-pink-300">*</span>
              </span>
              <input
                ref={minuteInputRef}
                placeholder="Enter Seconds"
                type="number"
                id="min"
                className={
                  FormInputFieldStyle + " border-custom-secondary border-2 my-2"
                }
              />
            </label>
            <label htmlFor="sec">
              <span className="text-white">
                Seconds <span className="text-pink-300">*</span>
              </span>
              <input
                ref={secondInputRef}
                type="number"
                placeholder="Enter Seconds"
                id="sec"
                className={
                  FormInputFieldStyle + " border-custom-secondary border-2 my-2"
                }
              />
            </label>
          </div>
          <label htmlFor="description">
            <span className="text-white text-xl">
              Description <span className="text-pink-300">*</span>
            </span>
            <textarea
              rows={8}
              {...register("description", { required: "missing description" })}
              type="text"
              placeholder="Enter Description"
              id="description"
              className={
                FormInputFieldStyle + " border-custom-secondary border-2 my-2"
              }
            />
            {errors.description && (
              <p className={ErrorInputFieldStyle}>{errors.title.message}</p>
            )}
          </label>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCloseForm}
              className="py-3 px-4 rounded-md bg-pure-greys-100 text-black font-bold"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="py-3 px-4 rounded-md bg-yellow-100 text-black font-bold"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
