<script setup lang="ts">
import { LoaderCircle, Filter, Search } from "lucide-vue-next";
import Page from "~/components/shared/composition/Page.vue";
import EmptyStatement from "~/components/shared/empty/EmptyStatement.vue";
import MediaEntityCard from "~/components/shared/home-cinema/MediaEntityCard.vue";

definePageMeta({
  auth: {
    mode: "strict",
    value: true,
  },
  displayName: "home-cinema.database.title",
});

const hcStore = useHomeCinemaStore();
const { loading, firstLoading } = storeToRefs(hcStore);
const database = computed(() => hcStore.richDatabase);

if (firstLoading.value || !database.value.length) {
  hcStore.loadMoreEntities();
}
</script>

<template>
  <Page
    name="database"
    class="h-full flex flex-col -mt-4"
  >
    <header class="py-4 sticky top-12 z-10 -mx-1 px-1 bg-background shrink-0 flex items-center gap-2">
      <div class="relative flex-1">
        <Input
          class="pl-8"
          placeholder="Search..."
          disabled
        />
        <Search class="size-4 absolute top-2.5 left-2.5 text-muted-foreground" />
      </div>

      <Popover>
        <PopoverTrigger as-child>
          <Button variant="outline">
            <Filter />
            Filter
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          class="flex flex-col gap-4"
        >
          <section class="flex flex-col gap-2">
            <p class="text-sm font-medium text-muted-foreground">
              Media Type
            </p>
            <div class="grid gap-2 grid-cols-2">
              <div class="flex items-center gap-2">
                <Checkbox id="movies" />
                <Label for="movies">Movies</Label>
              </div>
              <div class="flex items-center gap-2">
                <Checkbox id="tv-series" />
                <Label for="tv-series">TV Series</Label>
              </div>
            </div>
          </section>
          <Separator />
          <section class="flex flex-col gap-2">
            <p class="text-sm font-medium text-muted-foreground">
              Genders
            </p>
            <div class="grid gap-2 grid-cols-2">
              <div class="flex items-center gap-2">
                <Checkbox id="action" />
                <Label for="action">Action</Label>
              </div>
              <div class="flex items-center gap-2">
                <Checkbox id="comedy" />
                <Label for="comedy">Comedy</Label>
              </div>
              <div class="flex items-center gap-2">
                <Checkbox id="romance" />
                <Label for="romance">Romance</Label>
              </div>
              <div class="flex items-center gap-2">
                <Checkbox id="horror" />
                <Label for="horror">Horror</Label>
              </div>
              <div class="flex items-center gap-2">
                <Checkbox id="x-mas" />
                <Label for="x-mas">X-Mas</Label>
              </div>
            </div>
          </section>
        </PopoverContent>
      </Popover>
    </header>

    <main class="flex flex-col gap-6 flex-1">
      <div
        v-if="database.length"
        class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4"
      >
        <MediaEntityCard
          v-for="el in database"
          :key="`media-${el.media.id}`"
          :media="el.media"
          :status="el.status"
          :watch-listed="el.watchListed"
        />
      </div>
      <EmptyStatement
        v-else-if="!loading"
        path-root="home-cinema.database.empty"
        no-action
      />
      <div
        v-if="loading"
        class="grid place-items-center py-6"
      >
        <LoaderCircle class="animate-spin" />
      </div>
    </main>
  </Page>
</template>
