"use client";

import DashboardNav from "@/componets/DashboardNav/DashboardNav";
import LoginUserModal from "@/componets/LoginUserModal/LoginUserModal";
import RegisterUserModal from "@/componets/RegisterUserModal/RegisterUserModal";
import { LoginType } from "@/enum/dashboard.enum";
import IPersonShcema, {
  PersonActionEnum,
  PersonSchema,
} from "@/schema/PersonSchema";
import { post } from "@/utils/http-api";
import { useForm, yupResolver } from "@mantine/form";
import axios from "axios";
import { signIn } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PropsWithChildren, useState } from "react";
import { notifications } from '@mantine/notifications'

const layout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const params = useSearchParams();
  const action = params.get("action");
  const [error, setError] = useState("");

  const loginForm = useForm<IPersonShcema>({
    validate: yupResolver(PersonSchema),
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      action: PersonActionEnum.login,
      isTerms: true,
    },
    mode: "controlled",
    name: "login",
  });

  const handleLogIn = loginForm.onSubmit(async () => {
    setError(""); // Clear any previous errors

    try {
      const res = await signIn("credentials", {
        email: loginForm.values.email,
        password: loginForm.values.password,
        redirect: false,
      });

      if (res?.error) {
        setError("Login failed. Please check your credentials.");
        notifications.show({
          color: 'red',
          title: 'Login failed',
          message: 'Login failed. Please check your credentials.',
        });
        registerForm.reset();
        // console.error("Login failed:", res.error);
      } else {
        notifications.show({
          title: 'Login successful',
          message: 'Welcome back!',
          color: 'green',
        });
        router.push("/user/home");
      }
    } catch (error) {
      // Handle unexpected errors (network issues, exceptions)
      setError("An unexpected error occurred. Please try again.");
      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'An unexpected error occurred. Please try again.',
      });
      // console.error("Login error:", error);
    }
  });


  const registerForm = useForm<IPersonShcema>({
    validate: yupResolver(PersonSchema),
    initialValues: {
      action: "register",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      isTerms: false,
    },
    mode: "controlled",
    name: "register",
  });

  const handleRegister = registerForm.onSubmit(async () => {
    try {
      const res = await post(`/user-account/create/one`, {
        name: `${registerForm.values.firstName} ${registerForm.values.lastName}`,
        email: registerForm.values.email,
        password: registerForm.values.password,
      });

      if (res.status === 200 || res.status === 201) {
        notifications.show({
          title: 'Registration Successful',
          message: 'Your account has been created! You can now log in.',
          color: 'green',
        });
        registerForm.reset();
        router.push("/"); // Redirect after successful registration
      } else {
        // Handle unexpected non-error responses
        notifications.show({
          title: 'Registration Failed',
          message: 'Something went wrong. Please try again.',
          color: 'red',
        });
        console.error("Unexpected response:", res);
      }
    } catch (error) {
      // Catch network errors or exceptions
      notifications.show({
        title: 'Error',
        message: 'Registration failed. Please try again later.',
        color: 'red',
      });
      console.error("Registration error:", error);
    }
  });


  return (
    <>
      <LoginUserModal
        opened={action === LoginType.LOGIN}
        onClose={() => {
          //   router.back();
          router.replace("/");
          loginForm.reset();
        }}
        form={loginForm}
        onSubmit={() => handleLogIn()}
        onRegisterClick={() =>
          //WIP need to close before going
          router.replace("/?action=register")
        }
      />

      <RegisterUserModal
        opened={action === LoginType.REGISTER}
        onClose={() => {
          router.replace("/");
          registerForm.reset();
        }}
        form={registerForm}
        onSubmit={() => handleRegister()}
        onLoginClick={() =>
          //WIP need to close before going
          router.replace("/?action=login")
        }
      />
      <DashboardNav>{children}</DashboardNav>
    </>
  );
};

export default layout;
