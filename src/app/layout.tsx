import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";
import { ModalsProvider } from "@mantine/modals";
import type { Metadata } from "next";
import LoadingLayout from "@/layout/loading";
import QueryClientProvider from "@/provider/QueryClientProvider";
import {
  ColorSchemeScript,
  Flex,
  MantineProvider,
  createTheme,
  mantineHtmlProps,
} from "@mantine/core";
import { SessionProvider, useSession } from "next-auth/react";
import { PropsWithChildren } from "react";
import { theme } from "@/layout/theme";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";

export const metadata: Metadata = {
  icons: {
    icon: process.env.NEXT_PUBLIC_KARERAMO_LOGO,
  },
  title: "ID mo. Karera mo",
  description: "Capstone System",
};

interface IRootLayoutProps extends PropsWithChildren {}

export default function RootLayout({ children }: IRootLayoutProps) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />

        <meta property="og:title" content="ID mo. Karera mo" />
        <meta property="og:description" content="Capstone System" />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_KARERAMO_LOGO}
        />
        <meta property="og:url" content="https://idmokareramo.com/" />
        <meta property="og:type" content="website" />
      </head>
      <body>
        <SessionProvider>
          <QueryClientProvider>
            <MantineProvider theme={theme}>
              <ModalsProvider>
                <Notifications />
                <LoadingLayout>
                  <Flex h={"100vh"} w={"100%"}>
                    {" "}
                    {children}
                  </Flex>
                </LoadingLayout>
              </ModalsProvider>
            </MantineProvider>
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
