"use client";
import React from 'react';

import { useForm } from '@tanstack/react-form';

import { Box, VStack } from 'styled-system/jsx';
import { Form } from '~/components/Form';

import { FormFields } from '../../../../components';
import { formOpts } from '../shared-code';

export const AddTruckForm = () => {
  const form = useForm(formOpts);
  return (
    <Box>
      <Form form={form}>
        <VStack>
          <FormFields.Input
            form={form}
            name="name"
            label="Truck Name"
          />
        </VStack>
      </Form>
    </Box>
  );
};