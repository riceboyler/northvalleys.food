import React from 'react';

import { FormApi } from '@tanstack/react-form';

export type FormProps = {
  form: FormApi<any>;
  children: React.ReactNode;
};

export const Form = ({ form, children }: FormProps) => {
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();
        void form.handleSubmit();
      }}
    >
      {children}
    </form>
  );
};