import React from 'react';

import { FieldValidators, FormApi, useField } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';

import { Stack } from 'styled-system/jsx';

import { FormLabel, Input } from '../ParkUI';

type Props = {
  form: FormApi<any>;
  name: string;
  label: string;
  defaultValue?: string;
  validators?: FieldValidators<any, string>;
};

export const InputField = ({ form, name, defaultValue, label, validators }: Props) => {
  const field = useField({
    name,
    form,
    defaultValue,
    validators,
    validatorAdapter: zodValidator()
  });
  return (
    <Stack>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        name={name}
        value={field.state.value?.toString()}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
    </Stack>
  );
};