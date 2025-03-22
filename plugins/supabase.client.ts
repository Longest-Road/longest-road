import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  const supabaseUrl = 'https://YOUR_PROJECT_ID.supabase.co'
  const supabaseAnonKey = 'YOUR_PUBLIC_ANON_KEY'

  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  return {
    provide: {
      supabase
    }
  }
})