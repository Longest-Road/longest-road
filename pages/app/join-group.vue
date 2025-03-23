<template>
  <div class="max-w-3xl mx-auto py-10 px-4">
    <h1 class="text-3xl font-bold mb-6">Join a Group</h1>

    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- Code -->
      <div>
        <label class="block text-sm font-medium mb-1">Group Code</label>
        <input
          type="text"
          v-model="form.code"
          class="w-full border border-gray-300 rounded px-4 py-2"
        />
      </div>

      <Spinner v-if="loading" class="mt-4 mx-auto" />

      <!-- Message -->
      <div
        v-if="message.text"
        :class="messageClass"
        class="text-sm p-2 rounded mb-2"
      >
        {{ message.text }}
      </div>

      <!-- Submit -->
      <button
        type="submit"
        class="mt-4 bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
      >
        Join Group
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import Spinner from "@/components/ui/spinner.vue";
import { useRouter } from "vue-router";

const message = ref({ text: "", type: "" });
const messageClass = computed(() =>
  message.value.type === "success"
    ? "bg-green-100 text-green-700 border border-green-300"
    : "bg-red-100 text-red-700 border border-red-300"
);

const loading = ref(false);
definePageMeta({
  layout: "application",
});

const form = reactive({
  code: "",
});

const supabase = useSupabaseClient();
const authUser = useSupabaseUser();
const router = useRouter();

async function submitForm() {
  loading.value = true;
  console.log("Form Submitted:", form);

  if (!authUser.value) {
    message.value = { text: "User not authenticated", type: "error" };
    loading.value = false;
    return;
  }

  const { data: groupData, error: groupError } = await supabase
    .from("groups")
    .select()
    .eq("code", form.code)
    .single();

  if (groupError) {
    message.value = {
      text: `Error finding group: ${groupError.message}`,
      type: "error",
    };
  } else if (groupData.length === 0 || groupData == null) {
    message.value = {
      text: "Group not found",
      type: "error",
    };
  }

  console.log("Group data:", groupData);

  const { data: joinData, error: joinError } = await supabase
    .from("user_profiles")
    .update({
      group: groupData.id,
    })
    .eq("user", authUser.value.id)
    .select()
    .single();

  if (joinError) {
    message.value = {
      text: `Error joining group: ${joinError.message}`,
      type: "error",
    };
  } else {
    message.value = {
      text: "Group joined successfully! Redirecting to dashboard...",
      type: "success",
    };
    setTimeout(() => router.push("/app/dashboard"), 2000);
  }

  console.log("Group join response:", joinData);

  loading.value = false;
}
</script>
