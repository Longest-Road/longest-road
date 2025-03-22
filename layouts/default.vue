<template>
  <div
    class="min-h-screen bg-gradient-to-b from-yellow-50 to-white text-gray-800 flex flex-col"
  >
    <Header />
    <main class="flex-grow">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/components/ui/header/Header.vue";
import Footer from "@/components/ui/footer/Footer.vue";
</script>
