import {createClient} from '@supabase/supabase-js';


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/"/g, '').trim()
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.replace(/"/g, '').trim()
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.replace(/"/g, '').trim()

console.log('SUPABASE URL IS: ', supabaseUrl);
export const supabase = createClient(supabaseUrl, anonKey, { auth: { persistSession: false }, global: { fetch: fetch } });

export const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth:{
        autoRefreshToken: false,
        persistSession: false
    }
});





