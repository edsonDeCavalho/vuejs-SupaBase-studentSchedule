import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mobtuhlqtgkyeqwtfvue.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vYnR1aGxxdGdreWVxd3RmdnVlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY0ODAyOTQ4OCwiZXhwIjoxOTYzNjA1NDg4fQ.qDFIIRgmnqDO3Q3bs8bYlTmNeuNPj2U3Ar8iDvMFePo";

export const supabase = createClient(supabaseUrl, supabaseKey);