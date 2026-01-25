import React from 'react';
import { Box, Button, Flex, Burger, Collapse } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

interface IDashboardNav {
  signUp: () => void;
  logIn: () => void;
}

const DashboardNav = ({ signUp, logIn }: IDashboardNav) => {
  const [opened, { toggle, close }] = useDisclosure(false);

  // Responsive breakpoint
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Box style={{ boxShadow: '0 10px 10px rgba(0, 0, 0, 0.19)' }}>
      <Flex justify="space-between" align="center" style={{ padding: '20px' }}>
        <Box>Logo</Box>

        {!isMobile ? (
          // Desktop menu
          <Flex gap={15}>
            <Button variant="subtle">Home</Button>
            <Button variant="subtle">About</Button>
            <Button variant="subtle">Features</Button>
            <Button variant="subtle">Contact</Button>
            <Button onClick={logIn}>Log In</Button>
            <Button onClick={signUp}>Sign Up</Button>
          </Flex>
        ) : (
          // Mobile burger
          <Burger opened={opened} onClick={toggle} size="sm" style={{ color: 'black' }} />
        )}
      </Flex>

      {/* Mobile menu */}
      {isMobile && (
        <Collapse in={opened}>
          <Flex direction="column" gap="md" style={{ padding: '0 20px 20px', backgroundColor: '#f9f9f9' }}>
            <Button variant="subtle" fullWidth onClick={close}>Home</Button>
            <Button variant="subtle" fullWidth onClick={close}>About</Button>
            <Button variant="subtle" fullWidth onClick={close}>Features</Button>
            <Button variant="subtle" fullWidth onClick={close}>Contact</Button>
            <Button fullWidth onClick={() => { close(); logIn(); }}>Log In</Button>
            <Button fullWidth onClick={() => { close(); signUp(); }}>Sign Up</Button>
          </Flex>
        </Collapse>
      )}
    </Box>
  );
};

export default DashboardNav;
