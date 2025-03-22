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
        <label class="block text-sm font-medium mb-1">Players!</label>
        <Multiselect
          v-model="form.players"
          :options="allPlayers"
          :multiple="true"
          :object="true"
          mode="tags"
          placeholder="Select players"
          label="name"
          track-by="id"
        />
      </div>

      <!-- Expansions -->
      <div>
        <label class="block text-sm font-medium mb-1">Expansions</label>
        <Multiselect
          v-model="form.expansions"
          :options="expansions"
          :multiple="true"
          mode="tags"
          placeholder="Select expansions"
        />
      </div>

      <!-- Submit -->
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

import { reactive } from "vue";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

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
});

function submitForm() {
  console.log("Form Submitted:", form);
}
</script>
