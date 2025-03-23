<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <!-- Mobile Menu Button -->
  <div class="sm:hidden">
    <button @click="toggleMenu" class="flex items-center p-2 text-gray-700">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    </button>

    <!-- Mobile Menu -->
    <div
      v-if="isMenuOpen"
      class="absolute top-16 right-0 left-0 bg-white shadow-md z-50 p-4"
    >
      <div class="flex flex-col space-y-3">
        <NavigationMenuLink class="px-3 py-2 hover:bg-gray-100 rounded"
          >Item One</NavigationMenuLink
        >
        <NavigationMenuLink class="px-3 py-2 hover:bg-gray-100 rounded"
          >Link</NavigationMenuLink
        >
      </div>
    </div>
  </div>

  <!-- Desktop Menu -->
  <div class="hidden sm:block">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
</template>
