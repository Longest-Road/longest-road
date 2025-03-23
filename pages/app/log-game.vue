<template>
  <div class="max-w-3xl mx-auto py-10 px-4">
    <h1 class="text-3xl font-bold mb-6">Log a Game</h1>

    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- Game Name -->
      <div>
        <label class="block text-sm font-medium mb-1">Game Name</label>
        <input
          type="text"
          v-model="form.name"
          placeholder="Enter a name for this game"
          class="w-full border border-gray-300 rounded px-4 py-2"
          required
        />
      </div>

      <!-- Date -->
      <div>
        <label class="block text-sm font-medium mb-1">Date</label>
        <input
          type="date"
          v-model="form.date"
          class="w-full border border-gray-300 rounded px-4 py-2"
        />
      </div>

      <!-- Players -->
      <div>
        <label class="block text-sm font-medium mb-1">Players</label>
        <Multiselect
          v-model="form.players"
          :options="playerOptions"
          :multiple="true"
          :object="true"
          mode="tags"
          placeholder="Select players"
          label="name"
          track-by="id"
          value-prop="id"
          :searchable="true"
          :create-option="false"
          :close-on-select="false"
          :hide-selected="false"
        />
      </div>

      <!-- Expansions -->
      <div>
        <label class="block text-sm font-medium mb-1">Expansions</label>
        <Multiselect
          v-model="form.expansions"
          :options="expansionOptions"
          :multiple="true"
          :object="true"
          mode="tags"
          placeholder="Select expansions"
          label="name"
          track-by="id"
          value-prop="id"
          :searchable="true"
          :create-option="false"
          :close-on-select="false"
          :hide-selected="false"
        />
      </div>

      <!-- Player Details (appears only when players are selected) -->
      <div v-if="form.players.length > 0" class="mt-8 border-t pt-6">
        <h2 class="text-xl font-bold mb-4">Player Details</h2>

        <div
          v-for="player in form.players"
          :key="player.id"
          class="mb-6 p-4 border rounded-lg"
          :style="`border-left: 6px solid ${playerDetails[player.id].color}`"
        >
          <h3 class="font-medium text-lg mb-3">{{ player.name }}</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Color Selection -->
            <div>
              <label class="block text-sm font-medium mb-1">Color</label>
              <div class="flex items-center space-x-2">
                <select
                  v-model="playerDetails[player.id].color"
                  class="flex-grow border border-gray-300 rounded px-4 py-2"
                >
                  <option
                    v-for="color in getAvailableColors(player.id)"
                    :key="color.value"
                    :value="color.value"
                  >
                    {{ color.label }}
                  </option>
                </select>
                <!-- Color Swatch -->
                <div
                  class="h-8 w-8 flex-shrink-0 rounded-md border border-gray-300"
                  :style="`background-color: ${playerDetails[player.id].color}`"
                ></div>
              </div>
            </div>

            <!-- Points Input -->
            <div>
              <label class="block text-sm font-medium mb-1">Points</label>
              <input
                type="number"
                v-model.number="playerDetails[player.id].points"
                class="w-full border border-gray-300 rounded px-4 py-2"
                min="0"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Submit -->
      <button
        type="submit"
        class="mt-4 bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="isSubmitting"
      >
        <span v-if="isSubmitting">Saving...</span>
        <span v-else>Log Game</span>
      </button>

      <!-- Success Message -->
      <div
        v-if="submitSuccess"
        class="mt-4 p-4 bg-green-100 text-green-800 rounded"
      >
        <p class="font-medium">Game successfully logged!</p>
        <div class="mt-3 flex space-x-4">
          <button
            @click="resetForm"
            class="text-sm text-green-700 hover:text-green-900"
          >
            Log another game
          </button>
          <button
            @click="navigateTo('/app/dashboard')"
            class="text-sm text-green-700 hover:text-green-900"
          >
            View all games
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({ layout: "application" });

import { ref, onMounted, watch, reactive } from "vue";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

const supabase = useSupabaseClient();
const authUser = useSupabaseUser();

const profile = ref(null);
const playersRaw = ref([]);
const playerOptions = ref([]);
const playerDetails = reactive({});
const isSubmitting = ref(false);
const submitSuccess = ref(false);

const playerColors = [
  { value: "#e53e3e", label: "Red" },
  { value: "#3182ce", label: "Blue" },
  { value: "#ffffff", label: "White" },
  { value: "#ed8936", label: "Orange" },
  { value: "#38a169", label: "Green" },
  { value: "#a0522d", label: "Brown" },
  { value: "#805ad5", label: "Purple" },
  { value: "#ecc94b", label: "Yellow" },
  { value: "#4a5568", label: "Gray" },
  { value: "#f687b3", label: "Pink" },
];

