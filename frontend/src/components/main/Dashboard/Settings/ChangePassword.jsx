import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { changePassword } from '../../../../services/operations/profile'
import FormPasswordTemplate from "../../../common/form/FormPasswordTemplate"
import { useSelector } from 'react-redux'
import { ActiveIconButton, InActiveIconButton } from '../../../common'
export default function ChangePassword() {
    const methods = useForm({
        defaultValues: {
            password: "",
            confirmPassword: "",
        }
    })
    const { handleSubmit, setError} = methods
    const { token } = useSelector(state => state.auth)
    const onSubmit = (data) => {
        const { password, confirmPassword } = data
        if (password !== confirmPassword) {
            setError("password", {
                type: "password",
                message: "Password not matched!"
            })
        } else {
            changePassword(password, confirmPassword, token)
        }
    }
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2' >
                <FormPasswordTemplate />
                <div className='grid col-span-2 py-2 '>
                    <div className='flex gap-2 ml-auto'>
                        <InActiveIconButton navigateTo="/dashboard/my-profile">
                            <span>Cancel</span>
                        </InActiveIconButton>
                        <ActiveIconButton>
                            <span>Save</span>
                        </ActiveIconButton>
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}
