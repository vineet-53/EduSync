import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import AuthTemplate from "../components/main/Auth/AuthTemplate";
import { Label, FormSubmitButton } from "../components/common/form/index";
import FormInputField from "../components/common/form/FormInputField";
import { ErrorInputFieldStyle } from "../styles/constantsStyles";
import { setSignupData } from "../slices/authSlice";
import { sendOTP } from "../services/operations/auth";
import FormPasswordTemplate from "../components/common/form/FormPasswordTemplate";
export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      accountType: "Student",
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      password: "",
      confirmPassword: "",
    },
  });
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;
  const onSubmit = (data) => {
    console.log(data);
    dispatch(
      setSignupData({
        ...data,
      }),
    );
    dispatch(sendOTP(data.email, navigate));
    reset({
      accountType: "Student",
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      password: "",
      confirmPassword: "",
    });
  };
  const [activeRole, setActiveRole] = useState("Student");
  return (
    <>
      <FormProvider {...methods}>
        <AuthTemplate signup={true}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 text-sm lg:text-base"
          >
            {/* role */}
            <div className="text-custom-secondary flex gap-2 max-w-3/5 rounded-full p-1 bg-custom-tertiary">
              <button
                className={` ${activeRole == "Student" && "bg-custom-primary"} w-full py-2 px-2 text-center rounded-full text-richblack-300 transition-all duration-700 `}
                {...register("accountType", { required: true })}
                onClick={() => {
                  setActiveRole("Student");
                  setValue("accountType", "Student");
                }}
                type="button"
              >
                Student
              </button>
              <button
                className={` ${activeRole == "Instructor" && "bg-custom-primary"} w-full py-2 px-2 text-center rounded-full text-richblack-300 transition-all duration-700 `}
                {...register("accountType", { required: true })}
                onClick={() => {
                  setActiveRole("Instructor");
                  setValue("accountType", "Instructor");
                }}
                type="button"
              >
                Instructor
              </button>

              {errors?.accountType?.message}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div>
                <Label htmlFor="firstname">First Name</Label>
                <FormInputField
                  type="text"
                  value="firstName"
                  errorMsg="First Name"
                  placeholder="Enter First Name"
                />
                {errors?.firstName && (
                  <p className={ErrorInputFieldStyle}>
                    {errors?.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="lastname">Last Name</Label>
                <FormInputField
                  type="text"
                  value="lastname"
                  placeholder="Enter Last Name"
                />

                {errors?.lastName && (
                  <p className={ErrorInputFieldStyle}>
                    {errors?.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="lastname">Email Address</Label>
              <FormInputField
                type="email"
                value="email"
                errorMsg="Email Address"
                pattern={{
                  value: /.(@gmail.com)$/,
                  message: "Enter Valid Email",
                }}
                placeholder="Enter Email Address"
              />
              {errors?.email && (
                <p className={ErrorInputFieldStyle}>{errors?.email.message}</p>
              )}
            </div>
            <div>
              <FormPasswordTemplate />
              <FormSubmitButton buttoncss="w-full my-2">
                Submit
              </FormSubmitButton>
            </div>
          </form>
        </AuthTemplate>
      </FormProvider>
    </>
  );
}
