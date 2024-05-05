import type { Metadata } from "next";
import Link from 'next/link';
import { Plus_Jakarta_Sans, League_Spartan } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { Box, Flex } from "../../styled-system/jsx";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const league = League_Spartan({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jakarta.className} style={{ backgroundColor: "background", position: 'relative' }}>
        <header>
          <Flex justifyContent="flex-start" alignItems="center" gap="16px" boxShadow="lg" paddingX="16px" marginBottom="4" position="fixed" width="100%">
            <Image src="/line-art-food-truck.png" alt="NVFT Logo" width={100} height={100} />
            <Flex direction="column">
              <Box className={league.className} fontWeight="800" fontSize="48px" color="sky.400" WebkitTextStrokeColor="black" WebkitTextStrokeWidth="2px">North Valleys</Box>
              <Box className={league.className} fontWeight="100" fontSize="36px" marginTop="-24px" letterSpacing="14px" textTransform="lowercase" textAlign="center">
                Food Trucks
              </Box>
            </Flex>
          </Flex>
        </header>
        <Box margin="0 auto" maxWidth="1200px" paddingTop="140px">
          {children}
        </Box>
        <footer>
          <Flex justifyContent="center" alignItems="center" gap="16px" borderTop="solid 2px" position="fixed" bottom="0" width="100%">
            <Box className={league.className} fontWeight="200" fontSize="18px" letterSpacing="1px" textTransform="lowercase" paddingTop="4px">
              Made with &#x1F499; in Lemmon Valley by <Link href="https://riceboyler.com" target="_blank" rel="noopener" color="#00CCFF"> riceboyler</Link>  &copy; and All Rights Reserved
            </Box>
          </Flex>
        </footer>
      </body>
    </html>
  );
}
