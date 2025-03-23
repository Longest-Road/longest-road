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

        <!-- Message -->
        <div
          v-if="message.text"
          :class="messageClass"
          class="text-sm p-2 rounded mb-2"
        >
          {{ message.text }}
        </div>

        <Spinner v-if="loading" class="mt-4 mx-auto" />

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
        Don't have an account?
        <NuxtLink to="/auth/register" class="text-yellow-600 hover:underline"
          >Register here</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import Spinner from "@/components/ui/spinner.vue";

const supabase = useSupabaseClient();
const router = useRouter();

const loading = ref(false);

const form = ref({
  email: "",
  password: "",
});

const message = ref({ text: "", type: "" });

const messageClass = computed(() =>
  message.value.type === "success"
    ? "bg-green-100 text-green-700 border border-green-300"
    : "bg-red-100 text-red-700 border border-red-300"
);

async function login() {
  loading.value = true;
  message.value = { text: "", type: "" };

  const { email, password } = form.value;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    message.value = { text: error.message, type: "error" };
  } else {
    message.value = { text: "Login successful!", type: "success" };
    setTimeout(() => {
      router.push("/app/dashboard");
    }, 1000);
  }

  loading.value = false;
}
</script>
