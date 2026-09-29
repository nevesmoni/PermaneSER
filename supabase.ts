import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://trnejpkivtpbjmkbvxci.supabase.co";
const supabasePublishableKey = "sb_publishable_SHYIEZPfcmhGpBDDsHUrtA_CdGgZh7Y";

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
);