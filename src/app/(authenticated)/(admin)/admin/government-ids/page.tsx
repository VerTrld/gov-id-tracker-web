"use client";
import { SelectCreatable } from "@/componets/SelectCreatable/SelectCreateble";
import { IdTypes } from "@/entities/IdTypes";
import { IRequirement } from "@/entities/IRequirement";
import { get, post } from "@/utils/http-api";
import { ActionIcon, Button, Flex, Input, Text } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import * as y from "yup";

const governmentIdsFormSchema = y
  .object({
    officialUrls: y.string().required(),
    code: y.string().required(),
    label: y.string().required(),
    description: y.string().optional(),
    requirements: y
      .array()
      .of(
        y
          .object({
            id: y.string().optional(),
            label: y.string().required(),
          })
          .required(),
      )
      .min(1)
      .required(),
  })
  .required();
type IGovernmentIdsForm = y.InferType<typeof governmentIdsFormSchema>;

const page = () => {
  const query = useQueryClient();
  const governmentIdsForm = useForm<IGovernmentIdsForm>({
    validate: yupResolver(governmentIdsFormSchema),
    initialValues: {
      code: "",
      label: "",
      officialUrls: "",
      description: "",
      requirements: [
        {
          label: "",
        },
      ],
    },
  });
  const { data: governemntIds } = useQuery({
    queryKey: ["governmentIds"],
    queryFn: async () => {
      const allGovernmentIds = await get(`/id-types/read/all`);
      console.log({ allGovernmentIds });
      return (allGovernmentIds.data || []) as IdTypes[];
    },
  });

  const { data: requirements } = useQuery({
    queryKey: ["requirements"],
    queryFn: async () => {
      const allGovernmentIds = await get(`/requirement/read/all`);
      console.log({ allGovernmentIds });
      return (allGovernmentIds.data || []) as IRequirement[];
    },
  });

  const handleCreateGovernmentIds = governmentIdsForm.onSubmit(async (e) => {
    const { requirements, ...resReq } = e
    try {
      const res = await post(`/government-ids/create/one`, {
        ...resReq,
        officialUrls: [e.officialUrls],
        Requirements: e.requirements.map((r) => {
          return {
            id: r.id,
            label: r.label,
          };
        }),
      });

      if (res.status === 200 || res.status === 201) {
        alert("Created Government Ids");
        query.invalidateQueries({ queryKey: ["governmentIds"] });
      }
    } catch (error) {}
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
        {governemntIds?.map((d, i) => {
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
          e.preventDefault();
          handleCreateGovernmentIds();
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
        <Input
          size="xs"
          placeholder="Official Url"
          {...governmentIdsForm.getInputProps("officialUrls")}
        />

        <Flex style={{ flexDirection: "column", gap: 10 }}>
          {governmentIdsForm.values.requirements.map((r, reqI) => {
            return (
              <Flex
                key={`requirement-${reqI}`}
                style={{
                  gap: 10,
                  padding: 10,
                  backgroundColor: "ghostwhite",
                  border: "1px sol1black",
                  borderRadius: 10,
                }}
              >
                <Flex gap={10}>
                  <SelectCreatable
                    inputValue={
                      governmentIdsForm.getInputProps(
                        `.requirements.${reqI}.label`,
                      ).value
                    }
                    onChangeOptionSelect={(e) => {
                      const val = governmentIdsForm.getInputProps(
                        `requirements.${reqI}.label`,
                      ).value;
                      console.log({ e, val, isTrue: e === val });
                      if (e === val) {
                        console.log({ tang: "" });
                        governmentIdsForm.setFieldValue(
                          `requirements.${reqI}.label`,
                          "",
                        );
                        governmentIdsForm.setFieldValue(
                          `requirements.${reqI}.id`,
                          undefined,
                        );
                      }
                      if (requirements?.map((v) => v.label).includes(e)) {
                        const selected = requirements.find(
                          (v) => v.label === e,
                        );
                        governmentIdsForm.setFieldValue(
                          `requirements.${reqI}.label`,
                          selected?.label,
                        );
                        governmentIdsForm.setFieldValue(
                          `requirements.${reqI}.id`,
                          selected?.id,
                        );
                      } else {
                        governmentIdsForm.setFieldValue(
                          `requirements.${reqI}.label`,
                          e,
                        );
                        governmentIdsForm.setFieldValue(
                          `requirements.${reqI}.id`,
                          "",
                        );
                      }
                    }}
                    data={requirements?.map((v) => v.label) || []}
                  />
                  <ActionIcon
                    onClick={() => {
                      governmentIdsForm.removeListItem(`requirements`, reqI);
                    }}
                  >
                    <IconMinus />
                  </ActionIcon>
                </Flex>
              </Flex>
            );
          })}
          <ActionIcon
            onClick={() => {
              governmentIdsForm.insertListItem("requirements", {
                label: "",
              });
            }}
          >
            <IconPlus />
          </ActionIcon>
        </Flex>
        <Button size="xs" type="submit">
          Save
        </Button>
      </form>
    </Flex>
  );
};

export default page;
