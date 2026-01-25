"use client";
import IPersonShcema, { PersonSchema } from "@/schema/PersonSchema";
import { Box, Button, Container, Flex, Grid, Text, TextInput, Title } from "@mantine/core";
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
        setModalOpen('')
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
        onRegisterClick={() => { setModalOpen(LoginType.REGISTER) }}
      />

      <RegisterUserModal
        opened={modalOpen === LoginType.REGISTER}
        onClose={() => { setModalOpen(''), registerForm.reset() }}
        form={registerForm}
        onSubmit={() => handleRegister()}
        onLoginClick={() => { setModalOpen(LoginType.LOGIN) }}
      />

      <Flex
        direction={"column"}

      >
        <DashboardNav
          logIn={() => setModalOpen(LoginType.LOGIN)}
          signUp={() => setModalOpen(LoginType.REGISTER)} />



         <Box style={{ padding: '80px 100px' }}>
      <Flex
        style={{
          // maxWidth: 1200,
          // margin: '0 auto',
          // alignItems: 'center',
          // justifyContent: 'space-between',
          // gap: '70px',
          flexWrap: 'wrap',
        }}
        justify={'space-between'}
        
       
      >
        {/* Left side */}
        <Box style={{ flex: '1 1 400px', minWidth: 280 }}>
          <Title
            order={1}
            style={{ fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}
          >
            Your One-Stop Guide to
            <br />
            Government IDs for
            <br />
            First-Time Jobseekers
          </Title>

          <Text
            style={{
              color: '#555',
              marginBottom: 32,
              maxWidth: 500,
              lineHeight: 1.5,
            }}
          >
            Designed to help first-time jobseekers understand ID requirements,
            access official government websites, and track and complete
            government ID applications with ease.
          </Text>

          <Button
            style={{
              backgroundColor: '#e0e0e0',
              color: '#000',
              padding: '10px 24px',
            }}
          >
            Button
          </Button>
        </Box>

        {/* Right side placeholder */}
        <Box
          style={{
            flex: '1 1 400px',
            minWidth: 280,
            height: 300,
            backgroundColor: '#e5e5e5',
            borderRadius: 8,
          }}
        />
      </Flex>
    </Box>

      </Flex>
    </>

  );
}
