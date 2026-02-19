import { post } from "@/utils/http-api";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridCol,
  Group,
  Paper,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconMail, IconMapPin } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import * as y from "yup";

const contactFormSchema = y
  .object({
    message: y.string().min(20).required(),
    email: y.string().email().required(),
    firstName: y.string().required(),
    lastName: y.string().required(),
  })
  .required();

type IContactForm = y.InferType<typeof contactFormSchema>;

export default function ContactSection({ label }: { label: string }) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const session = useSession()
  const contactForm = useForm<IContactForm>({
    validate: yupResolver(contactFormSchema),
    initialValues: {
      message: "",
      email: session.data?.user?.email || "",
      firstName: session.data?.user?.name?.split(" ")[0] || "",
      lastName: session.data?.user?.name?.split(" ")[1] || "",
    },
  });

  const handleSendMessage = contactForm.onSubmit(async (values) => {
    try {
      const { firstName, lastName, ...resValue } = values;
      const res = await post("/email/create/one", {
        ...resValue,
        name: `${firstName} ${lastName}`,
      });

      if (res.status === 200 || res.status === 201) {
        notifications.show({
          message: "Successfuly send a message",
        });
        contactForm.reset();
      }
    } catch (error) {
      console.log({ error });
    }
  });
  return (
    <Flex flex={1} direction={"column"} justify={"center"} gap={30}>
      {/* Header */}
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          width: "100%",
          // marginBottom: 30,
        }}
      >
        <Title
          c={"#043873"}
          style={{
            // fontWeight: 900,
            lineHeight: 1.15,
            fontSize: isMobile ? 32 : 48,
            marginBottom: 20,
          }}
        >
          {label}
        </Title>
        <Text style={{ color: "#0A58BD" }}>
          Have questions, suggestions, or feedback? We are happy to hear from
          you.
        </Text>
      </Box>

      <Flex>
        <Paper
          shadow="xl"
          radius="md"
          withBorder
          style={{
            maxWidth: 1000,
            width: "100%",
            margin: "auto",
            boxShadow: "0 10px 10px rgba(0, 0, 0, 0.19)",
          }}
        >
          <Grid gutter={0}>
            {/* LEFT / BLUE */}
            <GridCol span={{ base: 12, md: 5, lg: 5 }}>
              <Box
                h="100%"
                p={40}
                bg="#0b5ed7"
                c="white"
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <Title order={3}>Contact Information</Title>
                <Text size="sm" mb="xl">
                  Send us a message!
                </Text>

                <Flex direction="column" gap="lg" mt="lg">
                  <Group>
                    <IconMail size={18} />
                    <Text size="sm">idmokareramo@gmail.com</Text>
                  </Group>

                  <Group align="flex-start">
                    <IconMapPin size={18} />
                    <Text size="sm">
                      Created by <br />
                      Multimedia Arts and Design students <br />
                      iACADEMY
                    </Text>
                  </Group>
                </Flex>

                {/* Decorative circles */}
                <Box
                  style={{
                    position: "absolute",
                    bottom: -20,
                    right: 40,
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.25)",
                  }}
                />
                <Box
                  style={{
                    position: "absolute",
                    bottom: -90,
                    right: -40,
                    width: 160,
                    height: 160,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                  }}
                />
              </Box>
            </GridCol>

            {/* RIGHT / FORM */}
            <GridCol span={{ base: 12, md: 7, lg: 7 }}>
              <Box h="100%" p={40}>
                <Group grow>
                  <TextInput
                    label="First Name"
                    placeholder="First Name"
                    {...contactForm.getInputProps("firstName")}
                  />
                  <TextInput
                    label="Last Name"
                    placeholder="Last Name"
                    {...contactForm.getInputProps("lastName")}
                  />
                </Group>

                <TextInput
                  mt="md"
                  label="Email"
                  placeholder="Email"
                  w={"50%"}
                  {...contactForm.getInputProps("email")}
                />

                <Textarea
                  mt="xl"
                  label="Message"
                  placeholder="Write your message..."
                  variant="unstyled"
                  styles={{
                    input: {
                      borderBottom: "1px solid #ccc",
                    },
                  }}
                  {...contactForm.getInputProps("message")}
                />

                <Flex w={"100%"} justify={"end"}>
                  <Button
                    mt="xl"
                    radius="md"
                    onClick={() => {
                      handleSendMessage();
                    }}
                  >
                    Send Message
                  </Button>
                </Flex>
              </Box>
            </GridCol>
          </Grid>
        </Paper>
      </Flex>
    </Flex>
  );
}
