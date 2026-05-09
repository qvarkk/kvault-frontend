<script setup lang="ts">
import { SidebarProvider } from "../ui/sidebar"
import AppSidebar from "./AppSidebar.vue"
import AppHeader from "./AppHeader.vue"
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <div class="flex flex-col flex-1">
      <AppHeader />
      <main class="flex-1 p-4">
        <slot />
      </main>
    </div>
  </SidebarProvider>
</template>
