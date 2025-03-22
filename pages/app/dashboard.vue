<template>
  <div class="min-h-screen bg-gray-50 text-gray-800">
    <div class="max-w-5xl mx-auto px-4 py-12">
      <!-- Greeting & Group -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">
          Welcome back, {{ user.name }} 👋
        </h1>
        <p class="text-lg">
          Group:
          <span class="font-medium text-yellow-600">{{ group.name }}</span>
        </p>
      </div>

      <!-- Games Logged -->
      <div class="bg-white shadow rounded-lg p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-4">Games Logged</h2>

        <ul v-if="games.length" class="space-y-4">
          <li
            v-for="(game, index) in games"
            :key="index"
            class="border border-gray-200 rounded-md p-4"
          >
            <div class="flex justify-between items-center">
              <div>
                <p class="text-lg font-semibold">{{ game.date }}</p>
                <p class="text-sm text-gray-500">
                  Expansions: {{ game.expansions.join(", ") }}
                </p>
                <p class="text-sm text-gray-500">
                  Players: {{ game.players.length }}
                </p>
              </div>
              <button class="text-yellow-600 hover:underline text-sm">
                View
              </button>
            </div>
          </li>
        </ul>

        <p v-else class="text-gray-500">No games logged yet.</p>
      </div>

      <!-- CTA Button -->
      <div class="text-center">
        <NuxtLink to="/app/log-game">
          <button
            class="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-md font-medium transition"
          >
            Log a Game
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "application",
});

const user = {
  name: "Ruairí",
};

const group = {
  name: "Catan Club Galway",
};

const games = [
  {
    date: "2025-03-22",
    expansions: ["Seafarers", "Cities & Knights"],
    players: ["Alice", "Bob", "Charlie"],
  },
  {
    date: "2025-03-15",
    expansions: ["Base Game"],
    players: ["Alice", "Dave", "Ruairí"],
  },
];
</script>
