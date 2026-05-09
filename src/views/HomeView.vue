<script setup lang="ts">
import AppLayout from "@/components/layout/AppLayout.vue"
import { useHead } from "@vueuse/head"
import { useI18n } from "vue-i18n"

const { t } = useI18n()
useHead({ title: t("head.home") })
</script>

<template>
  <AppLayout>
    <h1>Home View</h1>
  </AppLayout>
</template>
