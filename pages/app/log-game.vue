<template>
  <div class="max-w-3xl mx-auto py-10 px-4">
    <h1 class="text-3xl font-bold mb-6">Log a Game</h1>

    <form @submit.prevent="submitForm" class="space-y-6">
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
          :options="allPlayers"
          :multiple="true"
          placeholder="Select players"
          track-by="id"
          label="name"
        />
      </div>

      <!-- Expansions -->
      <div>
        <label class="block text-sm font-medium mb-1">Expansions</label>
        <Multiselect
          v-model="form.expansions"
          :options="expansions"
          :multiple="true"
          placeholder="Select expansions"
        />
      </div>

      <!-- Per-player data -->
      <div
        v-for="player in form.players"
        :key="player.id"
        class="border p-4 rounded"
      >
        <h3 class="font-semibold mb-2">{{ player.name }}</h3>

        <div class="mb-2">
          <label class="block text-sm mb-1">Color</label>
          <select
            v-model="form.playerData[player.id].color"
            class="w-full border rounded px-2 py-1"
          >
            <option disabled value="">Select color</option>
            <option>Red</option>
            <option>Blue</option>
            <option>Green</option>
            <option>Yellow</option>
            <option>White</option>
            <option>Orange</option>
          </select>
        </div>

        <div>
          <label class="block text-sm mb-1">Points</label>
          <input
            type="number"
            v-model="form.playerData[player.id].points"
            class="w-full border rounded px-2 py-1"
          />
        </div>
      </div>

      <button
        type="submit"
        class="mt-4 bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "application",
});

import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import { reactive, watch } from "vue";

const allPlayers = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "Dana" },
];

const expansions = [
  "Base Game",
  "Seafarers",
  "Cities & Knights",
  "Traders & Barbarians",
  "Explorers & Pirates",
];

const form = reactive({
  date: "",
  players: [],
  expansions: [],
  playerData: {},
});

// Watch player selection to ensure playerData entries exist
watch(
  () => form.players,
  (players) => {
    players.forEach((player) => {
      if (!form.playerData[player.id]) {
        form.playerData[player.id] = {
          color: "",
          points: "",
        };
      }
    });
  },
  { deep: true }
);

function submitForm() {
  console.log("Form Submitted:", form);
}
</script>
