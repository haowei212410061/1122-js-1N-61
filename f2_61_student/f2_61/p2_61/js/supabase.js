const SUPSBASE_ULR = 'https://itbleknccqovsbposbsv.supabase.co';
const SUPABASE_key =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0Ymxla25jY3FvdnNicG9zYnN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5NTgyMTAsImV4cCI6MjAyOTUzNDIxMH0.tT_GJQ0EAzWNM5v-S8B5k5DA7vojt6l4WezlTOBXbnE';
export const _supabase = supabase.createClient(SUPSBASE_ULR, SUPABASE_key);
