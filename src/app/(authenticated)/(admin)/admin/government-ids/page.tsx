"use client";
import { Button, Flex, Input, Text } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import * as y from "yup";

const governmentIdsFormSchema = y
  .object({
    officialUrls: y.string().required(),
    code: y.string().required(),
    label: y.string().required(),
    description: y.string().optional(),
    requirements: y.array().of(y.object({
      label: y.string().required(),
      requirementsGovernmentIds: y.array().of(y.string()).required()
    })).required()
  })
  .required();
type IGovernmentIdsForm = y.InferType<typeof governmentIdsFormSchema>;

const page = () => {
  const query = useQueryClient()
  const governmentIdsForm = useForm<IGovernmentIdsForm>({
    validate: yupResolver(governmentIdsFormSchema),
    initialValues: {
      code: "",
      label: "",
      officialUrls: '',
      description: '',
      requirements: [

      ]
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

  const handleCreateGovernmentIds = governmentIdsForm.onSubmit(async (e) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/government-ids/create/one`,
        {
          ...e,
          officialUrls: [e.officialUrls]
        })

      if (res.status === 200 || res.status === 201) {
        alert('Created Government Ids')
        query.invalidateQueries({ queryKey: ['governmentIds'] })
      }
    } catch (error) {

    }
  })

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
        onSubmit={(e) => {
          e.preventDefault()
          handleCreateGovernmentIds()
        }}
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
        <Input size="xs" placeholder="Official Url" {...governmentIdsForm.getInputProps('officialUrls')} />
        {/* <MultiSelectCreatable
          placeholder="Official Urls"
          {...governmentIdsForm.getInputProps("officialUrls")}
        /> */}
        <Button size="xs" type="submit">
          Save
        </Button>
        {
          governmentIdsForm.values.requirements.map(r => {
            return <>
              <Flex style={{ padding: 10, backgroundColor: 'ghostwhite' }}>

              </Flex>
            </>
          })
        }
        {/* {
          _.isEmpty(governmentIdsForm.values.requirements) ? <ActionIcon><ActionIcon> : null
        } */}
      </form>
    </Flex>
  );
};

export default page;
