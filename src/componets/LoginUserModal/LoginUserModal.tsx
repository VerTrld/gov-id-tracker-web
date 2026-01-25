'use client';

import IPersonShcema from '@/schema/PersonSchema';
import {
  Box,
  Button,
  Modal,
  ModalProps,
  Text,
  TextInput,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

interface ILoginUser extends ModalProps {
  onSubmit: () => void;
  form: UseFormReturnType<IPersonShcema>;
  error?: string;
  onRegisterClick?: () => void;
}

const LoginUserModal = ({
  opened,
  onClose,
  form,
  onSubmit,
  error,
  onRegisterClick,
}: ILoginUser) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      centered
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

        {error && (
          <Text c="red" mb="md" size="sm">
            {error}
          </Text>
        )}

        <Button type="submit" fullWidth mb="md">
          Login
        </Button>

        <Text
          ta="center"
          c="violet"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            onClose?.();
            onRegisterClick?.();
          }}
        >
          Don’t have an account? Register
        </Text>
      </Box>
    </Modal>
  );
};

export default LoginUserModal;
