/** Supabase / PostgREST errors often omit enumerable fields, so `console.log(err)` shows `{}`. */
export function formatSupabaseError(err: unknown): string {
  if (err == null) return "Unknown error";
  if (typeof err === "string") return err;
  if (typeof err !== "object") return String(err);
  const o = err as {
    message?: string;
    code?: string;
    details?: string;
    hint?: string;
  };
  const parts = [o.message, o.details, o.hint, o.code].filter(
    (s): s is string => typeof s === "string" && s.length > 0,
  );
  return parts.length > 0 ? parts.join(" — ") : "Request failed";
}

export function logSupabaseError(context: string, err: unknown): void {
  const msg = formatSupabaseError(err);
  console.error(`[${context}]`, msg, err);
}
