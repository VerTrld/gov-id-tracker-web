"use client";
import { Button } from "@mantine/core";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <>
      hello dashboard <Button onClick={() => signOut()}>logout</Button>
    </>
  );
}
