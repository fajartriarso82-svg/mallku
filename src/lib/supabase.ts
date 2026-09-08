import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Example helper functions
export const fetchCategories = async () => {
  const { data, error } = await supabase.from("kategoriProduk").select("*");
  if (error) throw error;
  return data;
};

export const fetchStores = async (city?: string) => {
  let query = supabase.from("tokoProfile").select("*");
  if (city) query = query.ilike("kabupatenKota", `%${city}%`);
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const fetchProducts = async (params: { kota?: string; q?: string; kategoriSlug?: string } = {}) => {
  let query = supabase.from("listingMP").select("*");
  if (params.kota) query = query.ilike("kabupatenKota", `%${params.kota}%`);
  if (params.q) query = query.or(`judulJual.ilike.%${params.q}%,deskripsi.ilike.%${params.q}%`);
  if (params.kategoriSlug) query = query.eq("kategoriSlug", params.kategoriSlug);
  const { data, error } = await query;
  if (error) throw error;
  return data;
};
