import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import AuthTemplate from "../AuthTemplate"
import { Label } from "../../../common/form/index"
const Index = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            countryCode: "",
            contactNumber: "",
            password: "",
            confirmPassword: "",
        }
    })
    const handleSignupForm = data => {
        e.preventDefault()

        // dispatch(setSignupData({
        //     accountType,
        //     email,
        //     password,
        //     firstName,
        //     lastName,
        //     confirmPassword,
        //     phoneNumber,
        //     countryCode,
        // }))

        // dispatch(sendOTP(email, navigate))

    }
    return (
        <>
            <AuthTemplate signup={true}>
                <form onSubmit={handleSubmit(handleSignupForm)} className='flex flex-col gap-4 text-sm lg:text-base'>
                    {/* role */}
                    <div className='rounded-full p-1 bg-custom-tertiary flex w-max'>
                        <Label htmlFor="firstname" >
                            First Name
                        </Label>
                        <input type="text" id='firstname' {...register('firstName', { required: "Please Enter First Name" })} />
                    </div>
                </form>
            </AuthTemplate>
        </>
    )
}
export default Index