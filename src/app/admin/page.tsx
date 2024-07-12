import React from 'react';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { BiPlusCircle } from 'react-icons/bi';

import { createClient } from '~/utils/supabase/server';

import { Box, HStack, VStack } from '../../../styled-system/jsx';
import { Button } from '../../components/ParkUI';

type Props = {};

const Admin = async (props: Props) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <VStack>
      <Box
        textAlign="center"
        fontSize="3xl"
      >
        Welcome, {data.user.email}!
      </Box>
      <HStack gap={4}>
        <Link href="/admin/trucks">
          <Button
            backgroundColor="green.500"
          >
            <BiPlusCircle />
            Add New Truck
          </Button>
        </Link>
      </HStack>
    </VStack>
  );

};

export default Admin;