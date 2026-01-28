"use client";

import { UserNav } from "@/componets/UserNav/UserNav";
import { Button, Flex } from "@mantine/core";
import { signOut } from "next-auth/react";

export default function page() {
    return (

        <Flex>
            <UserNav>
                hello Admin <Button onClick={() => signOut()}>logout</Button>
            </UserNav>
        </Flex>
    );
}
