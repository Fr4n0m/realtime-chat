import { createClient } from "@supabase/supabase-js";

export const createSupabaseMessageRepository = ({ supabaseUrl, supabaseAnonKey }) => {
  const client = createClient(supabaseUrl, supabaseAnonKey);

  const save = async ({ content, user }) => {
    const { data, error } = await client
      .from("messages")
      .insert([{ content, user }])
      .select("id, content, user")
      .single();

    if (error) {
      throw error;
    }

    return data;
  };

  const list = async () => {
    const { data, error } = await client
      .from("messages")
      .select("id, content, user")
      .order("id", { ascending: true });

    if (error) {
      throw error;
    }

    return data;
  };

  return {
    save,
    list,
  };
};
