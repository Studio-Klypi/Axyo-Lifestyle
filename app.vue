<script setup lang="ts">
import { Toaster } from "vue-sonner";
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtRouteAnnouncer />

    <Toaster
      position="top-right"
      rich-colors
    />

    <NuxtLayout />
  </div>
</template>
