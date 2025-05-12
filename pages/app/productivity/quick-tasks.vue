<script setup lang="ts">
import { Search, Plus } from "lucide-vue-next";
import Page from "~/components/shared/composition/Page.vue";
import QuickTaskSection from "~/components/shared/productivity/quick-tasks/QuickTaskSection.vue";
import QuickTaskDialog from "~/components/shared/productivity/quick-tasks/QuickTaskDialog.vue";

definePageMeta({
  auth: {
    mode: "strict",
    value: true,
  },
  displayName: "quick-tasks.title",
});

const { isMobile } = useResponsiveData();

const store = useQuickTasksStore();
const { tasks, loading } = storeToRefs(store);
const groupedByPeriod = computed(() => store.groupedByPeriod);

store.recover();
</script>

<template>
  <Page
    name="quick-tasks"
    class="h-full flex flex-col gap-4"
  >
    <header class="shrink-0 flex items-center gap-2">
      <div class="relative flex-1">
        <Input
          class="pl-9"
          placeholder="Absolute"
        />
        <Search class="size-4 absolute top-2.5 left-2.5 text-muted-foreground" />
      </div>
      <QuickTaskDialog>
        <Button
          v-if="isMobile"
          size="icon"
        >
          <Plus />
        </Button>
        <Button v-else>
          <Plus />
          {{ $t("quick-tasks.action") }}
        </Button>
      </QuickTaskDialog>
    </header>

    <main class="flex flex-col gap-6 flex-1">
      <template v-if="loading.recovering">
        <section
          v-for="i in Math.floor(Math.random() * 3) + 1"
          :key="`loading-section-${i}`"
          class="flex flex-col gap-1"
        >
          <Skeleton
            v-for="x in Math.floor(Math.random() * 5) + 3"
            :key="`loading-element-${x}`"
            class="h-12"
          />
        </section>
      </template>
      <template v-else-if="tasks.length">
        <QuickTaskSection
          v-if="groupedByPeriod.today.length"
          :tasks="groupedByPeriod.today"
        >
          {{ $t("quick-tasks.sections.today") }}
        </QuickTaskSection>
        <QuickTaskSection
          v-if="groupedByPeriod.yesterday.length"
          :tasks="groupedByPeriod.yesterday"
        >
          {{ $t("quick-tasks.sections.yesterday") }}
        </QuickTaskSection>
        <QuickTaskSection
          v-if="groupedByPeriod.thisWeek.length"
          :tasks="groupedByPeriod.thisWeek"
        >
          {{ $t("quick-tasks.sections.this-week") }}
        </QuickTaskSection>
        <QuickTaskSection
          v-if="groupedByPeriod.thisMonth.length"
          :tasks="groupedByPeriod.thisMonth"
        >
          {{ $t("quick-tasks.sections.this-month") }}
        </QuickTaskSection>
        <QuickTaskSection
          v-if="groupedByPeriod.older.length"
          :tasks="groupedByPeriod.older"
        >
          {{ $t("quick-tasks.sections.older") }}
        </QuickTaskSection>
      </template>
      <template v-else>
        <div class="py-8 flex flex-col items-center justify-center gap-1">
          <h2 class="text-lg font-medium">
            {{ $t("quick-tasks.empty.title") }}
          </h2>
          <p class="text-center text-sm text-muted-foreground">
            {{ $t("quick-tasks.empty.caption") }}<br>
            {{ $t("quick-tasks.empty.cta") }}
          </p>
          <QuickTaskDialog>
            <Button class="mt-4">
              <Plus />
              {{ $t("quick-tasks.empty.action") }}
            </Button>
          </QuickTaskDialog>
        </div>
      </template>
    </main>
  </Page>
</template>
