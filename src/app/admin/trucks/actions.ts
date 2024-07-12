import { ServerValidateError, createServerValidate } from "@tanstack/react-form/nextjs";

import { formOpts } from "./shared-code";
import { createClient } from "../../../utils/supabase/server";

const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: ({ value }) => {
    if (value.name === '') {
      return 'Name is required';
    }
  }
});

export default async function someAction(
  prev: unknown, formData: FormData
) {
  const supabase = createClient();
  try {
    await serverValidate(formData);
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState;
    }

    // Some other error occurred while validating your form
    throw e;
  }

  // Your form has successfully validated!

  const { data, error } = await supabase.from('truck').insert({
    name: formData.get('name'),
    email_address: formData.get('emailAddress'),
    phone: formData.get('phone'),
    url: formData.get('url'),
    facebook_url: formData.get('facebook'),
    menu_url: formData.get('menuUrl')
  })
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}