import { Box, UnstyledButton } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { PropsWithChildren, useState } from 'react';

interface ResponsiveNavLayoutProps extends PropsWithChildren {
}
//TO FIX PROPER CHILDREN WITH PROPS
export function UserNav({ children }: ResponsiveNavLayoutProps) {
  const [active, setActive] = useState('dashboard');
  const isMobile = useMediaQuery('(max-width: 768px)');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <Box style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar for desktop */}
      {!isMobile && (
        <Box
          component="nav"
          style={{
            width: 200,
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid #ccc',
            padding: 20,
            boxSizing: 'border-box',
          }}
        >
          {navItems.map((item) => (
            <UnstyledButton
              key={item.id}
              onClick={() => setActive(item.id)}
              style={{
                marginBottom: 15,
                fontWeight: active === item.id ? 'bold' : 'normal',
                width: '100%',
                textAlign: 'left',
              }}
            >
              {item.label}
            </UnstyledButton>
          ))}
        </Box>
      )}

      {/* Main content area */}
      <Box
        style={{
          flex: 1,
          padding: 20,
          overflowY: 'auto',
        }}
      >
        {children}
      </Box>

      {/* Bottom nav for mobile */}
      {isMobile && (
        <Box
          component="nav"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-around',
            borderTop: '1px solid #ccc',
            padding: 10,
            backgroundColor: '#fff',
            zIndex: 100,
          }}
        >
          {navItems.map((item) => (
            <UnstyledButton
              key={item.id}
              onClick={() => setActive(item.id)}
              style={{
                fontWeight: active === item.id ? 'bold' : 'normal',
              }}
            >
              {item.label}
            </UnstyledButton>
          ))}
        </Box>
      )}
    </Box>
  );
}
