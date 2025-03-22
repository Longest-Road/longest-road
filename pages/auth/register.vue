<template>
  <form @submit.prevent="handleRegister">
    <input type="email" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
    <button type="submit">Register</button>
  </form>
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
