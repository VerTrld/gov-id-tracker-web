"use client";
import IPersonShcema, { PersonSchema } from "@/schema/PersonSchema";
import { Button, Flex, Text, TextInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCsrfToken, signIn } from "next-auth/react";
import DashboardNav from "@/componets/DashboardNav/DashboardNav";
import RegisterUserModal from "@/componets/RegisterUserModal/RegisterUserModal";
import { LoginType } from "@/enum/dashboard.enum";
import axios from "axios";
import LoginUserModal from "@/componets/LoginUserModal/LoginUserModal";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState('')

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

    if (res?.error) {
      setError("Login failed. Please check your credentials.");
      console.error("Login failed:", res.error);
    } else {
      router.push("/"); // Redirect after login
    }
  });



  const registerForm = useForm<IPersonShcema>({
    validate: yupResolver(PersonSchema),
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const handleRegister = registerForm.onSubmit(async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/person/create`,
        registerForm.values
      );

      if (res.status === 200 || res.status === 201) {
        console.log("success");
        router.push("/login");
      }
    } catch { }
  });

  useEffect(() => {
    console.log({ registerForm })
  }, [registerForm])

  return (

    <>

      <LoginUserModal
        opened={modalOpen === LoginType.LOGIN}
        onClose={() => { setModalOpen(''), loginForm.reset() }}
        form={loginForm}
        onSubmit={() => handleLogIn()}
      />

      <RegisterUserModal
        opened={modalOpen === LoginType.REGISTER}
        onClose={() => { setModalOpen(''), registerForm.reset() }}
        form={registerForm}
        onSubmit={() => handleRegister()} />

      <Flex
        direction={"column"}
      // h={"100vh"}
      // w={"100%"}
      // align="center"
      // justify="center"
      >
        <DashboardNav
          logIn={() => setModalOpen(LoginType.LOGIN)}
          signUp={() => setModalOpen(LoginType.REGISTER)} />

      </Flex>
    </>

  );
}
