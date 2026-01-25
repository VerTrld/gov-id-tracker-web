import { Box, Button, Flex } from '@mantine/core'
import React from 'react'

interface IDashboardNav {
    signUp: () => void
    logIn: () => void
}

const DashboardNav = ({ signUp, logIn }: IDashboardNav) => {
    return (
        <Box
            style={{
                boxShadow: '0 10px 10px rgba(0, 0, 0, 0.19)',
            }}
        >
            <Flex justify={'space-between'}>{/* Top row */}
                <Flex
                    justify="space-between"
                    align="center"
                    px={20}
                    py={20}
                >
                    <Box>Logo</Box>
                </Flex>

                {/* Navigation */}
                <Flex gap={15} px={20} py={20}>
                    <Button variant="subtle">Home</Button>
                    <Button variant="subtle">About</Button>
                    <Button variant="subtle">Features</Button>
                    <Button variant="subtle">Contact</Button>
                    <Button onClick={logIn}>Log In Sample</Button>
                    <Button onClick={signUp}>Sign Up</Button>
                </Flex></Flex>

        </Box>
    )
}

export default DashboardNav