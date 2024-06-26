import type { Metadata } from "next";
import { Plus_Jakarta_Sans, League_Spartan } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from 'next/link';

import { Box, Flex } from "../../styled-system/jsx";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"]
});
const league = League_Spartan({
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "North Valleys Food Trucks",
  description: "A schedule for food trucks in the North Valleys area of Reno, NV"
};

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={jakarta.className}
        style={{
          backgroundColor: "background",
          position: 'relative'
        }}
      >
        <header>
          <Flex
            justifyContent="flex-start"
            alignItems="center"
            gap="16px"
            boxShadow="lg"
            paddingX="16px"
            marginBottom="4"
            position="fixed"
            width="100%"
            zIndex="1"
            backgroundColor="white"
          >
            <Image
              src="/line-art-food-truck.png"
              alt="NVFT Logo"
              width={100}
              height={100}
            />
            <Flex direction="column">
              <Box
                className={league.className}
                fontWeight="800"
                fontSize={{
                  base: "36px",
                  md: "48px"
                }}
                color="sky.400"
                WebkitTextStrokeColor="black"
                WebkitTextStrokeWidth="2px"
              >North Valleys
              </Box>
              <Box
                className={league.className}
                marginTop={{
                  base: "-12px",
                  md: "-24px"
                }}
                letterSpacing="14px"
                textTransform="lowercase"
                textAlign="center"
              >
                Food Trucks
              </Box>
            </Flex>
          </Flex>
        </header>
        <Box
          margin="0 auto"
          maxWidth="1200px"
          paddingTop={{
            base: "100px",
            md: "140px"
          }}
          paddingBottom="60px"
          paddingX={{
            base: "12px",
            md: "16px"
          }}
        >
          {children}
        </Box>
        <footer>
          <Flex
            justifyContent="center"
            alignItems="center"
            gap="16px"
            borderTop="solid 2px"
            position="fixed"
            bottom="0"
            width="100%"
            backgroundColor="white"
          >
            <Box
              className={league.className}
              fontWeight="200"
              fontSize={{
                base: "16px",
                md: "18px"
              }}
              letterSpacing={{
                base: "initial",
                md: "1px"
              }}
              textTransform="lowercase"
              paddingTop="4px"
              textAlign="center"
            >
              Made with &#x1F499; in Lemmon Valley by
              <Link
                href="https://riceboyler.com"
                target="_blank"
                rel="noopener"
                color="#00CCFF"
              >
                riceboyler
              </Link>  &copy; and All Rights Reserved
            </Box>
          </Flex>
        </footer>
      </body>
    </html>
  );
}
