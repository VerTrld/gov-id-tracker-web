"use client";
import { MultiSelectCreatable } from "@/componets/MultiSelectCreatable/MultiSelectCreatable";
import { Button, Flex, Input, Select, Text } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import * as y from "yup";

const governmentIdsFormSchema = y
  .object({
    officialUrls: y.array().of(y.string()).required(),
    code: y.string().required(),
    label: y.string().required(),
    description: y.string().optional(),
  })
  .required();
type IGovernmentIdsForm = y.InferType<typeof governmentIdsFormSchema>;

const page = () => {
  const governmentIdsForm = useForm<IGovernmentIdsForm>({
    validate: yupResolver(governmentIdsFormSchema),
    initialValues: {
      code: "",
      label: "",
      officialUrls: [],
      description: undefined,
    },
  });
  const { data } = useQuery({
    queryKey: ["governmentIds"],
    queryFn: async () => {
      const allGovernmentIds = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/government-ids/read/all`,
      );
      return (allGovernmentIds.data || []) as any[];
    },
  });

  useEffect(() => {
    console.log({ governmentIdsForm });
  }, [governmentIdsForm]);
  return (
    <Flex style={{ flexDirection: "column" }}>
      <Text>Government Ids</Text>
      <Flex
        style={{
          flexDirection: "column",
        }}
      >
        {data?.map((d, i) => {
          return (
            <Flex
              key={`government-ids-${i}`}
              style={{
                flexDirection: "column",
              }}
            >
              <Text>{d.label}</Text>
            </Flex>
          );
        })}
      </Flex>

      <form
        action={"submit"}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 20,
          gap: 10,
        }}
      >
        {/* <Select
          size="xs"
          styles={{
            input: {
              width: "",
            },
            dropdown: {
              textWrap: "nowrap",
            },
          }}
          data={data?.map((d) => {
            return {
              value: d.id,
              label: d.label,
            };
          })}
        /> */}
        <Input
          placeholder="Label"
          size="xs"
          {...governmentIdsForm.getInputProps("label")}
        />
        <Input
          placeholder="Code"
          size="xs"
          {...governmentIdsForm.getInputProps("code")}
        />
        <Input
          placeholder="Description"
          size="xs"
          {...governmentIdsForm.getInputProps("description")}
        />
        <MultiSelectCreatable
          {...governmentIdsForm.getInputProps("officialUrls")}
        />
        <Button size="xs" type="submit">
          Save
        </Button>
      </form>
    </Flex>
  );
};

export default page;
