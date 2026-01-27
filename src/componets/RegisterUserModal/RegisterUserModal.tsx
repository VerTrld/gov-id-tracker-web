'use client';

import IPersonShcema from '@/schema/PersonSchema';
import { Box, Button, Modal, ModalProps, Text, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

interface IRegisterUser extends ModalProps {
  onSubmit: () => void;
  form: UseFormReturnType<IPersonShcema>;
  onLoginClick?: () => void;
}

const RegisterUserModal = ({
  opened,
  onClose,
  onSubmit,
  form,
  onLoginClick
}: IRegisterUser) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={true}
      centered
      title='Register'
    >
      <Box
        component="form"
        onSubmit={form.onSubmit(() => onSubmit())}
        style={{
          width: '100%',
          maxWidth: 400,
          margin: '0 auto',
        }}
      >
        <TextInput
          placeholder="First Name"
          {...form.getInputProps('name')}
          mb="md"
        />
        {/* <TextInput
          placeholder="Last Name"
          {...form.getInputProps('name')}
          mb="md"
        /> */}

        <TextInput
          placeholder="Email"
          {...form.getInputProps('email')}
          mb="md"
        />

        <TextInput
          placeholder="Password"
          type="password"
          {...form.getInputProps('password')}
          mb="md"
        />

        <Button type="submit" fullWidth mb="md">
          Register
        </Button>

        <Text
          ta="center"
          c="violet"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            onClose?.();
            onLoginClick?.();
          }}
        >
          Already have an account? Login
        </Text>
      </Box>
    </Modal>
  );
};

export default RegisterUserModal;
