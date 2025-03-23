<template>
  <div class="max-w-3xl mx-auto py-10 px-4">
    <h1 class="text-3xl font-bold mb-6">Create a Group</h1>

    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- Name -->
      <div>
        <label class="block text-sm font-medium mb-1">Group Name</label>
        <input
          type="text"
          v-model="form.name"
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
        Create Group
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
  name: "",
});

const supabase = useSupabaseClient();
const authUser = useSupabaseUser();
const router = useRouter();

console.log("Authenticated User ID:", authUser.value.id);

function generateRandomCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

async function submitForm() {
  loading.value = true;
  console.log("Form Submitted:", form);

  if (!authUser.value) {
    message.value = { text: "User not authenticated", type: "error" };
    loading.value = false;
    return;
  }

  const groupCode = generateRandomCode();
  const { data: groupData, error: groupError } = await supabase
    .from("groups")
    .insert({
      name: form.name,
      code: groupCode,
      owner: authUser.value.id,
    })
    .select()
    .single();

  if (groupError) {
    message.value = {
      text: `Error creating group: ${groupError.message}`,
      type: "error",
    };
    loading.value = false;
    return;
  }

  console.log("Group creation response:", groupData);

  const { error: profileError } = await supabase
    .from("user_profiles")
    .update({ group: groupData.id })
    .eq("user", authUser.value.id);

  if (profileError) {
    message.value = {
      text: `Error updating user profile: ${profileError.message}`,
      type: "error",
    };
    console.error("Profile update error:", profileError);
  } else {
    message.value = {
      text: "Group created successfully! Redirecting to dashboard...",
      type: "success",
    };
    setTimeout(() => router.push("/app/dashboard"), 2000);
  }

  loading.value = false;
}
</script>
