import { redirect } from "next/navigation";

import { createClient } from "~/utils/supabase/server";

export async function useAuthCheck() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/login');
  }

  return data;
}