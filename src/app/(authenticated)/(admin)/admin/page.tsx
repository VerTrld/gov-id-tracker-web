"use client";

import { ContactCardGrid } from "@/componets/ContactCard/ContactCard";
import { UserNav } from "@/componets/UserNav/UserNav";
import { get } from "@/utils/http-api";
import { Button, Container, Flex } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

export default function page() {

    const { data } = useQuery({
        queryKey: ['getUser'],
        queryFn: async () => {
            const res = await get(`/userAccount/users/list`)
            return res
        }
    })
    const mockContacts = [
        {
            name: 'Smartall',
            email: '23.333.365/0406-25',
            count: 180,
            isActive: true,
            onClick: () => console.log('Smartall clicked'),
        },
        {
            name: 'Malibiuh',
            email: '29.397.365/0406-30',
            count: 360,
            isActive: true,
            onClick: () => console.log('Malibiuh clicked'),
        },
        {
            name: 'Travel Shot',
            email: '80.686.365/0406-45',
            count: 528,
            isActive: true,
            onClick: () => console.log('Travel Shot clicked'),
        },
        {
            name: 'Rosters',
            email: '84.753.365/0406-28',
            count: 91,
            isActive: false,
            onClick: () => console.log('Rosters clicked'),
        },
        {
            name: 'Top Center',
            email: '87.389.365/0406-32',
            count: 276,
            isActive: false,
            onClick: () => console.log('Top Center clicked'),
        },

    ];

    console.log({data})

    return (

        <Flex direction={'column'} gap={10}>
            hello Admin <Button onClick={() => signOut()}>logout</Button>
            {/* Admin Side UserList */}
            <Flex>
                <ContactCardGrid contacts={mockContacts} />
            </Flex>



        </Flex>
    );
}
