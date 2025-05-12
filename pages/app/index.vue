<script setup lang="ts">
import Page from "~/components/shared/composition/Page.vue";

definePageMeta({
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
