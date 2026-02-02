'use client';

import { createTheme, rem } from '@mantine/core';

export const theme = createTheme({
  components: {
    Title: {
      styles: {
        root: {
          fontFamily: '"Open Sans", sans-serif',
          fontWeight: 700,
          color: '#2d4b81',
        },
      },
    },

    Text: {
      styles: {
        root: {
          fontFamily: '"Open Sans", sans-serif',
          fontWeight: 400,
          fontSize: rem(14),
          textAlign: 'center',
          color: '#213379'
        },
      },
    },
  },
});
