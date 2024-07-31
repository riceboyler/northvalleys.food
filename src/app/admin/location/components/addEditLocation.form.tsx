"use client";
import React from 'react';

import { useForm } from '@tanstack/react-form';
import { BiSave } from 'react-icons/bi';
import { z } from 'zod';

import { VStack } from 'styled-system/jsx';
import { Form, FormFields } from '~/components';
import { Button, Drawer } from '~/components/ParkUI';
import { createClient } from '~/utils/supabase/client';

import type { Location } from '../page';

type Props = {
  location?: Location;
  includeButtons?: boolean;
  Drawer?: typeof Drawer;
};

export const AddEditLocationForm = ({ location, includeButtons, Drawer }: Props) => {
  const supabase = createClient();
  const form = useForm<Location>({
    defaultValues: {
      id: location?.id ?? 0,
      created_at: location?.created_at ?? '',
      name: location?.name ?? '',
      address: location?.address ?? '',
      address2: location?.address2 ?? '',
      city: location?.city ?? '',
      state: location?.state ?? '',
      zip: location?.zip ?? '',
      public: location?.public ?? false
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      supabase.from('location').upsert(value);
    }
  });

  return (
    <Form form={form}>
      <VStack>
        <FormFields.Input
          form={form}
          name="name"
          label="Location Name"
          validators={{
            onBlur: z?.string()?.min(
              3, 'Name must be at least 3 characters'
            )
          }}
        />
        <FormFields.Input
          form={form}
          name="address"
          label="Address"
          validators={{
            onBlur: z?.string()?.min(
              3, 'Address must be at least 3 characters'
            )
          }}
        />
        <FormFields.Input
          form={form}
          name="address2"
          label="Address 2"
        />
        <FormFields.Input
          form={form}
          name="city"
          label="City"
          validators={{
            onBlur: z?.string()?.min(
              3, 'City must be at least 3 characters'
            )
          }}
        />
        <FormFields.Input
          form={form}
          name="state"
          label="State"
          validators={{
            onBlur: z?.string()?.length(
              2, 'State must be exactly 2 characters'
            )
          }}
        />
        <FormFields.Input
          form={form}
          name="zip"
          label="Zip"
          validators={{
            onBlur: z?.string()?.min(
              5, 'Zip must be at least 5 characters'
            )
          }}
        />
        {includeButtons && Drawer && (
          <Drawer.CloseTrigger asChild>
            <Button
              backgroundColor="green.500"
              variant="solid"
              onClick={() => form.handleSubmit()}
            >
              <BiSave />
              Save Location
            </Button>
          </Drawer.CloseTrigger>
        )}
      </VStack>
    </Form>
  );
};