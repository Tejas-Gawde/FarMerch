// Importing createClient from cdn
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
// Creating a supabase client
export const supabase = createClient(
    "https://xkbaxhajuykyvvzstdfn.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrYmF4aGFqdXlreXZ2enN0ZGZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ3MDEwNTEsImV4cCI6MjAxMDI3NzA1MX0.ymfXSwBn9oK3-M3e597xHgR-m16H7yyAf1mbmJrbEmw");
;