const form = ref({
  name: "", // Game name
  date: new Date().toISOString().split("T")[0], // Set default to today's date
  players: [], // will store full player objects
  expansions: [],
});

const expansionStrings = [
  "Seafarers",
  "Cities & Knights",
  "Traders & Barbarians",
  "Explorers & Pirates",
];

const expansionOptions = expansionStrings.map((name, index) => ({
  id: index + 1,
  name: name,
}));

onMounted(async () => {
  if (!authUser.value) return;

  // Get user profile
  const { data: profileData, error: profileError } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user", authUser.value.id)
    .single();

  if (profileError) {
    console.error("Error fetching profile:", profileError.message);
    return;
  }

  profile.value = profileData;
  console.log("User profile:", profile.value);

  // Get players in same group
  const { data: playersData, error: playersError } = await supabase
    .from("user_profiles")
    .select("id, first_name, last_name, user")
    .eq("group", profile.value.group);

  if (playersError) {
    console.error("Error fetching players:", playersError.message);
    return;
  }

  // Transform into label-ready objects
  playersRaw.value = playersData;
  playerOptions.value = playersRaw.value.map((p) => ({
    id: p.id,
    first_name: p.first_name,
    last_name: p.last_name,
    name: `${p.first_name} ${p.last_name}`,
    user_id: p.user, // Include the UUID
  }));
  console.log("Player options:", playerOptions.value);
  console.log("Expansion options:", expansionOptions);
});

// Watch for changes in the selected players
watch(
  () => form.value.players,
  (newPlayers) => {
    // Initialize details for any newly added players
    newPlayers.forEach((player, index) => {
      if (!playerDetails[player.id]) {
        // Get all colors currently in use
        const usedColors = Object.values(playerDetails).map((d) => d.color);

        // Find the first available color
        const availableColors = playerColors.filter(
          (c) => !usedColors.includes(c.value)
        );
        const defaultColor =
          availableColors.length > 0
            ? availableColors[0].value
            : playerColors[index % playerColors.length].value; // Fallback to cycling through colors

        playerDetails[player.id] = {
          color: defaultColor,
          points: 0,
        };
      }
    });

    // Remove details for players that were deselected
    Object.keys(playerDetails).forEach((playerId) => {
      if (!newPlayers.some((p) => p.id === parseInt(playerId))) {
        delete playerDetails[playerId];
      }
    });
  },
  { deep: true }
);

// Function to get available colors for a player (excludes colors already selected by other players)
function getAvailableColors(playerId) {
  // Get all colors currently in use by other players
  const usedColors = Object.entries(playerDetails)
    .filter(([id, _]) => parseInt(id) !== playerId) // Exclude the current player
    .map(([_, details]) => details.color);

  // Return only colors not used by other players
  return playerColors.filter((color) => !usedColors.includes(color.value));
}

function resetForm() {
  form.value.name = "";
  form.value.players = [];
  form.value.expansions = [];
  form.value.date = new Date().toISOString().split("T")[0];
  submitSuccess.value = false;
}

async function submitForm() {
  if (form.value.players.length === 0) {
    alert("Please select at least one player");
    return;
  }

  isSubmitting.value = true;
  submitSuccess.value = false;

  try {
    // Extract the expansion names from the selected expansion objects
    const expansionNames = form.value.expansions.map((e) => e.name);

    // 1. Insert into games table
    const { data: gameData, error: gameError } = await supabase
      .from("games")
      .insert({
        name: form.value.name, // Game name
        created_at: new Date().toISOString(), // Current timestamp
        group_id: profile.value.group, // User's group ID
        game_date: form.value.date, // Date from the form
        expansions: expansionNames, // Array of expansion names
      })
      .select("id") // Get the inserted game ID
      .single();

    if (gameError) {
      console.error("Error creating game record:", gameError);
      alert("Failed to save game. Please try again.");
      isSubmitting.value = false;
      return;
    }

    // Get the ID of the newly created game
    const gameId = gameData.id;

    // 2. Insert into games_users_link table for each player
    const playerLinks = form.value.players.map((player) => ({
      game_id: gameId,
      user_id: player.user_id, // Use the UUID we fetched - this should match the table column name
      score: playerDetails[player.id].points,
      colour: playerDetails[player.id].color,
    }));

    const { error: linkError } = await supabase
      .from("games_users_link")
      .insert(playerLinks);

    if (linkError) {
      console.error("Error creating player links:", linkError);
      alert("Failed to save player data. Please try again.");
      isSubmitting.value = false;
      return;
    }

    // Success
    submitSuccess.value = true;
    console.log("Game recorded with ID:", gameId);

    // Don't reset the form immediately, let the user decide with the buttons
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("An unexpected error occurred. Please try again.");
  } finally {
    isSubmitting.value = false;
  }
}
</script>
