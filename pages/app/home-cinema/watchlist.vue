<script setup lang="ts">
import { Search, Filter, Film } from "lucide-vue-next";
import Page from "~/components/shared/composition/Page.vue";
import EmptyStatement from "~/components/shared/empty/EmptyStatement.vue";
import MediaEntityCard from "~/components/shared/home-cinema/MediaEntityCard.vue";

definePageMeta({
  auth: {
    mode: "strict",
    value: true,
  },
  displayName: "home-cinema.watchlist.title",
});

const hcStore = useHomeCinemaStore();
const watchlist = computed(() => hcStore.userWatchlist);
</script>

<template>
  <Page
    name="watchlist"
    class="h-full flex flex-col gap-4"
  >
    <header class="shrink-0 flex items-center gap-2">
      <div class="relative flex-1">
        <Input
          class="pl-8"
          placeholder="Search..."
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
        v-if="watchlist.length"
        class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"
      >
        <MediaEntityCard
          v-for="el in watchlist"
          :key="`media-${el.media.id}`"
          :media="el.media"
          :status="el.status"
          :watch-listed="true"
        />
      </div>
      <EmptyStatement
        v-else
        path-root="home-cinema.watchlist.empty"
      >
        <Button as-child>
          <NuxtLinkLocale to="/app/home-cinema/database">
            <Film />
            {{ $t("home-cinema.watchlist.empty.action") }}
          </NuxtLinkLocale>
        </Button>
      </EmptyStatement>
    </main>
  </Page>
</template>
