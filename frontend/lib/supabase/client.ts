import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | undefined;

function resolveSupabaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (explicit) return explicit;
  const id = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID?.trim();
  if (id && !/your_project/i.test(id)) return `https://${id}.supabase.co`;
  return "";
}

/** Legacy JWT `anon` key or newer `sb_publishable_…` key (both work with supabase-js). */
function resolveSupabasePublicKey(): string {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    ""
  );
}

function isPlaceholderSupabaseEnv(url: string, key: string): boolean {
  const u = url.toLowerCase();
  if (u.includes("your_project") || u.includes("placeholder")) return true;
  const k = key.trim();
  if (/^your_anon_key$/i.test(k)) return true;
  return false;
}

export function isSupabaseConfigured(): boolean {
  const url = resolveSupabaseUrl();
  const key = resolveSupabasePublicKey();
  if (!url || !key) return false;
  if (isPlaceholderSupabaseEnv(url, key)) return false;
  return true;
}

export function getSupabaseBrowserClient(): SupabaseClient {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_PROJECT_ID) and NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local, then restart the dev server.",
    );
  }
  if (browserClient) return browserClient;
  const url = resolveSupabaseUrl();
  const key = resolveSupabasePublicKey();
  browserClient = createClient(url, key, {
    auth: {
      flowType: "pkce",
      detectSessionInUrl: true,
      persistSession: true,
      autoRefreshToken: true,
    },
  });
  return browserClient;
}
