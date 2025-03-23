<template>
  <header class="shadow-md bg-white">
    <div
      class="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:px-6 sm:justify-between items-center"
    >
      <NuxtLink to="/" class="flex items-center mb-4 sm:mb-0">
        <img
          src="public/android-chrome-192x192.png"
          alt="Longest Road Icon"
          class="mr-2 w-10 sm:w-12"
        />
        <h1 class="text-xl sm:text-2xl font-bold text-yellow-700">
          Longest Road
        </h1>
      </NuxtLink>
      <div class="flex space-x-2 sm:space-x-4">
        <template v-if="user">
          <NuxtLink
            to="/app/dashboard"
            class="text-sm sm:text-base text-gray-700 hover:underline px-2 py-1"
            >Dashboard</NuxtLink
          >
          <a
            @click="logout"
            class="text-sm sm:text-base text-gray-700 hover:underline cursor-pointer px-2 py-1"
            >Logout</a
          >
        </template>
        <template v-else>
          <NuxtLink
            to="/auth/login"
            class="text-sm sm:text-base text-gray-700 hover:underline px-2 py-1"
            >Login</NuxtLink
          >
          <NuxtLink
            to="/auth/register"
            class="bg-yellow-500 hover:bg-yellow-600 text-white text-sm sm:text-base py-1 px-3 sm:py-2 sm:px-4 rounded transition"
          >
            Register
          </NuxtLink>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const logout = async () => {
  await supabase.auth.signOut();
  navigateTo("/auth/login");
};
</script>
