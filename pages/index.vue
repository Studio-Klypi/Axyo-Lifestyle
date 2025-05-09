<script setup lang="ts">
import Page from "~/components/shared/composition/Page.vue";

definePageMeta({
  layout: "showcase",
  auth: {
    mode: "lax",
  },
});
</script>

<template>
  <Page>
    <h1>{{ $t("app.name") }}</h1>
    <p>{{ $t("app.tag-line") }}</p>
  </Page>
</template>
