<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();

const user = ref(null);

onMounted(async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  user.value = user;
});
</script>
