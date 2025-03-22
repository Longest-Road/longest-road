<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
        Create Account
      </h2>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <!-- Name -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1"
            >Name</label
          >
          <input
            id="name"
            type="text"
            v-model="name"
            class="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            required
          />
        </div>

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
            v-model="email"
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
            v-model="password"
            class="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            required
          />
        </div>

        <!-- Confirm Password -->
        <div>
          <label
            for="confirmPassword"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Confirm Password</label
          >
          <input
            id="confirmPassword"
            type="password"
            v-model="confirmPassword"
            class="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            required
          />
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded transition font-medium"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>



<script setup>
import { ref } from 'vue';

const supabase = useSupabaseClient();
const email = ref('');
const password = ref('');

async function handleRegister() {
  try {
    const { user, session, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    alert('Registration successful!');
  } catch (error) {
    alert(error.error_description || error.message);
  }
}
</script>
