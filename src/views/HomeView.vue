<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue"
import { useAuthStore } from "@/stores"
import { useHead } from "@vueuse/head"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"

const { t } = useI18n()
useHead({ title: t("head.home") })

const router = useRouter()
const auth = useAuthStore()

async function handleLogout() {
  auth.logout()
  router.push({ name: "login" })
}
</script>

<template>
  <h1>Home View</h1>
  <Button @click="handleLogout">{{ t("auth.logout") }}</Button>
</template>
