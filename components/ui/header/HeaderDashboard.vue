<template>
  <header class="shadow-md bg-white">
    <div class="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
      <NuxtLink to="/">
        <h1 class="text-2xl font-bold text-yellow-700">Longest Road</h1>
      </NuxtLink>
      <div class="space-x-4">
        <NuxtLink to="/app/dashboard" class="text-gray-700 hover:underline"
          >Dashboard</NuxtLink
        >
        <NuxtLink @click="logout" class="text-gray-700 hover:underline"
          >Logout</NuxtLink
        >
      </div>
    </div>
  </header>
</template>

<script setup>
const supabase = useSupabaseClient();

const logout = async () => {
  await supabase.auth.signOut();
  navigateTo("/login");
};
</script>
