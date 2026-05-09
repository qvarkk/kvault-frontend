<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { useAuthStore } from '@/stores';
import { useRouter } from 'vue-router';

const router = useRouter()
const auth = useAuthStore()

async function handleLogout() {
  auth.logout()
  router.push({ name: "login" })
}
</script>

<template>
  <h1>Home View</h1>
  <Button @click="handleLogout">
    Log Out
  </Button>
</template>