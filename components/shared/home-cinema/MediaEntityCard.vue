<script setup lang="ts">
import type { IMediaEntity, IMediaStatus } from "~/types/home-cinema";
import type { IFile } from "~/types/miscellaneous/files";
import MediaActions from "~/components/shared/home-cinema/MediaActions.vue";

const { locale } = useI18n();

const { media } = defineProps<{
  media: IMediaEntity;
  status: IMediaStatus;
  watchListed: boolean;
}>();

const posterUrl = computed((): string => (media.poster as IFile).thumbnail);
const genders = computed((): string[] =>
  media.genders
    .filter(g => g.startsWith(locale.value))
    .map(g => g.substring(locale.value.length + 1)));
</script>

<template>
  <Card class="relative pt-0 overflow-hidden">
    <CardHeader class="px-0">
      <AspectRatio
        :ratio="16/9"
      >
        <NuxtImg
          :src="posterUrl"
          :placeholder="[50, 50, 25, 75]"
          class="object-cover w-full h-full"
        />
      </AspectRatio>
    </CardHeader>

    <CardContent>
      <h2 class="text-lg font-semibold truncate mr-4">
        {{ media.title }}
      </h2>
      <p class="text-sm text-muted-foreground line-clamp-3">
        {{ media.synopsis }}
      </p>
    </CardContent>

    <CardFooter>
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

            <div class="p-4 pt-0 grid grid-cols-1 sm:grid-cols-3">
              <div class="grid auto-rows-min sm:col-span-2">
                <DrawerTitle>{{ media.title }}</DrawerTitle>
                <DrawerDescription>{{ media.synopsis }}</DrawerDescription>
              </div>

              <div class="grid gap-4 pt-4 border-t sm:pt-0 sm:pl-4 sm:border-t-0 sm:border-l">
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
                :variant="status.viewedAt ? 'default' : 'outline'"
              >
                <template v-if="status.viewedAt">
                  {{ $t("home-cinema.entity-card.watched-it") }}
                </template>
                <template v-else>
                  {{ $t("home-cinema.entity-card.mark-as-watched") }}
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
    </CardFooter>

    <MediaActions
      class="absolute top-6 right-6"
      :media="media"
      :status="status"
      :watch-listed="watchListed"
    />
  </Card>
</template>
