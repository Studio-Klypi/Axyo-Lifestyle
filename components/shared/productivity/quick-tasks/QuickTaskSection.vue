<script setup lang="ts">
import { ChevronRight } from "lucide-vue-next";
import type { IQuickTask } from "~/types/productivity/quick-tasks";
import QuickTaskItem from "~/components/shared/productivity/quick-tasks/QuickTaskItem.vue";

const { tasks } = defineProps<{
  tasks: IQuickTask[];
}>();

const total = computed(() => tasks.length);
const completed = computed(() => tasks.filter(task => task.completedAt).length);
const ordered = computed(() => [...tasks].sort((a, b) => {
  if (a.completedAt && !b.completedAt) return 1;
  if (!a.completedAt && b.completedAt) return -1;
  return a.id - b.id;
}));
</script>

<template>
  <Collapsible
    v-slot="{ open }"
    default-open
    as-child
  >
    <section class="flex flex-col">
      <CollapsibleTrigger as-child>
        <header class="cursor-pointer flex items-center justify-between px-3 py-2 border-b rounded-t-md transition-colors hover:bg-accent/50 hover:text-accent-foreground">
          <p class="text-sm text-muted-foreground">
            <slot>Unnamed</slot>
            <span class="ml-3 text-xs opacity-50">{{ completed }}/{{ total }}</span>
          </p>

          <ChevronRight
            class="transition-transform text-muted-foreground size-4"
            :class="{ 'rotate-90': open }"
          />
        </header>
      </CollapsibleTrigger>

      <CollapsibleContent as-child>
        <main class="pt-2 flex flex-col">
          <QuickTaskItem
            v-for="task in ordered"
            :key="`quick-task-${task.id}`"
            :task="task"
          />
        </main>
      </CollapsibleContent>
    </section>
  </Collapsible>
</template>
