import { createClient } from '@supabase/supabase-js'

const supabaseUrl = SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase