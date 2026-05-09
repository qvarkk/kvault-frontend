<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import type { LoginPayload } from "@/types";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/layout/AuthLayout.vue";

const router = useRouter();
const auth = useAuthStore();

const form = ref<LoginPayload>({
  email: "",
  password: "",
});

const error = ref<string | null>(null);
const loading = ref(false);

async function handleSubmit() {
  error.value = null;
  loading.value = true;

  try {
    await auth.login(form.value);
    router.push({ name: "home" });
  } catch (e: unknown) {
    error.value = "Invalid email or password";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <AuthLayout>
    <div>
      
    </div>
    <!-- <div>
      <form @submit.prevent="handleSubmit">
        <input v-model="form.email" type="email" placeholder="Email" required />
        <input
          v-model="form.password"
          type="password"
          placeholder="Password"
          required
        />

        <p v-if="error">{{ error }}</p>

        <Button :disabled="loading">
          {{ loading ? "Logging in..." : "Log in" }}
        </Button>
      </form>
    </div> -->
  </AuthLayout>
</template>
