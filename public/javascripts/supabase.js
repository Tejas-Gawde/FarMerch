const { createClient } = require('@supabase/supabase-js') 

// Create a single supabase client for interacting with your database
const supabase = createClient(
"https://xkbaxhajuykyvvzstdfn.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrYmF4aGFqdXlreXZ2enN0ZGZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ3MDEwNTEsImV4cCI6MjAxMDI3NzA1MX0.ymfXSwBn9oK3-M3e597xHgR-m16H7yyAf1mbmJrbEmw");

module.exports = supabase;