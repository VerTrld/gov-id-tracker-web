'use client';

import IPersonShcema from '@/schema/PersonSchema';
import {
  Box,
  Button,
  Flex,
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
      title={
        <Flex direction={'column'} gap={10} align={'center'} mb={10}>
          <Text>LOGO</Text>
          <Text c='#0B69A3' fw={700} fz={'16px'}>Welcome Back!</Text>
          <Text c='#4F9CF9' fz={'14px'}>Continue tracking your government ID <br /> requirements.</Text>
        </Flex>
      }
      styles={{
        title: {
          width: '100%',
          textAlign: 'center',
        },
        
      }}
      size='sm'
      radius={15} 
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
          label="Email"
          placeholder="Email"
          {...form.getInputProps('email')}
          mb="sm"
        />

        <TextInput
          label="Password"
          placeholder="Password"
          type="password"
          {...form.getInputProps('password')}
          mb="sm"
        />

        {error && (
          <Text c="red" mb="md" size="sm">
            {error}
          </Text>
        )}
        <Flex direction={'column'} mb={10} gap={5}>
          <Button type="submit" fullWidth radius={10}>
          Login
        </Button>
          <Text fz={'12px'} c='#486581' style={{ textAlign: 'right' }}>Forgot Password?</Text>
        </Flex>



        <Flex justify={'center'} gap={5} ta={'center'}>
          <Text fz={'12px'} c='#486581'>Don’t have an account?</Text>
          <Text
            fz={'12px'} c='#127FBF'
            style={{ cursor: 'pointer' }}
            onClick={() => {
              onClose?.();
              onRegisterClick?.();
            }}
          >
            Creat an account
          </Text></Flex>

      </Box>
    </Modal>
  );
};

export default LoginUserModal;
