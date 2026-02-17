"use client";

import { Modal, Button, Flex, ActionIcon, Text, ModalProps, TextInput, Box } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { SelectCreatable } from "@/componets/SelectCreatable/SelectCreateble";
import { get, post } from "@/utils/http-api";
import { useState } from "react";
import Image from "next/image";
import IGovernmentIdsForm from "@/schema/GovIds";

interface IGovernmentIdModal extends ModalProps {
    onSubmit: () => void;
    form: UseFormReturnType<IGovernmentIdsForm>;
    onSuccess?: () => void;
}

export const GovernmentIdModal = ({ opened, onClose, form, onSubmit }: IGovernmentIdModal) => {
    // Fetch existing requirements
    const { data: requirements, refetch } = useQuery({
        queryKey: ["requirements"],
        queryFn: async () => {
            const res = await get(`/requirements/read/all`);
            return res.data || [];
        },
    });

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
                    <Text c='#043873' fw={700} fz={'16px'}>Create Government ID</Text>
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
                onSubmit={form.onSubmit(() => { onSubmit(), refetch() })}
                style={{
                    width: '100%',
                    maxWidth: 400,
                    margin: '0 auto',
                    padding: '10px'
                }}
            >

                <Flex direction={'column'}>
                    <TextInput
                        label="Label"
                        placeholder="Label"
                        mb="sm"
                        {...form.getInputProps("label")}
                    />

                    <TextInput
                        label="Code"
                        placeholder="Code"
                        mb="sm"
                        {...form.getInputProps("code")}
                    />

                    <TextInput
                        label="Official URL"
                        placeholder="Official URL"
                        mb="sm"
                        {...form.getInputProps("officialUrls")}
                    />

                    <TextInput
                        label="Description"
                        placeholder="Description"
                        mb="sm"
                        {...form.getInputProps("description")}
                    />

                    <Flex direction={'column'} gap={5}>
                        <Text fz={'12px'} mt="sm" c='#334E68' fw={700}>Requirements</Text>

                        {form.values?.requirementIds?.map((req, idx) => (
                            <Flex key={idx} gap="sm" align="center">
                                <SelectCreatable
                                    inputValue={form.getInputProps(`requirementIds.${idx}.label`).value}
                                    onChangeOptionSelect={(value) => {
                                        const selected = requirements?.find((r: any) => r.label === value);
                                        form.setFieldValue(`requirementIds.${idx}.label`, value);
                                        form.setFieldValue(`requirementIds.${idx}.id`, selected?.id || "");
                                    }}
                                    data={requirements?.map((r: any) => r.label) || []}
                                    w="100%"
                                />
                                <ActionIcon onClick={() => form.removeListItem("requirementIds", idx)} color="red">
                                    <IconMinus size={20} />
                                </ActionIcon>
                            </Flex>
                        ))}

                        <ActionIcon onClick={() => form.insertListItem("requirementIds", { label: "" })} color="green">
                            <IconPlus size={20} />
                        </ActionIcon>
                        <Button type="submit" radius={10} >Save</Button>
                    </Flex>
                </Flex>
            </Box>

        </Modal>
    );
};
