// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  build: {
    transpile: ['@supabase/supabase-js'],
  },
  modules: [
    '@nuxtjs/tailwindcss', 
    'shadcn-nuxt', 
    '@nuxtjs/supabase',
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: true, // Enable automatic redirect
    redirectOptions: {
      login: '/auth/login', // Change the login route
      exclude: ['/auth/register', '/', '/'], // Exclude routes from redirect
    },
  }
})