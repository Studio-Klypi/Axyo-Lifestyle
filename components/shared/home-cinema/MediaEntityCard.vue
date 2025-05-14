<script setup lang="ts">
import type { IMediaEntity, IMediaStatus } from "~/types/home-cinema";
import type { IFile } from "~/types/miscellaneous/files";
import MediaActions from "~/components/shared/home-cinema/MediaActions.vue";
import MediaEntityDetailsDrawer from "~/components/shared/home-cinema/MediaEntityDetailsDrawer.vue";

const { media } = defineProps<{
  media: IMediaEntity;
  status?: IMediaStatus;
  watchListed: boolean;
}>();

const posterUrl = computed((): string => (media.poster as IFile).thumbnail);
const mediaType = computed((): string => media.type.toLowerCase().replaceAll(/[_ ]/g, "-"));
</script>

<template>
  <Card class="relative pt-0 overflow-hidden">
    <CardHeader class="px-0 relative">
      <AspectRatio
        :ratio="16/9"
      >
        <NuxtImg
          :src="posterUrl"
          :placeholder="[50, 50, 25, 75]"
          class="object-cover w-full h-full"
        />
      </AspectRatio>

      <Badge
        variant="secondary"
        class="absolute top-6 left-6"
      >
        {{ $t(`labels.home-cinema.${mediaType}`) }}
      </Badge>
    </CardHeader>

    <CardContent class="flex-1">
      <h2 class="text-lg font-semibold truncate mr-4 leading-none mb-2">
        {{ media.title }}
      </h2>
      <p class="text-sm text-muted-foreground line-clamp-3">
        {{ media.synopsis }}
      </p>
    </CardContent>

    <CardFooter>
      <MediaEntityDetailsDrawer
        :media="media"
        :status="status"
        :watch-listed="watchListed"
      />
    </CardFooter>

    <MediaActions
      class="absolute top-6 right-6"
      :media="media"
      :status="status"
      :watch-listed="watchListed"
    />
  </Card>
</template>
