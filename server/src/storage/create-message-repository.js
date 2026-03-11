import { createMemoryMessageRepository } from "./create-memory-message-repository.js";
import { createSupabaseMessageRepository } from "./create-supabase-message-repository.js";

export const createMessageRepository = (config) => {
  if (config.storageDriver === "supabase") {
    return createSupabaseMessageRepository({
      supabaseUrl: config.supabaseUrl,
      supabaseAnonKey: config.supabaseAnonKey,
    });
  }

  return createMemoryMessageRepository();
};
