<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

const props = withDefaults(defineProps<{
  name?: string;
  class?: HTMLAttributes["class"];
}>(), {
  name: "home",
});
</script>

<template>
  <main
    :data-page="name"
    :class="cn('', props.class)"
  >
    <slot />
  </main>
</template>
