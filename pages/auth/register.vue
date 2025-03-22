<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
        Create an Account
      </h2>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <!-- First Name -->
        <div>
          <label
            for="firstName"
            class="block text-sm font-medium text-gray-700 mb-1"
            >First Name</label
          >
          <input
            id="firstName"
            type="text"
            v-model="form.firstName"
            placeholder="First Name"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            required
          />
        </div>

        <!-- Last Name -->
        <div>
          <label
            for="lastName"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Last Name</label
          >
          <input
            id="lastName"
            type="text"
            v-model="form.lastName"
            placeholder="Last Name"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:outline-none"
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
            v-model="form.email"
            placeholder="Email"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:outline-none"
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
            placeholder="Password"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:outline-none"
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
            v-model="form.confirmPassword"
            placeholder="Confirm Password"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:outline-none"
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

        <!-- Submit -->
        <button
          type="submit"
          class="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded transition font-medium"
        >
          Register
        </button>

        <Spinner v-if="loading" class="mt-4 mx-auto" />
      </form>

      <!-- Optional: Login link -->
      <p class="text-sm text-center text-gray-500 mt-6">
        Already have an account?
        <NuxtLink to="/login" class="text-yellow-600 hover:underline"
          >Log in here</NuxtLink
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

const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const loading = ref(false);
const message = ref({ text: "", type: "" });

const messageClass = computed(() =>
  message.value.type === "success"
    ? "bg-green-100 text-green-700 border border-green-300"
    : "bg-red-100 text-red-700 border border-red-300"
);

async function handleRegister() {
  loading.value = true;
  message.value = { text: "", type: "" };

  const { firstName, lastName, email, password, confirmPassword } = form.value;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    message.value = { text: "Please fill out all fields.", type: "error" };
    loading.value = false;
    return;
  }

  if (password !== confirmPassword) {
    message.value = { text: "Passwords do not match.", type: "error" };
    loading.value = false;
    return;
  }

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    message.value = { text: error.message, type: "error" };
    loading.value = false;
    return;
  }

  if (data?.user?.id) {
    const { error: profileError } = await supabase
      .from("user_profiles")
      .insert([
        {
          id: data.user.id,
          first_name: firstName,
          last_name: lastName,
        },
      ]);

    if (profileError) {
      message.value = { text: profileError.message, type: "error" };
      loading.value = false;
      return;
    }
  }

  message.value = {
    text: "Registration successful! Please check your email to confirm.",
    type: "success",
  };

  loading.value = false;

  // Optional: Redirect after short delay
  // setTimeout(() => router.push('/login'), 3000)
}
</script>
