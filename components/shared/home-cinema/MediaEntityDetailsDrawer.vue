<script setup lang="ts">
import { toast } from "vue-sonner";
import { LoaderCircle, Clock, Layers, Check } from "lucide-vue-next";
import type { IMediaEntity, IMediaStatus } from "~/types/home-cinema";
import MediaActions from "~/components/shared/home-cinema/MediaActions.vue";
import type { IFile } from "~/types/miscellaneous/files";

const { t, locale } = useI18n();

const { media, status } = defineProps<{
  media: IMediaEntity;
  status?: IMediaStatus;
  watchListed: boolean;
}>();

const loading = ref(false);
const hcStore = useHomeCinemaStore();

const posterUrl = computed((): string => (media.poster as IFile).thumbnail);
const genders = computed((): string[] =>
  media.genders
    .filter(g => g.startsWith(locale.value))
    .map(g => g.substring(locale.value.length + 1)));

async function toggleViewed() {
  loading.value = true;

  try {
    await hcStore.updateMediaStatus(media.id, {
      viewedAt: status?.viewedAt ? null : new Date(),
    });
  }
  catch {
    toast.error(t("toasters.server-error"));
  }
  finally {
    loading.value = false;
  }
}
</script>

<template>
  <Drawer>
    <DrawerTrigger as-child>
      <Button class="w-full">
        {{ $t("btn.see-details") }}
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <div class="mx-auto w-full max-w-2xl">
        <DrawerHeader>
          <AspectRatio
            :ratio="16/6"
          >
            <NuxtImg
              :src="posterUrl"
              :placeholder="[50, 50, 25, 75]"
              class="rounded-xl object-cover w-full h-full"
            />
          </AspectRatio>
        </DrawerHeader>

        <div class="p-4 pt-0 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="grid auto-rows-min sm:col-span-2">
            <DrawerTitle>{{ media.title }}</DrawerTitle>
            <DrawerDescription>{{ media.synopsis }}</DrawerDescription>
          </div>

          <div class="grid gap-4 pt-4 border-t sm:pt-0 sm:pl-4 sm:border-t-0 sm:border-l">
            <section class="flex items-center gap-2 text-sm">
              <template v-if="media.type === 'MOVIE'">
                <Clock class="size-4" />
                {{ $t("labels.home-cinema.duration.hours", { hours: Math.floor(media.duration / 60), minutes: media.duration % 60 }) }}
              </template>
              <template v-else-if="media.type === 'TV_SERIES'">
                <Layers class="size-4" />
                {{ $t("labels.home-cinema.duration.seasons", { value: media.duration }) }}
              </template>
            </section>
            <section class="grid">
              <p class="text-sm font-semibold text-muted-foreground">
                {{ $t("home-cinema.entity-card.casting") }}
              </p>
              <p>{{ media.actors.join(", ") }}</p>
            </section>
            <section class="grid">
              <p class="text-sm font-semibold text-muted-foreground">
                {{ $t("home-cinema.entity-card.genders") }}
              </p>
              <p>{{ genders.join(", ") }}</p>
            </section>
          </div>
        </div>

        <DrawerFooter class="flex-row items-center gap-2">
          <Button
            class="flex-1"
            :variant="status?.viewedAt ? 'default' : 'outline'"
            @click="toggleViewed"
          >
            <template v-if="loading">
              <LoaderCircle class="animate-spin" />
            </template>
            <template v-else>
              <template v-if="status?.viewedAt">
                <Check />
                {{ $t("home-cinema.entity-card.watched-it") }}
              </template>
              <template v-else>
                <Circle />
                {{ $t("home-cinema.entity-card.mark-as-watched") }}
              </template>
            </template>
          </Button>
          <MediaActions
            :media="media"
            :status="status"
            side="top"
            :watch-listed="watchListed"
          />
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
</template>
