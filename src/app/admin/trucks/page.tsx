import React from 'react';

import { BiPlusCircle, BiX } from 'react-icons/bi';

import { Box, HStack } from 'styled-system/jsx';
import { Button, Table, Drawer, IconButton } from '~/components/ParkUI';
import { useAuthCheck } from '~/hooks';
import { createClient } from '~/utils/supabase/server';

import { AddTruckForm } from './components/addTruck.form';

type Truck = {
  id: number;
  created_at: string;
  name: string;
  email_address: string;
  phone: string;
  url: string;
  facebook_url: string;
  menu_url: string;
};

const TruckAdmin = async () => {
  const supabase = createClient();
  await useAuthCheck();

  const { data: trucks, error: truckError } = await supabase.from('truck').select().returns<Truck[]>();

  return (
    <Box>
      <Drawer.Root>
        <HStack
          alignItems="center"
          justifyContent="space-between"
        >
          <Box fontSize="3xl">Food Truck Management</Box>

          <Drawer.Trigger asChild>
            <Button backgroundColor="green.500">
              <BiPlusCircle />
              Add New Truck
            </Button>
          </Drawer.Trigger>
        </HStack>

        <Table.Root>
          <Table.Head>
            <Table.Row>
              <Table.Cell>Name</Table.Cell>
              <Table.Cell>Email</Table.Cell>
              <Table.Cell>Phone</Table.Cell>
              <Table.Cell>URL</Table.Cell>
              <Table.Cell>Facebook</Table.Cell>
              <Table.Cell>Menu</Table.Cell>
            </Table.Row>
          </Table.Head>
          {trucks?.map((truck) => (
            <Table.Row key={truck.id}>
              <Table.Cell>{truck.name}</Table.Cell>
              <Table.Cell>{truck.email_address}</Table.Cell>
              <Table.Cell>{truck.phone}</Table.Cell>
              <Table.Cell>{truck.url}</Table.Cell>
              <Table.Cell>{truck.facebook_url}</Table.Cell>
              <Table.Cell>{truck.menu_url}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Root>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Add New Truck</Drawer.Title>
              <Drawer.CloseTrigger
                asChild
                position="absolute"
                top="3"
                right="4"
              >
                <IconButton variant="ghost">
                  <BiX />
                </IconButton>
              </Drawer.CloseTrigger>
            </Drawer.Header>
            <Drawer.Body>
              <AddTruckForm />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </Box>
  );
};

export default TruckAdmin;