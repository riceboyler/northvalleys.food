
import { BiPlusCircle, BiXCircle } from "react-icons/bi";

import { Box, HStack, VStack, Wrap } from "styled-system/jsx";
import { Button, Drawer, IconButton } from "~/components/ParkUI";
import { useAuthCheck } from "~/hooks";
import { createClient } from "~/utils/supabase/server";

import { EditableCard } from "./components";
import { AddEditLocationForm } from "./components/addEditLocation.form";


export type Location = {
  id: number;
  created_at: string;
  name: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  public: boolean;
};

const LocationAdmin = async () => {
  const supabase = createClient();
  await useAuthCheck();

  const { data: locations, error: locationError } = await supabase.from('location').select().returns<Location[]>();

  return (
    <Box>
      <VStack
        alignItems="center"
        justifyContent="space-between"
      >
        <Drawer.Root>
          <HStack
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Box fontSize="3xl">Location Management</Box>
            <Drawer.Trigger asChild>
              <Button backgroundColor="green.500">
                <BiPlusCircle />
                Add New Location
              </Button>
            </Drawer.Trigger>
          </HStack>
          <Wrap>
            {locations?.map((location) => (
              <EditableCard
                key={location.id}
                location={location}
              />
            ))}
          </Wrap>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Add New Location</Drawer.Title>
                <Drawer.CloseTrigger
                  asChild
                  position="absolute"
                  top="3"
                  right="4"
                  cursor="pointer"
                >
                  <IconButton
                    aria-label="Close"
                    variant="ghost"
                  >
                    <BiXCircle />
                  </IconButton>
                </Drawer.CloseTrigger>
              </Drawer.Header>
              <Drawer.Body>
                <AddEditLocationForm
                  includeButtons
                  Drawer={Drawer}
                />
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.Root>
      </VStack>
    </Box>
  );
};

export default LocationAdmin;