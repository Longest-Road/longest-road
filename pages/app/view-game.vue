<template>
  <div class="max-w-3xl mx-auto py-10 px-4">
    <h1 class="text-3xl font-bold mb-6">Game Details</h1>

    <div class="bg-white rounded shadow p-6 space-y-4">
      <!-- Date -->
      <div>
        <p class="text-sm text-gray-500">Date</p>
        <p class="text-lg font-semibold">{{ game.date }}</p>
      </div>

      <!-- Expansions -->
      <div>
        <p class="text-sm text-gray-500">Expansions</p>
        <div class="flex flex-wrap gap-2 mt-1">
          <span
            v-for="expansion in game.expansions"
            :key="expansion"
            class="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
          >
            {{ expansion }}
          </span>
        </div>
      </div>

      <!-- Players -->
      <div>
        <p class="text-sm text-gray-500 mb-2">Players</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            v-for="player in game.players"
            :key="player.id"
            class="border p-4 rounded shadow-sm"
          >
            <p class="font-semibold">{{ player.name }}</p>
            <p class="text-sm text-gray-600">Color: {{ player.color }}</p>
            <p class="text-sm text-gray-600">Points: {{ player.points }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "application",
});

// Simulate fetching game data
const game = {
  date: "2025-03-23",
  expansions: ["Base Game", "Seafarers"],
  players: [
    { id: 1, name: "Alice", color: "Red", points: 10 },
    { id: 2, name: "Bob", color: "Blue", points: 8 },
    { id: 3, name: "Charlie", color: "Green", points: 7 },
  ],
};
</script>
