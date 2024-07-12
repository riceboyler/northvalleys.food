import React from 'react';

import { BiLogIn, BiLogoFacebookCircle, BiRocket } from 'react-icons/bi';

import { Box, Flex } from 'styled-system/jsx';
import { Button, FormLabel, Input } from '~/components/ParkUI';

import { login, loginWithFacebook, signup } from './actions';

type Props = {};

export default async function LoginPage(props: Props) {
  return (
    <form>
      <Flex
        flexDirection="column"
        maxWidth="400px"
        margin="auto"
        gap="8px"
      >
        <Box>
          <FormLabel htmlFor="email">Email:</FormLabel>
          <Input
            size="sm"
            id="email"
            name="email"
            type="email"
            required
          />
        </Box>
        <Box>
          <FormLabel htmlFor="password">Password:</FormLabel>
          <Input
            size="sm"
            id="password"
            name="password"
            type="password"
            required
          />
        </Box>
      </Flex>
      <Flex
        marginTop="16px"
        flexDirection="row"
        maxWidth="400px"
        alignItems="center"
        justifyContent="space-between"
        margin="auto"
      >
        <Button
          backgroundColor="blue.700"
          formAction={loginWithFacebook}
        >
          <BiLogoFacebookCircle />
          Login With Facebook
        </Button>
        <Button
          backgroundColor="blue.500"
          formAction={login}
        >
          <BiLogIn />
          Log in
        </Button>
        <Button
          formAction={signup}
          backgroundColor="green.500"
        >
          <BiRocket />
          Sign up
        </Button>
      </Flex>
    </form>
  );
}
