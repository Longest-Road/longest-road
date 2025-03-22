export default defineNuxtRouteMiddleware(async (to, from) => {
    const supabase = useSupabaseClient();
    const { data } = await supabase.auth.getSession();
  
  if (!data.session && to.path.startsWith("/app")) {
    return navigateTo("/login");
  }
});
