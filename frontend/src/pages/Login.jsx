import React from 'react'
import { FormSubmitButton } from "../components/common/form"
import AuthTemplate from "../components/main/Auth/AuthTemplate"
import { login } from "../services/operations/auth"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLoading } from '../slices/authSlice'
import FormInputField from '../components/common/form/FormInputField'
import { FormProvider, useForm } from 'react-hook-form'
import { ErrorInputFieldStyle } from '../styles/constantsStyles'
import FormPassword from '../components/common/form/FormPassword'
import { Label } from '../components/common/form'
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const methods = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    })
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = methods
    const onSubmit = async (data) => {
        dispatch(login(data.email, data.password, navigate))
    }
    return (<FormProvider {...methods}>
        {
            setLoading ?
                <AuthTemplate login={true}>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                        {/* email */}
                        <div>
                            <Label htmlFor="lastname" >
                                Email Address
                            </Label>
                            <FormInputField name="Email" id="email" value="email" placeholder="Enter Email" errorMsg="Email Address" />
                            {errors?.email && <p className={ErrorInputFieldStyle}>{errors.email.message}</p>}
                        </div>
                        {/* password  below forgot password*/}
                        <div>
                            <FormPassword name="Password" value="password" id="password" placeholder="Enter Password" />
                            {errors?.password && <p className={ErrorInputFieldStyle}>{errors?.password.message}</p>}
                        </div>
                        {/* sign button */}

                        <FormSubmitButton buttoncss="text-center" >
                            Sign In
                        </FormSubmitButton>
                    </form>
                </AuthTemplate>
                :
                <div className='loader'>
                </div>

        }

    </FormProvider>
    )
}
export default Login