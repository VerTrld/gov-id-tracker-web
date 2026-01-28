"use client";
import { ChecklistModule } from "@/componets/ChecklistModule/ChecklistModule";
import { ContactCard, ContactCardGrid } from "@/componets/ContactCard/ContactCard";
import DashboardNav from "@/componets/DashboardNav/DashboardNav";
import LoginUserModal from "@/componets/LoginUserModal/LoginUserModal";
import RegisterUserModal from "@/componets/RegisterUserModal/RegisterUserModal";
import { LoginType } from "@/enum/dashboard.enum";
import IPersonShcema, { PersonSchema } from "@/schema/PersonSchema";
import { Box, Button, Container, Divider, Flex, Grid, List, Paper, Stack, Text, Title } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState('')

  const isMobile = useMediaQuery('(max-width: 768px)');

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
        setModalOpen('')
      }
    } catch { }
  });


 
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



        {/* Sample Data and Call */}
        {/* <ChecklistModule
          items={[
            { id: 'profile', label: 'Complete profile', value: 25 },
            { id: 'email', label: 'Verify email', value: 25 },
            { id: 'photo', label: 'Upload photo', value: 25 },
            { id: 'terms', label: 'Accept terms', value: 25 },
          ]}
          onComplete={() => console.log('All done!')}
        /> */}


        <Flex
          // flex={1}
          py={isMobile ? 60 : 100}
          px={isMobile ? 20 : 100}
        >
          <Flex flex={1} >
            <Flex
              gap={isMobile ? 40 : 60}
              align="center"
              justify="space-between"
              direction={isMobile ? 'column' : 'row'}
              flex={1}
            >
              {/* Left content */}
              <Box
                style={{
                  flex: 1,
                  textAlign: isMobile ? 'center' : 'left',
                }}
              >
                <Title
                  order={1}
                  style={{
                    fontWeight: 900,
                    lineHeight: 1.15,
                    fontSize: isMobile ? 32 : 48,
                    marginBottom: 20,
                  }}
                >
                  Your One-Stop Guide to
                  <br />
                  Government IDs for
                  <br />
                  <span style={{ color: '#1c7ed6' }}>
                    First-Time Jobseekers
                  </span>
                </Title>

                <Text
                  size={isMobile ? 'md' : 'lg'}
                  c="dimmed"
                  style={{
                    maxWidth: 520,
                    margin: isMobile ? '0 auto 28px' : '0 0 36px',
                  }}
                >
                  Learn what IDs you need, where to apply, and how to complete
                  government requirements—step by step, all in one place.
                </Text>

                <Flex
                  gap="md"
                  justify={isMobile ? 'center' : 'flex-start'}
                  wrap="wrap"
                >
                  <Button size="md" radius="md">
                    Get Started
                  </Button>

                  <Button size="md" radius="md" variant="light">
                    Learn More
                  </Button>
                </Flex>
              </Box>

              {/* Right visual */}
              <Box
                style={{
                  flex: 1,
                  width: '100%',
                  height: isMobile ? 220 : 340,
                  background:
                    'linear-gradient(135deg, #f1f3f5, #e9ecef)',
                  borderRadius: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  color: '#868e96',
                }}
              >
                Image / Illustration
              </Box>
            </Flex>
          </Flex>
        </Flex>

      </Flex>
    </>

  );
}
