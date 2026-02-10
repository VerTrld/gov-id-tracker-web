'use client';

import IPersonShcema from '@/schema/PersonSchema';
import { Box, Button, Checkbox, Flex, Modal, ModalProps, Text, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import Image from 'next/image';

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
      withCloseButton={false}
      centered
      title={
        <Flex direction={'column'} gap={10} align={'center'} mb={10}>
          <Image
            alt="Logo"
            src={`${process.env.NEXT_PUBLIC_KARERAMO_LOGO}`}
            width={50}
            height={50}
          />
          <Text c='#043873'  fw={700} fz={'16px'}>Create an account</Text>
          <Text c='#4F9CF9' fz={'14px'}>Create an account to track your government ID <br />
            requirements and prepare for employment</Text>
        </Flex>
      }
      styles={{
        title: {
          width: '100%',
          textAlign: 'center',
        },
      }}
      size='md'
      radius={15}
    >
      <Box
        component="form"
        onSubmit={form.onSubmit(() => onSubmit())}
        style={{
          width: '100%',
          maxWidth: 400,
          margin: '0 auto',
          padding: '10px'
        }}
      >
        <Flex justify={'space-between'} >

          <TextInput
            label="First Name"
            placeholder="First Name"
            {...form.getInputProps('firstName')}
            mb="sm"
          />
          <TextInput
            label="Last Name"
            placeholder="Last Name"
            {...form.getInputProps('lastName')}
            mb="sm"
          />
        </Flex>


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
        <TextInput
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
          {...form.getInputProps('confirmPassword')}
          mb="sm"
        />

        <Flex direction={'column'} gap={10}>
          <Checkbox
            color="#334E68"

            size="xs"
            label={
              <Text c='#334E68' fz={'12px'}> I agree to the Terms and Conditions. I understand that ID Mo,
                Karera Mo provides guidance only and is not connected to any government agency.</Text>
            }
            {...form.getInputProps('isTerms')}
          />

          <Button type="submit" fullWidth mb="md" radius={10} disabled={form.values.isTerms === false}>
            Create an account
          </Button>
        </Flex>


        <Flex direction={'column'} gap={20} justify={'center'}>
          <Flex justify={'center'} gap={5} ta={'center'}>
            <Text fz={'12px'} c='#486581'>Already have an account?</Text>
            <Text
              fz={'12px'} c='#127FBF'
              style={{ cursor: 'pointer' }}
              onClick={() => {
                onClose?.();
                onLoginClick?.();
              }}
            >
              Login
            </Text>
          </Flex>

          <Flex justify={'center'} ta={'center'}>
            <Text c='#043873' fz={'12px'}>This platform is a guide only. Applications are completed
              <br />
              through official government websites.</Text>
          </Flex></Flex>


      </Box>
    </Modal>
  );
};

export default RegisterUserModal;
