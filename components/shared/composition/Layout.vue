<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

const props = withDefaults(defineProps<{
  name?: string;
  class?: HTMLAttributes["class"];
}>(), {
  name: "default",
});
</script>

<template>
  <div
    :data-layout="name"
    :class="cn('w-full min-h-dvh', props.class)"
  >
    <slot />
  </div>
</template>
