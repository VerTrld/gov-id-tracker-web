'use client'
import DashboardNav from "@/componets/DashboardNav/DashboardNav"
import LoginUserModal from "@/componets/LoginUserModal/LoginUserModal"
import RegisterUserModal from "@/componets/RegisterUserModal/RegisterUserModal"
import { LoginType } from "@/enum/dashboard.enum"
import IPersonShcema, { PersonSchema } from "@/schema/PersonSchema"
import { Flex } from "@mantine/core"
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
        },
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
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
    });
    const handleRegister = registerForm.onSubmit(async () => {
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/userAccount/create/one`,
                {
                    name: `${registerForm.values.firstName} ${registerForm.values.lastName}`,
                    email: registerForm.values.email,
                    password: registerForm.values.password
                }
            );

            if (res.status === 200 || res.status === 201) {
                console.log("success");
                // setModalOpen('')
            }
        } catch { }
    });

    return (
        <>
            <LoginUserModal
                opened={action === LoginType.LOGIN}
                onClose={() => {
                    // setModalOpen(''), 
                    router.back()
                    loginForm.reset()
                }}
                form={loginForm}
                onSubmit={() => handleLogIn()}
                onRegisterClick={() => 
                    router.push("?action=register")
                    // setModalOpen(LoginType.REGISTER) 
                }
            />

            <RegisterUserModal
                opened={action === LoginType.REGISTER}
                onClose={() => {
                    // setModalOpen(''), 
                    router.back()
                    registerForm.reset()
                }}
                form={registerForm}
                onSubmit={() => handleRegister()}
                onLoginClick={() => 
                    router.push("?action=login")
                    // setModalOpen(LoginType.LOGIN)
                }
            />
            <DashboardNav>
                {/* <Flex h={'90vh'}
                 style={{
                    background: 'linear-gradient(180deg, #FFFFFF, #FFFFFF, #3386e4)',
                    borderRadius: 16,
                }}
                >   */}
                    {children}
                    {/* </Flex> */}
              
                </DashboardNav>
        </>
    )
}

export default layout