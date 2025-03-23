<template>
  <header class="shadow-md bg-white">
    <div
      class="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:px-6 sm:justify-between items-center"
    >
      <NuxtLink to="/" class="flex items-center mb-4 sm:mb-0">
        <img
          src="/android-chrome-192x192.png"
          alt="Longest Road Icon"
          class="mr-2 w-10 sm:w-12"
        />
        <h1 class="text-xl sm:text-2xl font-bold text-yellow-700">
          Longest Road
        </h1>
      </NuxtLink>
      <div class="flex space-x-2 sm:space-x-4">
        <NuxtLink
          to="/app/dashboard"
          class="text-sm sm:text-base text-gray-700 hover:underline px-2 py-1"
          >Dashboard</NuxtLink
        >
        <NuxtLink
          @click="logout"
          class="text-sm sm:text-base text-gray-700 hover:underline px-2 py-1"
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
  navigateTo("/auth/login");
};
</script>
