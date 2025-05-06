<script setup lang="ts">
import Page from "~/components/shared/composition/Page.vue";

definePageMeta({
  layout: "default",
  auth: {
    mode: "strict",
    value: true,
  },
});
</script>

<template>
  <Page>
    App Home
  </Page>
</template>
