<script setup lang="ts">
const { t } = useI18n();

const props = defineProps<{
  pathRoot: string;
  title?: string;
  caption?: string;
  cta?: string;
  action?: string;
  noAction?: boolean;
  noCta?: boolean;
}>();

const title = computed(() => t(props.title ?? `${props.pathRoot}.title`));
const caption = computed(() => t(props.caption ?? `${props.pathRoot}.caption`));
const cta = computed(() => t(props.cta ?? `${props.pathRoot}.cta`));
const action = computed(() => t(props.action ?? `${props.pathRoot}.action`));
</script>

<template>
  <div class="py-8 flex flex-col items-center justify-center gap-1">
    <h2 class="text-lg font-medium">
      {{ title }}
    </h2>
    <p class="text-center text-sm text-muted-foreground">
      {{ caption }}
      <template v-if="!noCta">
        <br>{{ cta }}
      </template>
    </p>
    <div
      v-if="!noAction"
      class="mt-4"
    >
      <slot>
        <Button>
          {{ action }}
        </Button>
      </slot>
    </div>
  </div>
</template>
