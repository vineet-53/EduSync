import { useForm, FormProvider } from "react-hook-form";
import { Label } from "../../../../../common/form";
import {
  ErrorInputFieldStyle,
  FormInputFieldStyle,
} from "../../../../../../styles/constantsStyles";
import { FaRupeeSign } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import Instructions from "./Instructions.jsx";
import Tags from "./Tags";
import FileUpload from "./FileUpload.jsx";
import { createCourse } from "../../../../../../services/operations/course.js";
function CourseInformation() {
  const { categories } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const methods = useForm({
    defaultValues: {
      courseName: "",
      courseDescription: "",
      whatYouWillLearn: "",
      price: "",
      tag: [],
      categoryId: "",
      instructions: [],
      thumbnail: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const onSubmit = (data) => {
    const file = data.thumbnail[0];
    data = { ...data, thumbnail: file };
    console.log(data);
    dispatch(createCourse(data, user.token));
  };

  return (
    <FormProvider {...methods}>
      <form
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            return;
          }
        }}
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#161D29] grid gap-4 rounded-md p-4 w-9/12 lg:w-9/12 mx-auto"
      >
        {errors.general && (
          <p className={ErrorInputFieldStyle}>{errors.general.message}</p>
        )}
        <div>
          <Label htmlFor={"courseName"}> Course Title</Label>
          <input
            id="courseName"
            type="text "
            {...register("courseName", {
              required: "Please Enter Course Title",
            })}
            placeholder="Enter Course Title"
            className={FormInputFieldStyle}
          />
          {errors.courseName && (
            <p className={ErrorInputFieldStyle}>
              {errors.courseDescription.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor={"courseDescription"}> Course Description</Label>
          <input
            id="courseDescription"
            type="text "
            {...register("courseDescription", {
              required: "Please Enter Course Description",
            })}
            placeholder="Enter Course Description"
            className={FormInputFieldStyle}
          />
          {errors.courseDescription && (
            <p className={ErrorInputFieldStyle}>
              {errors.courseDescription.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor={"price"}> Price </Label>
          <div className="relative ">
            <FaRupeeSign className="z-10 absolute top-3 left-4 text-custom-secondary" />
            <input
              id="price"
              type="number"
              {...register("price", {
                required: "Enter Price",
              })}
              placeholder="Enter Price"
              className={FormInputFieldStyle + " pl-12"}
            />
          </div>
          {errors.price && (
            <p className={ErrorInputFieldStyle}>{errors.price.message}</p>
          )}
        </div>
        <div className="w-full">
          <Label htmlFor={"category"}> Category </Label>
          <select
            {...register("categoryId", {
              required: "Please Select Category",
            })}
            id="category"
            className="text-pure-greys-100 bg-custom-tertiary w-full p-2 rounded-md my-1 px-2"
          >
            <option
              value=""
              disabled
              defaultChecked={true}
              className="text-custom-secondary"
            >
              Select Category
            </option>
            {categories?.map((category) => (
              <option key={nanoid()} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className={ErrorInputFieldStyle}>{errors.categoryId.message}</p>
          )}
        </div>
        {/* tags */}
        <div>
          <Tags {...methods} />
        </div>
        <div>
          <Label htmlFor={"thumbnail"}> Thumbnail </Label>
          <FileUpload {...methods} fileField={"thumbnail"} />
          {errors.thumbnail && (
            <p className={ErrorInputFieldStyle}>{errors.thumbnail.message}</p>
          )}
        </div>
        <div>
          <Label>Benefits of the Course</Label>
          <textarea
            rows={7}
            placeholder="Enter Benefits of the course"
            {...register("whatYouWillLearn", {
              required: "Please Enter Benefits of the course",
              maxLength: 250,
            })}
            className={FormInputFieldStyle}
          />
          {errors.whatYouWillLearn && (
            <p className={ErrorInputFieldStyle}>
              {errors.whatYouWillLearn.message}
            </p>
          )}
        </div>
        <div>
          {/* Instructions */}
          <Instructions {...methods} />
          {errors.instructions && (
            <p className={ErrorInputFieldStyle}>
              {errors?.instructions?.message}
            </p>
          )}
        </div>
        <button
          className={
            "text-center bg-yellow-100 text-black rounded-md w-full h-[40px]"
          }
          type="submit"
        >
          Next
        </button>
      </form>
    </FormProvider>
  );
}

export default CourseInformation;
