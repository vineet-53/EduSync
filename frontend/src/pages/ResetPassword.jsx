import React from 'react'
import { Input, FormSubmitButton } from "../components/common/form"
import Template from "../components/main/VerifyEmail/Template"
import ResetPasswordProvider, { useResetPasswordContext } from "../contexts/ResetPasswordProvider"
import { resetPasswordToken } from "../services/operations/password"
const ResetPasswordForm = () => {
    const { email, setEmailSent, setEmail, emailSent } = useResetPasswordContext()
    const handleResetPassword = (e) => {
        e.preventDefault()
        resetPasswordToken(email, setEmailSent)
    }
    return (
        <Template
            title="Reset your password"
            subTitle="Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
        >
            <form action="" onSubmit={handleResetPassword}>
                <Input
                    labelName="Email Address"
                    id="email"
                    type="email"
                    placeholder="Enter Email"
                    handleEvent={e => setEmail(e.target.value)}
                />
                <FormSubmitButton buttoncss="text-center text-black w-full">
                    Submit
                </FormSubmitButton>
            </form>
        </Template>)
}

const ResendEmailForm = () => {
    const { email, setEmailSent } = useResetPasswordContext()
    const handleResendMail = e => {
        e.preventDefault()
        // create call to server api 
        resetPasswordToken(email, setEmailSent)
    }
    return (
        <Template
            title="Check email"
            subTitle="We have sent the reset email to"
            email={email}
        >
            <form action="" onSubmit={handleResendMail}>
                <FormSubmitButton buttoncss="text-center text-black w-full">
                    Resend Mail
                </FormSubmitButton>
            </form>
        </Template>
    )
}
const ResetPasswordTemplate = () => {
    const { emailSent } = useResetPasswordContext()
    return (
        <>
            {!emailSent ?
                <ResetPasswordForm />
                :
                <ResendEmailForm />
            }
        </>
    )
}
export default function ResetPassword() {
    return (
        <>
            <ResetPasswordProvider>
                <ResetPasswordTemplate />
            </ResetPasswordProvider>
        </>

    )
}