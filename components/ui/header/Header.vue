<template>
  <header
    class="flex justify-between items-center px-6 py-4 shadow-md bg-white"
  >
    <h1 class="text-2xl font-bold text-yellow-700">Longest Road</h1>
    <div class="space-x-4">
      <NuxtLink to="/auth/login" class="text-gray-700 hover:underline"
        >Login</NuxtLink
      >
      <NuxtLink
        to="/auth/register"
        class="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded transition"
      >
        Register
      </NuxtLink>
    </div>
  </header>
</template>
