import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Jangan melempar error di module scope — hal itu membuat build gagal saat
// env belum tersedia (mis. "collecting page data" di Vercel). Error baru
// muncul saat benar-benar dipakai di runtime.
let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Supabase server environment variables are missing");
  }

  cached = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return cached;
}
