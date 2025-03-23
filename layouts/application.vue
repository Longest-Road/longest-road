<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
    <Header />
    <main class="flex-grow">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/components/ui/header/HeaderDashboard.vue";
import Footer from "@/components/ui/footer/Footer.vue";
</script>
