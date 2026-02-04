import {
  Box,
  Paper,
  Text,
  TextInput,
  Button,
  Grid,
  Group,
  Flex,
  Title,
  GridCol,
  Textarea,
} from "@mantine/core";
import { IconMail, IconMapPin } from "@tabler/icons-react";

export default function ContactSection() {
  return (
    <Flex flex={1} direction={'column'} h={"100%"} justify={'center'}>
      {/* Header */}
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
       width:'100%',
          marginBottom: 30,
          
        }}
      >
        <Text
          component="h2"
          style={{
            fontSize: 32,
            fontWeight: 700,
            textDecoration: "underline",
            textDecorationColor: "#1971c2",
            textDecorationThickness: 3,
          }}
        >
          Contact Us
        </Text>
        <Text style={{ fontSize: 14, color: "#666", marginTop: 10 }}>
          Have questions, suggestions, or feedback? We are happy to hear from
          you.
        </Text>
      </Box>


<Flex >
      <Paper
        shadow="xl"
        radius="md"
        withBorder
        style={{
          maxWidth: 1000,
          width: "100%",
          margin: "auto",
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
                borderRadius:'10px'
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
              <Group grow >
                <TextInput
                  label="First Name"
                  variant="unstyled"
                  styles={{
                    input: { borderBottom: "1px solid #ccc" },
                  }}
                />
                <TextInput
                  label="Last Name"
                  variant="unstyled"
                  styles={{
                    input: { borderBottom: "1px solid #ccc" },
                  }}
                />
              </Group>

              <TextInput
                mt="xl"
                label="Email"
                variant="unstyled"
                w={'50%'}
                styles={{
                  input: { borderBottom: "1px solid #ccc" ,},
                }}
              />

              <Textarea
                mt="xl"
                label="Message"
                placeholder="Write your message..."
                variant="unstyled"
                styles={{
                  input: { borderBottom: "1px solid #ccc" , 
                    
                  },
                }}
              />

              <Flex w={"100%"} justify={"end"}>
                <Button mt="xl" radius="md">
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
