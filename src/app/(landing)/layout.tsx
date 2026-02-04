'use client'
import DashboardNav from "@/componets/DashboardNav/DashboardNav"
import LoginUserModal from "@/componets/LoginUserModal/LoginUserModal"
import RegisterUserModal from "@/componets/RegisterUserModal/RegisterUserModal"
import { LoginType } from "@/enum/dashboard.enum"
import IPersonShcema, { PersonActionEnum, PersonSchema } from "@/schema/PersonSchema"
import { useForm, yupResolver } from "@mantine/form"
import axios from "axios"
import { signIn } from "next-auth/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { PropsWithChildren, useState } from "react"

const layout = ({ children }: PropsWithChildren) => {
    const router = useRouter();
    const params = useSearchParams()
    const param = usePathname()
    const action = params.get('action')
    const [error, setError] = useState("");

    console.log({ param })

    const loginForm = useForm<IPersonShcema>({
        validate: yupResolver(PersonSchema),
        initialValues: {
            email: "",
            password: "",
            confirmPassword: '',
            action: PersonActionEnum.login,
            isTerms: true 
        },
        mode: 'controlled',
        name: 'login'

    });

    const handleLogIn = loginForm.onSubmit(async () => {
        setError(""); // Clear any previous errors

        const res = await signIn("credentials", {
            email: loginForm.values.email,
            password: loginForm.values.password,
            redirect: false,
        });

        console.log({ res })

        if (res?.error) {
            setError("Login failed. Please check your credentials.");
            console.error("Login failed:", res.error);
        } else {
            router.push("/user");
            // Redirect after login
        }
    });

    const registerForm = useForm<IPersonShcema>({
        validate: yupResolver(PersonSchema),
        initialValues: {
            action: 'register',
            confirmPassword: '',
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            isTerms: false
        },
        mode: 'controlled',
        name: 'register'
    });

    const handleRegister = registerForm.onSubmit(async () => {
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/user-account/create/one`,
                {
                    name: `${registerForm.values.firstName} ${registerForm.values.lastName}`,
                    email: registerForm.values.email,
                    password: registerForm.values.password
                }
            );

            if (res.status === 200 || res.status === 201) {
                console.log("success");
                router.push('/')
            }
        } catch { }
    });

    return (
        <>
            <LoginUserModal
                opened={action === LoginType.LOGIN}
                onClose={() => {
                    router.back()
                    loginForm.reset()
                }}
                form={loginForm}
                onSubmit={() => handleLogIn()}
                onRegisterClick={() =>
                     //WIP need to close before going
                    router.push("?action=register")

                }
            />

            <RegisterUserModal
                opened={action === LoginType.REGISTER}
                onClose={() => {
                    router.back()
                    registerForm.reset()
                }}
                form={registerForm}
                onSubmit={() => handleRegister()}
                onLoginClick={() =>
                    //WIP need to close before going
                    router.push("?action=login")
                }
            />
            <DashboardNav>
                {children}
            </DashboardNav>
        </>
    )
}

export default layout