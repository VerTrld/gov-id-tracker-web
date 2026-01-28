"use client";

import { UserNav } from "@/componets/UserNav/UserNav";
import { Button, Flex } from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
    const session = useSession()
    // @ts-ignore
    if (session.data?.user.roles !== 'SUPER_ADMIN') {
        redirect('/unauthorized')
    }
    return (

        <Flex>
            <UserNav>
                hello dashboard <Button onClick={() => signOut()}>logout</Button>
            </UserNav>
        </Flex>
    );
}
