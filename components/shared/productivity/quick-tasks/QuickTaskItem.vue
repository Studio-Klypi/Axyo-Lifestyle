<script setup lang="ts">
import { Edit2, Trash } from "lucide-vue-next";
import type { IQuickTask } from "~/types/productivity/quick-tasks";
import QuickTaskDialog from "~/components/shared/productivity/quick-tasks/QuickTaskDialog.vue";

const { task } = defineProps<{
  task: IQuickTask;
}>();

const store = useQuickTasksStore();
</script>

<template>
  <div class="relative isolate px-3 py-2 rounded-md flex items-center gap-4 transition-colors hover:bg-accent/50 hover:text-accent-foreground">
    <Checkbox
      class="border-primary"
      :model-value="!!task.completedAt"
    />

    <p :class="{ 'line-through text-muted-foreground italic': task.completedAt }">
      {{ task.label }}
    </p>

    <div class="ml-auto flex items-center z-10">
      <QuickTaskDialog :task="task">
        <Button
          size="icon"
          variant="ghost"
        >
          <Edit2 />
        </Button>
      </QuickTaskDialog>
      <Button
        size="icon"
        variant="ghost"
        class="!text-destructive"
        @click="store.deleteTask(task.id)"
      >
        <Trash />
      </Button>
    </div>

    <button
      class="absolute inset-0 cursor-pointer"
      @click="store.toggleTask(task.id)"
    />
  </div>
</template>
