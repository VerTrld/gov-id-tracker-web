"use client";

import { Box, Button, Divider, Flex, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useRef } from "react";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import Footer from "@/componets/Footer/Footer";
import { useRouter } from "next/navigation";
import ContactSection from "@/componets/ContactUs/ContactUs";
import { IDInfo, idsInfo } from "@/componets/UserNav/govenmentIds";
import _, { chunk } from "lodash";
import IDsCard from "@/componets/IDsCard/IDsCard";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const autoplay = useRef(Autoplay({ delay: 3000 }));
  const router = useRouter();

  const data: IDInfo[] = idsInfo;
  const chunkedData = chunk(data, 4);

  return (
    <>
      <Flex direction={"column"} flex={1}
        style={{ zIndex: -1 }}
      >

        {/* 1st Section */}
        <Flex
          direction="column"
          gap={80}
          style={{
            flex: 1,
            padding: isMobile ? "60px 20px" : "100px",
          }}
        >
          {/* Hero */}
          <Flex
            gap={40}
            align="center"
            justify="space-around"
            direction={isMobile ? "column" : "row"}
          // style={{ flex: 1 }}
          >
            {/* Left Content */}
            <Box
              style={{
                flex: 1,
                textAlign: isMobile ? "center" : "left",

              }}
            >
              <Title
                order={1}
                style={{
                  fontWeight: 900,
                  lineHeight: 1.15,
                  fontSize: isMobile ? 32 : 48,
                  marginBottom: 20,
                  color: '#0A58BD',
                  width: isMobile ? '100%' : '75%',
                  // textAlign: 'center'

                }}
              >
                Your One-Stop Guide to  Government IDs for&nbsp;
                {/* <br /> */}
                <span
                  style={{
                    background: 'linear-gradient(180deg, #0A58BD, #043873)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  First-Time Jobseekers
                </span>
              </Title>

              <Text
                size={isMobile ? "md" : "lg"}
                c="#0A58BD"
                style={{
                  width: isMobile ? '100%' : '65%',
                  // textAlign: 'center'
                  // maxWidth: 520,
                  // margin: isMobile ? "0 auto 28px" : "0 0 36px",
                }}
              >
                Understand what documents you need, track your progress, and
                prepare for employment with confidence.
              </Text>

              <Flex
                pt={20}
                gap="md"
                justify={isMobile ? "center" : "flex-start"}
                wrap="wrap"
              >
                <Button
                  size="md"
                  radius="md"
                  onClick={() => router.push("?action=register")}
                >
                  <Flex gap={10}>
                    <Text ff={'Helvetica'}>Sign Up</Text>
                    <IconArrowNarrowRight />
                  </Flex>
                </Button>
              </Flex>
            </Box>

            {/* Right Visual */}
            <Image
              alt='saadds'
              src={`${process.env.NEXT_PUBLIC_LANDING_IMAGE}`}
              height={isMobile ? 220 : 400}
              width={isMobile ? 330 : 690}
              style={{
                borderRadius: "145px",
                boxShadow: "0 10px 10px rgba(0, 0, 0, 0.19)",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                color: "#868e96",
              }}
            />
          </Flex>

          {/* Info Section */}
          <Flex align="center" direction="column" gap={50}>
            <Title
              c="#043873"
              ta={"center"}
              style={{
                fontWeight: 900,
                lineHeight: 1.15,
                fontSize: isMobile ? 32 : 48,
              }}
            >
              What ID Mo, Karera Mo Does
            </Title>
            {/* <Divider color="rgb(4, 56, 115)" size="md" /> */}

            <Text ta="center" c="#0A58BD" style={{ maxWidth: 700 }}>
              ID Mo, Karera Mo helps first-time jobseekers organize and track
              the government IDs needed for employment. We guide you through the
              process and connect you to official government websites for
              application.
            </Text>

            <Button onClick={() => router.push("/features")}>How it Works</Button>
          </Flex>
        </Flex>

        {/* 2nd Section */}
        <Flex
          direction={"column"}
          bg={"#E6F1FE"}
          gap={50}
          style={{
            flex: 1,
            padding: isMobile ? "60px 20px" : "100px",

          }}
        >
          <Title
            // c="#043873"
            ta={"center"}
            style={{
              fontWeight: 900,
              lineHeight: 1.15,
              fontSize: isMobile ? 32 : 48,
              color: "#043873",
            }}
          >
            Commonly Required Government IDs
          </Title>
          <Carousel
            slideSize="100%" // full width
            slideGap={0} // no gap between slides
            loop
            align="start"
            withIndicators
            // flex={1}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            style={{ width: isMobile ? '320px' : '100%', alignSelf: 'center', justifySelf: 'center' }}
          >
            {/* First Slide: Full-screen Hero */}
            {chunkedData.map((slideItems, slideIndex) => (
              <Carousel.Slide key={slideIndex}>
                <Flex
                  direction="column"
                  style={{
                    // flex: 1,
                    height: isMobile ? '150vh' : '50vh',

                  }}
                >
                  <Flex
                    style={{
                      // flex: 1,
                      padding: isMobile ? '40px 10px' : '80px',
                      flexDirection: isMobile ? 'column' : 'row',
                      flexWrap: 'wrap',

                    }}
                    gap={isMobile ? 10 : 20}
                    justify={isMobile ? 'center' : 'space-evenly'}
                    align={isMobile ? 'center' : 'stretch'}
                  >
                    {slideItems.map((v, index) => (
                      <IDsCard
                        key={index} // stable key\
                        logo={v.logo || ''}
                        title={v.title}
                        desc={v.description}
                      />
                    ))}
                  </Flex>
                </Flex>
              </Carousel.Slide>
            ))}


          </Carousel>
        </Flex>

        {/* 3rd Section */}
        <Flex
          gap={isMobile ? 40 : 60}
          align="center"
          justify="space-evenly"
          direction={isMobile ? "column" : "row"}
          style={{ flex: 1, padding: isMobile ? "60px 20px" : "100px" }}
        >
          {/* Left Visual */}

          <Image alt="barangayCert"
            width={isMobile ? 220 : 520}
            height={isMobile ? 220 : 600}
            src={`${process.env.NEXT_PUBLIC_BRGY_CERTIFICATE}`}
            style={{
              background: "linear-gradient(135deg, #f1f3f5, #e9ecef)",
              borderRadius: 16,
              alignItems: "center",
              justifyContent: "center",
              color: "#868e96",
            }}
          />

          {/* Right Content */}
          <Box
            style={{
              // flex: 1,
              textAlign: isMobile ? "center" : "left",
            }}
          >
            <Title
              order={1}
              style={{
                fontWeight: 900,
                lineHeight: 1.15,
                fontSize: isMobile ? 32 : 48,
                marginBottom: 20,
                color: "#043873",
              }}
            >
              First Time Jobseekers
              <br />
              Assistance Act
            </Title>

            <Text
              size={isMobile ? "md" : "lg"}
              c="dimmed"
              style={{
                maxWidth: 520,
                margin: isMobile ? "0 auto 28px" : "0 0 36px",
              }}
            >
              Qualified first time jobseekers may use a First Time Jobseeker
              Certification from their Barangay to request free copies of
              certain employment-related documents under RA 11261.
            </Text>

            <Text
              size={isMobile ? "md" : "lg"}
              c="dimmed"
              style={{
                maxWidth: 520,
                margin: isMobile ? "0 auto 28px" : "0 0 36px",
              }}
            >
              ID Mo, Karera Mo helps you understand how this certificate works
              and how to use it properly.
            </Text>

            <Flex
              gap="md"
              justify={isMobile ? "center" : "flex-start"}
              wrap="wrap"
            >
              <Button
                size="md"
                radius="md"
                component={Link}
                href="/about#section2"
              // onClick={() => router.push("/about")}
              >
                <Flex gap={10}>
                  <Text>Learn About the Certificate </Text>
                  <IconArrowNarrowRight />
                </Flex>
              </Button>
            </Flex>
          </Box>
        </Flex>

        {/* 4th Section */}
        <Flex
          direction="column"
          gap={80}
          style={{
            flex: 1,
            padding: isMobile ? "60px 20px" : "100px",
          }}
        >
          <Flex direction={'column'} gap={10} align={'center'}>
            <Title
              order={1}
              style={{
                fontWeight: 900,
                lineHeight: 1.15,
                fontSize: isMobile ? 32 : 48,
                marginBottom: 20,
                color: '#043873',
                textAlign: 'center'
              }}
            >
              Start preparing your requirements today.
            </Title>
            {/* <Button
              onClick={() => router.push("?action=register")}
              c="#4F9CF9"
              radius={5}
            >
              <Flex gap={5} align={"center"}>
                <Text c="#FFFFFF" ta={"center"} ff={'Helvetica'}>
                  Sign Up
                </Text>
                <IconArrowNarrowRight color="#FFFFFF" />
              </Flex>
            </Button> */}
          </Flex>
        </Flex>

        {/* Footer */}
        <Flex flex={1}>
          <Footer />
        </Flex>
      </Flex>
    </>
  );
}
