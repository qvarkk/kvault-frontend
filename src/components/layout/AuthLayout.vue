<script setup lang="ts">
import "vue-sonner/style.css"
import { Toaster } from "vue-sonner"
</script>

<template>
  <main>
    <div class="min-h-screen flex items-center justify-center bg-background">
      <div class="w-full max-w-sm px-4">
        <slot />
      </div>
    </div>
  </main>
  <Toaster />
</template>
