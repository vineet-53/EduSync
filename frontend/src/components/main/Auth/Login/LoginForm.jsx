import React from 'react'
import { Input, InputPassword, SubmitButton } from "../../../common/form/index"
import AuthTemplate from "../AuthTemplate"
import { login } from "../../../../services/operations/auth"
import { useNavigate } from 'react-router-dom'
import { useFormContext } from '../../../../contexts/SignupFormProvider'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../../../slices/authSlice'
const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { email, setEmail, password, setPassword } = useFormContext()
    const handleLoginForm = async (e) => {
        e.preventDefault()

        dispatch(login(email, password, navigate))
    }

    return (<>
        {
            setLoading ?
                <AuthTemplate login={true}>
                    <form onSubmit={handleLoginForm} className='flex flex-col gap-4'>
                        {/* email */}
                        <Input
                            labelName="Email"
                            placeholder='Enter Email'
                            inputcss="w-full"
                            id="email"
                            type="email"
                            handleEvent={e => setEmail(e.target.value)}
                        />
                        {/* password  below forgot password*/}
                        <InputPassword
                            labelName="Enter Password"
                            forgotPassword={true}
                            inputcss="w-full"
                            placeholder='Enter Password'
                            id="password"
                            handleEvent={e => setPassword(e.target.value)}
                        />
                        {/* sign button */}
                        <SubmitButton buttoncss="text-center" >
                            Sign In
                        </SubmitButton>
                    </form>
                </AuthTemplate>
                :
                <div className='loader'>
                </div>

        }

    </>
    )
}
export default LoginForm