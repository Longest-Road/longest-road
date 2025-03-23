<template>
  <header class="shadow-md bg-white">
    <div
      class="max-w-5xl mx-auto px-6 py-4 flex flex-row justify-between items-center"
    >
      <NuxtLink to="/" class="flex items-center">
        <img
          src="public/android-chrome-192x192.png"
          alt="Longest Road Icon"
          class="mr-2 w-12"
        />
        <h1 class="text-2xl font-bold text-yellow-700">Longest Road</h1>
      </NuxtLink>
      <div class="space-x-4">
        <template v-if="user">
          <NuxtLink to="/app/dashboard" class="text-gray-700 hover:underline"
            >Dashboard</NuxtLink
          >
          <a
            @click="logout"
            class="text-gray-700 hover:underline cursor-pointer"
            >Logout</a
          >
        </template>
        <template v-else>
          <NuxtLink to="/auth/login" class="text-gray-700 hover:underline"
            >Login</NuxtLink
          >
          <NuxtLink
            to="/auth/register"
            class="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded transition"
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
