'use client';

import { createTheme, rem } from '@mantine/core';

export const theme = createTheme({
  components: {
    Title: {
      styles: {
        root: {
          fontFamily: 'Helvetica',
          fontWeight: 700,
          // color: '#043873',
        },
      },
    },

    Text: {
      styles: {
        root: {
          fontFamily: '"Open Sans", sans-serif',
          fontWeight: 400,
          // fontSize: rem(14),
          // textAlign: 'center',
          // color: '#0A58BD'
        },
      },
    },

    TextInput: {
      styles: {
        input: {
          fontFamily: '"Open Sans", sans-serif',
          borderRadius: rem(10),
          borderColor: '#F0F4F8',
          backgroundColor: '#D9EAFE',
          fontSize: rem(12),
          color: '#000000',

          '&:focus': {
            borderColor: '#2E8CE9',
          },

        },

        label: {
          fontWeight: 700,
          marginBottom: rem(6),
          color: '#334E68',
          fontSize: rem(12),

        },

        description: {
          fontSize: rem(12),
        },

        error: {
          fontSize: rem(12),
        },
      },
    },

  },
});
