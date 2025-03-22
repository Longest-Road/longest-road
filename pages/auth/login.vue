<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
        Welcome Back
      </h2>

      <form @submit.prevent="login" class="space-y-4">
        <!-- Email -->
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Email</label
          >
          <input
            id="email"
            type="email"
            v-model="form.email"
            class="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            required
          />
        </div>

        <!-- Password -->
        <div>
          <label
            for="password"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Password</label
          >
          <input
            id="password"
            type="password"
            v-model="form.password"
            class="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            required
          />
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded transition font-medium"
        >
          Log In
        </button>
      </form>

      <!-- Optional: Register link -->
      <p class="text-sm text-center text-gray-500 mt-6">
        Don’t have an account?
        <a href="/register" class="text-yellow-600 hover:underline"
          >Register here</a
        >
      </p>
    </div>
  </div>
</template>

<script setup>
const form = ref({
  email: "",
  password: "",
});

function login() {
  console.log("Logging in with:", form.value);
  // Add your login logic or API call here
}
</script>
