<template>
  <div class="min-h-screen bg-gray-50 text-gray-800">
    <div class="max-w-5xl mx-auto px-4 py-12">
      <!-- Greeting & Group -->
      <div class="mb-8" v-if="profile">
        <h1 class="text-3xl font-bold mb-2">
          Welcome back, {{ profile.first_name }} 👋
        </h1>
        <p class="text-lg">
          Group:
          <span class="font-medium text-yellow-600">{{ group.name }}</span>
          <div v-if="group.name == 'No group assigned'">
            <NuxtLink to="/app/create-group">
              <button
              class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md font-medium transition"
            >
              Create a Group
              </button>
            </NuxtLink>
            <NuxtLink to="/app/join-group">
              <button
              class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md font-medium transition"
            >
              Join a Group
              </button>
            </NuxtLink>
          </div>
        </p>
      </div>

      <!-- Tabs -->
      <div class="flex space-x-4 mb-6 border-b">
        <button
          @click="activeTab = 'games'"
          :class="[
            'pb-2 px-4 font-medium',
            activeTab === 'games'
              ? 'border-b-2 border-yellow-500 text-yellow-600'
              : 'text-gray-500 hover:text-gray-700',
          ]"
        >
          Games
        </button>
        <button
          @click="activeTab = 'leaderboard'"
          :class="[
            'pb-2 px-4 font-medium',
            activeTab === 'leaderboard'
              ? 'border-b-2 border-yellow-500 text-yellow-600'
              : 'text-gray-500 hover:text-gray-700',
          ]"
        >
          Leaderboard
        </button>

        <button
          @click="activeTab = 'group'"
          :class="[
            'pb-2 px-4 font-medium',
            activeTab === 'group'
              ? 'border-b-2 border-yellow-500 text-yellow-600'
              : 'text-gray-500 hover:text-gray-700',
          ]"
        >
          Group
        </button>
      </div>

      <!-- Tab Content -->
      <div
        v-if="activeTab === 'games'"
        class="bg-white shadow rounded-lg p-6 mb-8"
      >
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
              <NuxtLink
                :to="`/app/view-game?id=${game.id}`"
                class="text-yellow-600 hover:underline text-sm"
              >
                View
              </NuxtLink>
            </div>
          </li>
        </ul>

        <p v-else class="text-gray-500">No games logged yet.</p>
      </div>

      <div
        v-if="activeTab === 'leaderboard'"
        class="bg-white shadow rounded-lg p-6 mb-8"
      >
        <h2 class="text-2xl font-semibold mb-4">Leaderboard</h2>
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b">
              <th class="py-2">Player</th>
              <th class="py-2">Games Played</th>
              <th class="py-2">Games Won</th>
              <th class="py-2">Total Points</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(player, index) in leaderboard"
              :key="index"
              class="border-b hover:bg-gray-50"
            >
              <td class="py-2 font-medium">{{ player.name }}</td>
              <td class="py-2">{{ player.gamesPlayed }}</td>
              <td class="py-2">{{ player.gamesWon }}</td>
              <td class="py-2">{{ player.points }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="activeTab === 'group'"
        class="bg-white shadow rounded-lg p-6 mb-8"
      >
        <h2 class="text-2xl font-semibold mb-4">Group</h2>
        <p>
          <b>Group Name:</b> {{ group.name }}
        </p>
        <p>
          <b>Group Code:</b> {{ group.code }}
        </p>
        
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
import { ref } from "vue";

const supabase = useSupabaseClient();
const authUser = useSupabaseUser();
const profile = ref(null);
const loading = ref(true);
const group = ref(null);

onMounted(async () => {
  if (!authUser.value) return;

  const { data: profileData, error: profileError } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user", authUser.value.id)
    .single();

  if (profileError) {
    console.error("Error fetching profile:", profileError.message);
  } else {
    profile.value = profileData;
  }

  // Check if the user has a group
  if (profile.value && profile.value.group) {
    const { data: groupData, error: groupError } = await supabase
      .from("groups")
      .select("*")
      .eq("id", profile.value.group)
      .single();

    if (groupError) {
      console.error("Error fetching group:", groupError.message);
    } else {
      group.value = groupData;
    }
  } else {
    // Handle the case where the user does not have a group
    console.log("User does not have a group.");
    group.value = { name: "No group assigned" }; // Default message or object
  }

  loading.value = false;
  console.log(
    "Name is ",
    profile.value?.first_name,
    "",
    profile.value?.last_name
  );
});

const activeTab = ref("games");

const games = [
  {
    id: 1,
    date: "2025-03-22",
    expansions: ["Seafarers", "Cities & Knights"],
    players: ["Alice", "Bob", "Charlie"],
  },
  {
    id: 2,
    date: "2025-03-15",
    expansions: ["Base Game"],
    players: ["Alice", "Dave", "Ruairí"],
  },
];

const leaderboard = [
  { name: "Alice", gamesPlayed: 5, gamesWon: 2, points: 38 },
  { name: "Bob", gamesPlayed: 4, gamesWon: 1, points: 28 },
  { name: "Charlie", gamesPlayed: 3, gamesWon: 1, points: 24 },
  { name: "Ruairí", gamesPlayed: 2, gamesWon: 1, points: 20 },
];
</script>
